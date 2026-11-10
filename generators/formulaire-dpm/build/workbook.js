import { OUTPUT, UserError } from '../config.js';
import { FACTURE } from '../templates/facture.js';
import { RAPPORT } from '../templates/rapport.js';
import { V1371 } from '../templates/v1371.js';
import { isoDate, safeFileName } from '../utils.js';
import { buildFacture } from './facture.js';
import { buildRapport, layoutArticles } from './rapport.js';
import { buildV1371 } from './v1371.js';

// Returns the sheet list expected by write-excel-file.
export function buildWorkbook(parsed, { now = new Date() } = {}) {
    const articleRows = layoutArticles(parsed.slips);
    if (articleRows.length === 0) throw new UserError('Aucun article trouvé dans les bordereaux');

    const rapport = buildRapport(articleRows, parsed.metadata);
    const facture = buildFacture(parsed, { now, lastRapportRow: rapport.lastRow });

    const sheets = [
        {
            data: rapport.data,
            sheet: RAPPORT.name,
            columns: RAPPORT.columns,
            stickyRowsCount: RAPPORT.headerRows,
            stickyColumnsCount: 0,
            zoomScale: 0.9
        },
        { data: facture.data, sheet: FACTURE.name, columns: FACTURE.columns },
        ...buildV1371(articleRows).map(({ name, data }) => ({
            data,
            sheet: name,
            columns: V1371.columns,
            showGridLines: false
        }))
    ];

    assertUniqueNames(sheets);
    return sheets;
}

// Excel compares sheet names case-insensitively.
function assertUniqueNames(sheets) {
    const seen = new Set();
    for (const { sheet } of sheets) {
        const key = sheet.toLowerCase();
        if (seen.has(key)) throw new UserError(`Nom de feuille en double: ${sheet}`);
        seen.add(key);
    }
}

export const outputFileName = (metadata, now = new Date()) =>
    `${safeFileName(metadata.projectNum)}_${isoDate(now)}_${OUTPUT.fileSuffix}.xlsx`;

export { writeWorkbook } from '../../shared/workbook.js';
