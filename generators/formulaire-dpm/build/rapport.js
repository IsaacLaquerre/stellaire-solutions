import { RAPPORT, entry, footer, header } from '../templates/rapport.js';
import { V1371, v1371SheetName } from '../templates/v1371.js';
import { formulaText, isPlaceholder, quoteSheet, roundCents, setCell, slipId, toNumber } from '../utils.js';

// Codes stay numbers when they are plain digits, text otherwise.
function workCode(code) {
    if (typeof code === 'number') return code;
    const text = String(code).trim();
    return /^\d+$/.test(text) ? Number(text) : text;
}

// Lists articles in output order with their row in Rapport Comparatif.
export function layoutArticles(slips) {
    const rows = [];
    for (const slip of slips) {
        for (const article of slip.articles) {
            rows.push({ slip, article, rapportRow: RAPPORT.firstDataRow + rows.length });
        }
    }
    return rows;
}

export function buildRapport(articleRows, metadata) {
    const lastRow = RAPPORT.firstDataRow + articleRows.length - 1;
    const { col } = RAPPORT;
    const data = header(lastRow);
    // Project number in R1 (see RAPPORT.projectNumCell).
    setCell(data[0], 'R', String(metadata.projectNum));

    for (const { slip, article, rapportRow: r } of articleRows) {
        const context = `bordereau ${slip.number}, article ${article.number}`;
        const quantity = isPlaceholder(article.quantity) ? 1 : toNumber(article.quantity, context);
        const unitPrice = toNumber(isPlaceholder(article.unitPrice) ? article.totalPrice : article.unitPrice, context);
        const row = entry();

        setCell(row, col.slip, slipId(slip));
        setCell(row, col.article, `=HYPERLINK("#${quoteSheet(v1371SheetName(slip, article))}!${V1371.articleCell}","${formulaText(article.number)}")`);
        const code = workCode(article.code);
        const codeCell = setCell(row, col.code, code);
        if (typeof code === 'string') codeCell.type = String;
        setCell(row, col.plannedQty, quantity);
        setCell(row, col.unit, String(article.unit));
        setCell(row, col.description, String(article.description));
        setCell(row, col.unitPrice, unitPrice);
        setCell(row, col.totalPrice, roundCents(unitPrice * quantity));
        setCell(row, col.variance, `=IFERROR($E$${r}*$K$${r}/$L$${r},0)`);
        setCell(row, col.previousTotal, `=$E$${r}*$K$${r}`);
        setCell(row, col.mtmdTotal, `=$F$${r}*$K$${r}`);
        setCell(row, col.contractorTotal, `=$G$${r}*$K$${r}`);
        setCell(row, col.difference, `=$O$${r}-$P$${r}`);

        data.push(row);
    }

    data.push(footer(lastRow));
    return { data, lastRow };
}
