// Générateur TakeOff: bordereau (.xlsx) -> "<projet>_TakeOff <municipalité>.xlsx".
import { readBordereau } from '../shared/bordereau.js';
import { outputPath } from '../shared/files.js';
import { writeWorkbook } from '../shared/workbook.js';
import { buildTakeOffWorkbook, takeOffFileName } from './build.js';

export async function generate({ buffer }, { outputDir, now = new Date() }) {
    const parsed = readBordereau(buffer);
    const file = outputPath(outputDir, takeOffFileName(parsed.metadata));
    await writeWorkbook(buildTakeOffWorkbook(parsed, { now }), file);
    return { path: file };
}
