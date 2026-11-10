// Lets the user adjust the PDF template in PDF-XChange Editor before the
// reports are generated: the template is copied to a private temp folder,
// opened in the editor, and read back once the editor is closed.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { UserError } from '../shared/errors.js';

export function editorCandidates(env = process.env) {
    const pf = env.ProgramFiles || 'C:\\Program Files';
    const pf86 = env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)';
    return [
        path.join(pf, 'PDF-XChange', 'PDF Editor', 'PXCEditor.exe'),
        path.join(pf86, 'PDF-XChange', 'PDF Editor', 'PXCEditor.exe'),
        path.join(pf, 'PDF-XChange', 'PDF Editor', 'PDFXEdit.exe'),
        path.join(pf, 'Tracker Software', 'PDF Editor', 'PDFXEdit.exe'),
        path.join(pf86, 'Tracker Software', 'PDF Editor', 'PDFXEdit.exe'),
        path.join(pf, 'Tracker Software', 'PDF Editor', 'PXCEditor.exe')
    ];
}

export function findEditor({ platform = process.platform, exists = existsSync, env = process.env } = {}) {
    if (platform !== 'win32') return null;
    return editorCandidates(env).find((p) => exists(p)) ?? null;
}

// Opens `file` and resolves when the editor process exits.
function waitForEditor(exe, file) {
    return new Promise((resolve, reject) => {
        const child = spawn(exe, [file], { stdio: 'ignore', windowsHide: false });
        child.once('error', () => reject(new UserError("Impossible de lancer PDF-XChange Editor. Vérifiez qu'il est installé et à jour.", 'editor-missing')));
        child.once('exit', () => resolve());
    });
}

// Returns the template bytes after the user closed the editor.
export async function editTemplate(templateBytes, { editor = findEditor(), wait = waitForEditor } = {}) {
    if (!editor) {
        throw new UserError('PDF-XChange Editor est requis pour générer les rapports d\'inspection.', 'editor-missing');
    }
    const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'stellaire-rapport-'));
    const file = path.join(dir, 'gabarit.pdf');
    try {
        await fs.writeFile(file, templateBytes);
        await wait(editor, file);
        return await fs.readFile(file);
    } finally {
        await fs.rm(dir, { recursive: true, force: true });
    }
}
