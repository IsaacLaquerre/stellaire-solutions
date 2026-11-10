// Générateur Formulaire DPM: bordereau (.xlsx) -> "<projet>_<date>_Formulaire demande de paiement.xlsx".
import xlsx from 'node-xlsx';
import { outputPath } from '../shared/files.js';
import { UserError } from '../shared/errors.js';
import { INPUT } from './config.js';
import { buildWorkbook, outputFileName, writeWorkbook } from './build/workbook.js';
import { parseWorkbook } from './parse.js';

export function readWorkbook(buffer) {
    try {
        return xlsx.parse(buffer, { password: INPUT.password });
    } catch {
        throw new UserError("Impossible de lire le fichier Excel. Vérifiez qu'il s'agit bien d'un bordereau .xlsx.", 'unreadable');
    }
}

export async function generate({ buffer }, { outputDir, now = new Date() }) {
    const parsed = parseWorkbook(readWorkbook(buffer));
    const file = outputPath(outputDir, outputFileName(parsed.metadata, now));
    await writeWorkbook(buildWorkbook(parsed, { now }), file);
    return { path: file };
}
