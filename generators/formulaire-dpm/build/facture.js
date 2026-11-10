import { OUTPUT } from '../config.js';
import { FACTURE, entry, footer, header } from '../templates/facture.js';
import { RAPPORT, rapportRef } from '../templates/rapport.js';
import { pad, setCell, toExcelSerial } from '../utils.js';

// Sum of one slip's lines in Rapport Comparatif.
// Column A holds "<index padded to 2>-<slip number>", so match on "NN-*".
export function sumSlip(slipIndex, lastRapportRow, column = OUTPUT.factureSumColumn) {
    const first = RAPPORT.firstDataRow;
    const values = rapportRef(`$${column}$${first}:$${column}$${lastRapportRow}`);
    const ids = rapportRef(`$${RAPPORT.col.slip}$${first}:$${RAPPORT.col.slip}$${lastRapportRow}`);
    return `=SUMIFS(${values},${ids},"${pad(slipIndex, 2)}-*")`;
}

export function buildFacture({ metadata, slips }, { now, lastRapportRow }) {
    const data = header();
    setCell(data[2], 'A', `Nature des travaux\n\n${metadata.projectTitle}`);
    setCell(data[3], 'G', Number(metadata.total) || 0);
    // Period starts on the first day of the current month.
    setCell(data[5], 'D', toExcelSerial(now.getFullYear(), now.getMonth(), 1));

    const count = Math.max(slips.length, FACTURE.minEntries);
    for (let offset = 0; offset < count; offset++) {
        const slipIndex = offset + 1;
        const row = entry(offset);
        setCell(row, 'B', slipIndex);
        setCell(row, 'C', String(slips[offset]?.title ?? ''));
        setCell(row, 'F', sumSlip(slipIndex, lastRapportRow));
        data.push(row);
    }

    const lastEntryRow = FACTURE.firstEntryRow + count - 1;
    data.push(...footer(FACTURE.firstEntryRow, lastEntryRow));
    return { data };
}
