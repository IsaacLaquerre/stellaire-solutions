// End-to-end test in the real Electron app: starts it with a temp output
// folder, drives the page like a user (file pickers, forms, settings) and
// checks the files written on disk. Run with: npm run test:e2e
import { app } from 'electron';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import xlsx from 'node-xlsx';
import { startApp } from '../../electron/app.js';
import { bordereauXlsx } from '../fixtures/bordereau.js';

const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'stellaire-e2e-'));
app.setPath('userData', fs.mkdtempSync(path.join(os.tmpdir(), 'stellaire-e2e-profile-')));
const errors = [];
const results = [];

// Fails the run instead of hanging if something never answers.
const watchdog = setTimeout(() => {
    console.error(`\nEnd-to-end timed out\n${results.join('\n')}`);
    app.exit(2);
}, 120_000);

function check(name, fn) {
    console.log(`... ${name}`);
    return fn().then(
        () => results.push(`  ok   ${name}`),
        (err) => { results.push(`  FAIL ${name}\n       ${err.message}`); errors.push(err); }
    );
}

// No top-level await: in an ESM entry it would hold back the 'ready' event.
async function run() {
    console.log('starting app');
    const win = await startApp({ outputDir: () => outDir, generatorOptions: { rapport: { editTemplate: false } } });
    if (!win) throw new Error('App did not start (another instance holds the lock?)');
    win.webContents.on('console-message', (event) => {
        if (event.level === 'error') errors.push(new Error(`console: ${event.message}`));
    });
    if (win.webContents.isLoading()) await new Promise((resolve) => win.webContents.once('did-finish-load', resolve));
    console.log('page loaded');

    const page = (code) => win.webContents.executeJavaScript(`(async () => { ${code} })()`);
    const fixture = JSON.stringify(Array.from(bordereauXlsx()));

    // Picks a file in an <input type=file> the way a user would.
    const pick = (inputId, name = 'bordereau.xlsx') => `
        const dt = new DataTransfer();
        dt.items.add(new File([new Uint8Array(${fixture})], ${JSON.stringify(name)}));
        const input = document.getElementById(${JSON.stringify(inputId)});
        input.files = dt.files;
        input.dispatchEvent(new Event('change', { bubbles: true }));`;

    // Submits a form and waits for the final status.
    const submit = (module) => `
        const form = document.querySelector('form[data-module="${module}"]');
        form.querySelector('button[type=submit]').click();
        const status = form.querySelector('.form-status');
        for (let i = 0; i < 600 && !/is-ok|is-error/.test(status.className); i++) await new Promise((r) => setTimeout(r, 50));
        return { status: status.className, text: status.textContent, path: form.querySelector('.result-path').textContent,
                 shown: !form.querySelector('.result-box').hidden };`;

    const sheetNames = (file) => xlsx.parse(fs.readFileSync(file)).map((s) => s.name);

    await check('page loads its modules, bridge and translations', async () => {
        const info = await page(`return { api: typeof window.api, keys: Object.keys(window.api).sort(), cards: document.querySelectorAll('.module-card').length,
            title: document.querySelector('.brand-title').textContent, node: typeof require };`);
        assert.equal(info.api, 'object');
        assert.deepEqual(info.keys, ['generate', 'setLanguage', 'showItem']);
        assert.equal(info.cards, 4);
        assert.equal(info.title, 'Stellaire Solutions');
        assert.equal(info.node, 'undefined', 'Node must not be reachable from the page');
    });

    await check('every submit button starts disabled', async () => {
        const disabled = await page(`return [...document.querySelectorAll('button[type=submit]')].map((b) => b.disabled);`);
        assert.deepEqual(disabled, [true, true, true, true]);
    });

    await check('a non-.xlsx file keeps the button disabled', async () => {
        const disabled = await page(`${pick('takeoff-file', 'notes.txt')} return document.querySelector('form[data-module="takeoff"] button[type=submit]').disabled;`);
        assert.equal(disabled, true);
    });

    await check('DPM generates its workbook', async () => {
        const r = await page(`document.querySelector('[data-target=dpm]').click();
            document.getElementById('dpm-qty').value = '3';
            document.getElementById('dpm-qty').dispatchEvent(new Event('input', { bubbles: true }));
            ${pick('dpm-file')} ${submit('dpm')}`);
        assert.match(r.status, /is-ok/, r.text);
        assert.ok(r.shown);
        assert.equal(path.basename(r.path), '1234-56-7890_DPM Lévis.xlsx');
        assert.deepEqual(sheetNames(r.path), ['Bordereau Réel', 'Sommaire']);
    });

    await check('Formulaire DPM generates its workbook', async () => {
        const r = await page(`${pick('formulaire-file')} ${submit('formulaire')}`);
        assert.match(r.status, /is-ok/, r.text);
        assert.match(path.basename(r.path), /^1234-56-7890_\d{4}-\d{2}-\d{2}_Formulaire demande de paiement\.xlsx$/);
        assert.deepEqual(sheetNames(r.path).slice(0, 2), ['Rapport Comparatif', 'Demande de paiement']);
    });

    await check('TakeOff generates its workbook', async () => {
        const r = await page(`${pick('takeoff-file')} ${submit('takeoff')}`);
        assert.match(r.status, /is-ok/, r.text);
        assert.deepEqual(sheetNames(r.path), ['Take Off', 'Frais Généraux', 'Bordereau Balancé']);
    });

    await check('Rapport Inspection generates one PDF per day', async () => {
        const r = await page(`
            const set = (name, value) => { const el = document.querySelector('[name="' + name + '"]'); el.value = value; el.dispatchEvent(new Event('input', { bubbles: true })); };
            set('fileNum', '1234-56-7890'); set('projectName', 'Pont / test'); set('location', 'Rue Principale');
            set('supervisor', 'A. Tremblay'); set('signalManager', 'B. Roy'); set('signatory', 'C. Côté');
            set('startDate', '2026-02-27'); set('days', '3');
            ${submit('rapport')}`);
        assert.match(r.status, /is-ok/, r.text);
        assert.equal(path.basename(r.path), '1234-56-7890 - Pont _ test');
        assert.deepEqual(fs.readdirSync(r.path).sort(), ['2026-02-27', '2026-02-28', '2026-03-01']
            .map((d) => `${d} - 1234-56-7890 inspection quotidienne V-3224 A.pdf`));
    });

    await check('a broken file shows a readable error', async () => {
        const r = await page(`
            const dt = new DataTransfer();
            dt.items.add(new File([new Uint8Array([80, 75, 3, 4, 1, 2, 3])], 'broken.xlsx'));
            const input = document.getElementById('takeoff-file'); input.files = dt.files;
            input.dispatchEvent(new Event('change', { bubbles: true }));
            ${submit('takeoff')}`);
        assert.match(r.status, /is-error/);
        assert.ok(r.text.length > 0);
        assert.equal(r.shown, false);
    });

    await check('settings switch language and theme', async () => {
        const r = await page(`
            document.getElementById('settingsBtn').click();
            const opened = !document.getElementById('settingsOverlay').hidden;
            document.querySelector('input[name=lang][value=en]').click();
            const title = document.querySelector('#view-home .view-title').textContent;
            const status = document.querySelector('form[data-module="takeoff"] .form-status').textContent;
            document.getElementById('themeToggle').click();
            const theme = document.documentElement.dataset.theme;
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
            return { opened, title, status, theme, closed: document.getElementById('settingsOverlay').hidden };`);
        assert.ok(r.opened);
        assert.equal(r.title, 'What do you want to generate?');
        assert.match(r.status, /recognized bid schedule/);
        assert.equal(r.theme, 'light');
        assert.ok(r.closed);
    });

    await check('the page cannot open other files in the explorer or navigate away', async () => {
        const before = win.webContents.getURL();
        await page(`window.api.showItem('C:\\\\Windows\\\\System32'); location.href = 'https://example.com'; return true;`);
        await new Promise((r) => setTimeout(r, 300));
        assert.equal(win.webContents.getURL(), before);
    });

    await check('no error was logged by the page', async () => {
        assert.deepEqual(errors.filter((e) => e.message.startsWith('console:')).map((e) => e.message), []);
    });

    console.log(`\nEnd-to-end (${outDir})\n${results.join('\n')}\n`);
    clearTimeout(watchdog);
    fs.rmSync(outDir, { recursive: true, force: true });
    app.exit(errors.length ? 1 : 0);
}

run().catch((err) => {
    console.error(err);
    app.exit(1);
});
