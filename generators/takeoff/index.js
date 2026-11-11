// Générateur TakeOff: bordereau (.xlsx) + labour cost -> "<projet>_TakeOff <municipalité>.xlsx".
import { readBordereau } from '../shared/bordereau.js';
import { outputPath } from '../shared/files.js';
import { writeWorkbook } from '../shared/workbook.js';
import { buildTakeOffWorkbook, takeOffFileName } from './build.js';
import { validateLabourCost } from './options.js';

export async function generate({ buffer, labourCost }, { outputDir, now = new Date() }) {
    const cost = validateLabourCost(labourCost);
    const parsed = readBordereau(buffer);
    const file = outputPath(outputDir, takeOffFileName(parsed.metadata));
    await writeWorkbook(buildTakeOffWorkbook(parsed, { now, labourCost: cost }), file);
    return { path: file };
}
