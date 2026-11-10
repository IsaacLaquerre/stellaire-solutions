// Générateur DPM: bordereau (.xlsx) + number of DPs -> "<projet>_DPM <municipalité>.xlsx".
import { readBordereau } from '../shared/bordereau.js';
import { outputPath } from '../shared/files.js';
import { writeWorkbook } from '../shared/workbook.js';
import { buildDpmWorkbook, dpmFileName } from './build.js';
import { validateDpCount } from './options.js';

export async function generate({ buffer, dpCount }, { outputDir }) {
    const count = validateDpCount(dpCount);
    const parsed = readBordereau(buffer);
    const file = outputPath(outputDir, dpmFileName(parsed.metadata));
    await writeWorkbook(buildDpmWorkbook(parsed, count), file);
    return { path: file };
}
