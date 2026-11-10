// Builds the DPM workbook: "Bordereau Réel" (one line per article, three
// columns per DP) and "Sommaire" (three lines per slip, one column per DP).
import { columnToLetter, numberOr, SheetBuilder } from '../shared/excel.js';
import { UserError } from '../shared/errors.js';
import { slipsWithRows } from '../shared/bordereau.js';
import * as S from './styles.js';

export const SHEETS = { detail: 'Bordereau Réel', summary: 'Sommaire' };

// Bordereau Réel: first DP column is K, each DP spans 3 columns.
const FIRST_DP_COLUMN = 11;
export const dpQuantityColumn = (dpIndex) => columnToLetter(FIRST_DP_COLUMN + 3 * dpIndex);
export const dpAmountColumn = (dpIndex) => columnToLetter(FIRST_DP_COLUMN + 1 + 3 * dpIndex);
// Sommaire: DP columns start at H, one column per DP.
const summaryDpColumn = (dpIndex) => columnToLetter(8 + dpIndex);

const range = (count) => Array.from({ length: count }, (_, i) => i);

// Row formulas shared by articles and the amendment/withholding lines.
function lineFormulas(r, dpCount) {
    const quantities = range(dpCount).map((i) => `${dpQuantityColumn(i)}${r}`).join(',');
    return {
        cumulative: `=SUM(${quantities})`,
        amount: `=H${r}*E${r}`,
        ratio: `=IFERROR(H${r}/F${r},0)`
    };
}

const dpEntries = (r, dpCount) => range(dpCount).flatMap((i) => S.dpEntryCells(`=${dpQuantityColumn(i)}${r}*$E${r}`));

function articleLine(sheet, slip, row, dpCount) {
    const r = sheet.nextRow;
    const cells = S.articleRow();
    const code = parseInt(row.code, 10);
    const unitPrice = row.unit === 'G'
        ? numberOr(row.total, 0)
        : Math.round(numberOr(row.unitPrice, NaN) * 100) / 100 || 0;

    cells[0].value = `${slip.number}-${row.article}`;
    cells[1].value = Number.isNaN(code) ? '' : code;
    cells[2].value = String(row.description);
    cells[3].value = row.unit;
    cells[4].value = unitPrice;
    cells[5].value = numberOr(row.quantity, NaN) || 1;
    cells[6].value = `=F${r}*E${r}`;
    const f = lineFormulas(r, dpCount);
    cells[7].value = f.cumulative;
    cells[8].value = f.amount;
    cells[9].value = f.ratio;
    sheet.push([...cells, ...dpEntries(r, dpCount)]);
}

// Blank article-style line with formulas, for amendments and withholdings.
function blankLine(sheet, dpCount) {
    const r = sheet.nextRow;
    const cells = S.articleRow();
    const f = lineFormulas(r, dpCount);
    cells[7].value = f.cumulative;
    cells[8].value = f.amount;
    cells[9].value = f.ratio;
    sheet.push([...cells, ...dpEntries(r, dpCount)]);
}

const sectionLine = (sheet, text, dpCount) => sheet.push([...S.sectionRow(text), ...S.fill(3 * dpCount, S.sectionCell)]);

// "Avenants" and "Retenues" blocks closing each slip (6 rows).
function slipEnd(sheet, dpCount) {
    for (const label of ['Avenants', 'Retenues']) {
        sectionLine(sheet, label, dpCount);
        blankLine(sheet, dpCount);
        blankLine(sheet, dpCount);
    }
}

function buildDetail(slips, dpCount) {
    const sheet = new SheetBuilder();
    sheet.push([...S.headerRow(), ...range(dpCount).flatMap((i) => S.dpHeaderCells(i + 1))]);
    sheet.push([...S.fillerRow(['Quantité', 'Montant', '% Écart']), ...range(dpCount).flatMap(() => S.dpPeriodCells())]);
    sheet.push([...S.fillerRow(), ...range(dpCount).flatMap(() => S.dpLabelCells())]);

    // Row span of each slip's articles, used by the summary sheet.
    const spans = [];
    for (const slip of slips) {
        const start = sheet.push([...S.slipRow(`DOCUMENT ${slip.number} - ${slip.title}`), ...S.fill(3 * dpCount, S.slipCell)]);
        for (const row of slip.rows) {
            if (row.type === 'article') articleLine(sheet, slip, row, dpCount);
            else sectionLine(sheet, row.description, dpCount);
        }
        const end = sheet.lastRow;
        slipEnd(sheet, dpCount);
        spans.push({ slip, start, end });
    }

    const lastRow = sheet.lastRow;
    sheet.push([]);
    const totalRowNumber = sheet.nextRow;
    sheet.push([
        ...S.totalRow({
            plannedSum: `=SUM(G4:G${lastRow})`,
            realSum: `=SUM(I4:I${lastRow})`,
            ratio: `=I${totalRowNumber}/G${totalRowNumber}`
        }),
        ...range(dpCount).flatMap((i) => S.dpTotalCells(`=SUM(${dpAmountColumn(i)}4:${dpAmountColumn(i)}${lastRow})`))
    ]);

    return { rows: sheet.rows, spans };
}

function buildSummary(spans, summaryTotals, dpCount) {
    const sheet = new SheetBuilder();
    const lastDp = summaryDpColumn(dpCount - 1);
    const detail = `'${SHEETS.detail}'`;

    sheet.push([]);
    sheet.push([
        ...S.summaryFillerRow(),
        ...range(dpCount).map((i) => ({
            ...S.summaryDpHeadCell(`DP ${i + 1}`),
            ...(i === 0 ? { leftBorderStyle: 'medium' } : {}),
            ...(i === dpCount - 1 ? { rightBorderStyle: 'medium' } : {})
        }))
    ]);
    sheet.push([
        ...S.summaryHeaderRow(),
        ...range(dpCount).map((i) => ({ ...S.summaryDpHeadCell(), ...(i === dpCount - 1 ? { rightBorderStyle: 'medium' } : {}) }))
    ]);

    spans.forEach(({ slip, start, end }, index) => {
        const isLast = index === spans.length - 1;
        if (!summaryTotals.has(String(slip.number))) {
            throw new UserError(`Total du bordereau ${slip.number} introuvable dans la feuille Sommaire.`);
        }
        // Three lines per slip: articles, amendments, withholdings.
        const lines = [
            { from: start, to: end, total: numberOr(summaryTotals.get(String(slip.number)), 0), title: slip.title },
            { from: end + 1, to: end + 3, label: 'Avenants' },
            { from: end + 4, to: end + 6, label: 'Retenues', bottom: isLast ? 'medium' : 'thin' }
        ];
        for (const line of lines) {
            const r = sheet.nextRow;
            const bottom = line.bottom ?? 'thin';
            sheet.push([
                ...S.summaryEntryRow({
                    index: String(index + 1),
                    number: String(slip.number),
                    title: line.title,
                    label: line.label,
                    total: line.total,
                    cumulative: `=SUM(${detail}!I${line.from}:I${line.to})`,
                    ratio: `=IFERROR((SUM(H${r}:${lastDp}${r})/E${r}),0)`,
                    bottom
                }),
                ...range(dpCount).map((i) => {
                    const col = dpAmountColumn(i);
                    return S.summaryDpCell(`=SUM(${detail}!${col}${line.from}:${col}${line.to})`, { bottom, last: i === dpCount - 1 });
                })
            ]);
        }
    });

    const lastEntry = sheet.lastRow;
    const t = sheet.nextRow;
    sheet.push([
        {}, {}, {},
        S.summaryTotalLabel('Total contrat initial', 27),
        S.summaryTotalCell(`=SUM(E4:E${lastEntry})`),
        S.summaryBlankBox(),
        S.summaryTotalCell(`=(SUM(H${t}:${lastDp}${t})/E${t})`, '0.00%'),
        ...range(dpCount).map((i) => {
            const col = summaryDpColumn(i);
            return S.summaryTotalCell(`=SUM(${col}4:${col}${lastEntry})`, '#,##0.00 $', i === dpCount - 1 ? { rightBorderStyle: 'medium' } : {});
        })
    ]);
    sheet.push([
        {}, {}, {}, {},
        S.summaryTotalLabel('Total contrat + Avenants', 15.75),
        S.summaryTotalCell(`=SUM(F4:F${lastEntry})`, '#,##0.00 $', { rightBorderColor: '#000000', rightBorderStyle: 'medium' })
    ]);
    return sheet.rows;
}

const DETAIL_COLUMNS = [13, 10, 46.29, 7.57, 14.71, 10, 16.14, 12, 16.57, 10.29];
const SUMMARY_COLUMNS = [10.71, 10.71, 12, 40, 25.14, 19.57, 9];

// Sheet list for write-excel-file.
export function buildDpmWorkbook(parsed, dpCount) {
    const slips = slipsWithRows(parsed);
    const detail = buildDetail(slips, dpCount);
    const summary = buildSummary(detail.spans, parsed.summary, dpCount);
    const J = 10;
    const ratioRule = (formula, textColor) => ({
        cellRange: { from: { row: 4, column: J }, to: { row: 9999, column: J } },
        condition: { formula },
        style: { textColor }
    });

    return [
        {
            data: detail.rows,
            sheet: SHEETS.detail,
            columns: [...DETAIL_COLUMNS, ...range(dpCount).flatMap(() => [15, 15.14, 34])].map((width) => ({ width })),
            stickyRowsCount: 3,
            stickyColumnsCount: 10,
            zoomScale: 0.7,
            conditionalFormatting: [
                ratioRule('=IF($J4 > 1,TRUE,FALSE)', '#FF0000'),
                ratioRule('=IF($J4 = 1,TRUE,FALSE)', '#48CF5C')
            ]
        },
        {
            data: summary,
            sheet: SHEETS.summary,
            columns: [...SUMMARY_COLUMNS, ...range(dpCount).map(() => 15)].map((width) => ({ width })),
            zoomScale: 0.7
        }
    ];
}

export const dpmFileName = (metadata) => `${metadata.projectNum}_DPM ${metadata.municipality}.xlsx`;
