// File system helpers shared by the generators.
import fs from 'node:fs/promises';
import path from 'node:path';
import { FileLockedError, UserError } from './errors.js';

// Characters not allowed in Windows file names.
export const safeFileName = (name) =>
    String(name).replace(/[<>:"/\\|?*\u0000-\u001f]/g, '_').replace(/[. ]+$/, '').trim();

// Local date as yyyy-mm-dd, independent of the system locale.
export function isoDate(date) {
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// Path of an output file inside `outputDir`. The name is sanitized, and the
// result is checked to stay inside the folder.
export function outputPath(outputDir, fileName) {
    const name = safeFileName(fileName);
    if (!name) throw new UserError('Nom de fichier de sortie invalide.');
    const dir = path.resolve(outputDir);
    const full = path.resolve(dir, name);
    if (path.dirname(full) !== dir) throw new UserError('Nom de fichier de sortie invalide.');
    return full;
}

const LOCKED_CODES = new Set(['EBUSY', 'EPERM', 'EACCES']);

// Runs a write and reports a file open in Excel as a readable error.
export async function guardWrite(filePath, write) {
    try {
        await write();
    } catch (err) {
        if (LOCKED_CODES.has(err && err.code)) throw new FileLockedError(path.basename(filePath));
        throw err;
    }
}

export async function writeFile(filePath, data) {
    await guardWrite(filePath, () => fs.writeFile(filePath, data));
}
