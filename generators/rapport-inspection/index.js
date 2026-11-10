// Générateur Rapport Inspection: form values -> one V-3224 A PDF per day,
// in a folder "<dossier> - <projet>".
import fs from 'node:fs/promises';
import { outputPath, writeFile } from '../shared/files.js';
import { editTemplate as editInPdfXChange } from './editor.js';
import { normalizeFields } from './fields.js';
import { folderName, reportName, TEMPLATE_FILE } from './layout.js';
import { fillReport } from './pdf.js';
import { randomTime, reportDates } from './schedule.js';

// `editTemplate` and `random` are replaceable for tests. `editTemplate:
// false` skips the editor (a worker cannot receive a function).
export async function generate({ fields }, { outputDir, now = new Date(), editTemplate = editInPdfXChange, random = Math.random }) {
    const values = normalizeFields(fields, now);
    const edit = editTemplate === false ? (bytes) => bytes : editTemplate;
    const template = await edit(await fs.readFile(TEMPLATE_FILE));

    const folder = outputPath(outputDir, folderName(values));
    await fs.mkdir(folder, { recursive: true });

    for (const dateText of reportDates(values.startDate, values.days)) {
        const time = randomTime(values.minHour, values.maxHour, random);
        const bytes = await fillReport(template, values, { dateText, time });
        await writeFile(outputPath(folder, reportName(values, dateText)), bytes);
    }
    return { path: folder, isFolder: true };
}
