// Generic wiring of a generator form: submit button state, status line,
// result box with "show in folder". Each module only provides its payload
// and validity rule (see js/modules/).
import { errorMessage } from './errors.js';

const STATUS_CLASSES = ['is-ok', 'is-pending', 'is-error'];

// spec: { module, isValid(), buildPayload(), runningKey? }
// ctx: { t(key, vars), api }
export function bindGeneratorForm(form, spec, ctx) {
    const button = form.querySelector('button[type="submit"]');
    const status = form.querySelector('.form-status');
    const resultBox = form.querySelector('.result-box');
    const resultPath = form.querySelector('.result-path');
    let busy = false;
    let lastStatus = null;
    let lastOutput = '';

    function renderStatus() {
        status.classList.remove(...STATUS_CLASSES);
        if (!lastStatus) {
            status.textContent = '';
            return;
        }
        status.classList.add(lastStatus.kind);
        status.textContent = ctx.t(lastStatus.key, lastStatus.vars);
    }

    function setStatus(kind, key, vars) {
        lastStatus = kind ? { kind, key, vars } : null;
        renderStatus();
    }

    function revalidate() {
        button.disabled = busy || !spec.isValid();
    }

    function clearResult() {
        resultBox.hidden = true;
        lastOutput = '';
        setStatus(null);
    }

    form.addEventListener('input', revalidate);
    form.addEventListener('change', (event) => {
        if (event.target.type === 'file') clearResult();
        revalidate();
    });

    form.querySelector('.result-show').addEventListener('click', () => {
        if (lastOutput) ctx.api.showItem(lastOutput);
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (busy || !spec.isValid()) return;
        busy = true;
        revalidate();
        resultBox.hidden = true;
        setStatus('is-pending', spec.runningKey || 'running');

        try {
            const result = await ctx.api.generate(await spec.buildPayload());
            if (result && result.ok) {
                lastOutput = result.path;
                resultPath.textContent = result.path;
                resultBox.hidden = false;
                setStatus('is-ok', result.isFolder ? 'folderDone' : 'fileDone');
            } else {
                const { key, vars } = errorMessage(result);
                setStatus('is-error', key, vars);
            }
        } catch {
            setStatus('is-error', 'errUnknown');
        } finally {
            busy = false;
            revalidate();
        }
    });

    revalidate();
    // Re-render the status in the new language.
    return { refresh: renderStatus, revalidate };
}
