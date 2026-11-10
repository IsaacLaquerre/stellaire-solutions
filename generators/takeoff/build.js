// Builds the TakeOff workbook: "Take Off" (estimate per article),
// "Frais Généraux" (site overhead) and "Bordereau Balancé" (price balance).
import { clone, numberOr, SheetBuilder } from '../shared/excel.js';
import { LAYOUT, slipsWithRows } from '../shared/bordereau.js';
import { BALANCE_SLIP_END, COLUMN_WIDTHS, FRAIS_GENERAUX, FRAIS_SIDE_NOTES, ROWS, fraisSectionRow } from './templates.js';

export const SHEETS = { takeOff: 'Take Off', frais: 'Frais Généraux', balance: 'Bordereau Balancé' };

// Blank estimate lines under each article in "Take Off".
export const ESTIMATE_LINES = 4;

const projectLabel = (m) => `${m.projectNum} - ${m.projectTitle}, ${m.municipality}`;
const keyFormula = (r) => `=D${r}&"-"&E${r}`;

// ---------------------------------------------------------- Take Off ----

function takeOffArticle(sheet, slip, row) {
    const r = sheet.nextRow;
    const cells = clone(ROWS.takeOff.article);
    cells[1].value = keyFormula(r);
    cells[2].value = `=U${r}`;
    cells[3].value = slip.number;
    cells[4].value = Number(row.article);
    cells[5].value += row.description;
    cells[6].value = row.quantity;
    cells[7].value = row.unit;
    cells[10].value = `=IFERROR(SUM(M${r + 1}:M${r + ESTIMATE_LINES})/L${r + ESTIMATE_LINES},0)`;
    cells[19].value = `=IFERROR(U${r}/G${r},0)`;
    cells[20].value = `=SUM(U${r + 1}:U${r + ESTIMATE_LINES})`;
    cells[21].value = `=U${r}`;
    sheet.push(cells);

    // A ministry-set unit price is copied on the first estimate line.
    const fixedPrice = row.unitPrice !== LAYOUT.placeholder && row.unitPrice !== '';
    for (let line = 0; line < ESTIMATE_LINES; line++) {
        const e = sheet.nextRow;
        const est = clone(ROWS.takeOff.empty);
        est[1].value = keyFormula(e);
        est[2].value = `=U${e}`;
        est[3].value = slip.number;
        if (fixedPrice && line === 0) {
            // Comma decimals so French Excel reads them as numbers.
            est[5].value = 'Montant fixé par le Ministère';
            est[6].value = String(row.quantity).replaceAll('.', ',');
            est[7].value = row.unit;
            est[8].value = String(row.unitPrice).replaceAll('.', ',');
        }
        est[9].value = `=G${e}*I${e}`;
        est[12].value = `=G${e}*K${e}*L${e}`;
        est[14].value = `=G${e}*N${e}`;
        est[16].value = `=G${e}*P${e}`;
        est[18].value = `=G${e}*R${e}`;
        est[19].value = `=IF(G${e}>0,U${e}/G${e}, )`;
        est[20].value = `=J${e}+M${e}+O${e}+Q${e}+S${e}`;
        sheet.push(est);
    }
}

function buildTakeOff(parsed, now) {
    const sheet = new SheetBuilder();
    const header = clone(ROWS.takeOff.header);
    header[0][8].value = projectLabel(parsed.metadata);
    header[2][17].value = now.toLocaleDateString('fr-CA');
    sheet.push(...header);

    for (const slip of parsed.slips) {
        const r = sheet.nextRow;
        const slipCells = clone(ROWS.takeOff.slip);
        slipCells[1].value = keyFormula(r);
        slipCells[3].value = slip.number;
        slipCells[5].value += `${slip.number} - ${slip.title}`;
        sheet.push(slipCells);

        for (const row of slip.rows) {
            if (row.type === 'article') {
                takeOffArticle(sheet, slip, row);
                continue;
            }
            const s = sheet.nextRow;
            const section = clone(ROWS.takeOff.section);
            section[1].value = keyFormula(s);
            section[2].value = `=U${s}`;
            section[3].value = slip.number;
            section[5].value += row.description;
            sheet.push(section);
        }
    }

    // Subtotal row: other sheets read the totals from it.
    const subtotal = sheet.nextRow;
    const last = subtotal - 1;
    const footer = clone(ROWS.takeOff.footer);
    footer[0][8].value = `=SUM(J8:J${last})`;
    footer[0][10].value = `=SUM(M${subtotal}/$X$1)`;
    footer[0][12].value = `=SUM(M8:M${last})`;
    footer[0][13].value = `=SUM(O8:O${last})`;
    footer[0][15].value = `=SUM(Q8:Q${last})`;
    footer[0][17].value = `=SUM(S8:S${last})`;
    footer[0][20].value = `=SUM(V8:V${last})`;
    sheet.push(...footer);

    return { rows: sheet.rows, subtotal };
}

// ---------------------------------------------------- Frais Généraux ----

// Type of a default overhead value, as read from the item list.
function itemCell(cell, k, length, r) {
    const value = (cell && typeof cell === 'object' ? cell.value : cell) || cell;
    const text = value ? value.toString() : '';
    const type = !value ? 'String'
        : text.startsWith('=') ? 'Formula'
        : !Number.isNaN(parseFloat(text.replace(',', '.'))) ? 'Number' : 'String';
    const isTotal = k === length - 2;
    const out = {
        type,
        value: type === 'Number' ? parseFloat(text.replace(',', '.')) : text.replaceAll('${row}', r),
        fontSize: 10,
        fontFamily: 'Arial',
        fontWeight: isTotal ? 'bold' : 'normal',
        align: k === 0 ? 'left' : isTotal ? 'right' : 'center',
        alignVertical: 'bottom',
        bottomBorderColor: '#000000',
        bottomBorderStyle: 'hair'
    };
    if (cell.format) out.format = cell.format;
    if (cell.span) out.span = cell.span;
    if (k === 0 || isTotal) Object.assign(out, { leftBorderColor: '#000000', leftBorderStyle: 'hair' });
    if (k === length - 1 || isTotal) Object.assign(out, { rightBorderColor: '#000000', rightBorderStyle: 'hair' });
    return out;
}

function buildFrais(parsed, takeOffSubtotal) {
    const sheet = new SheetBuilder();
    const header = clone(ROWS.fraisGeneraux.header);
    header[0][2].value = projectLabel(parsed.metadata);
    sheet.push(...header);

    for (const [title, entries] of Object.entries(FRAIS_GENERAUX)) {
        sheet.push(fraisSectionRow(title));
        for (const entry of entries) {
            const r = sheet.nextRow;
            const row = [{ type: 'String', value: '', height: 14.75 }];
            entry.forEach((cell, k) => row.push(cell === null ? null : itemCell(cell, k, entry.length, r)));
            if (FRAIS_SIDE_NOTES[r]) row.push(...clone(FRAIS_SIDE_NOTES[r]));
            sheet.push(row);
        }
    }

    const g = sheet.nextRow;
    const t = takeOffSubtotal;
    const ref = (col) => `='${SHEETS.takeOff}'!${col}${t}`;
    const footer = clone(ROWS.fraisGeneraux.footer);
    footer[0][7].value = `=SUM(H8:H${g - 1})`;
    footer[0][8].value = `=SUM(I8:I${g - 1})`;
    footer[0][9].value = `=H${g} + I${g}`;
    footer[3][2].value = ref('I');
    footer[3][3].value = ref('M');
    footer[3][4].value = ref('N');
    footer[3][6].value = ref('P');
    footer[3][8].value = ref('R');
    footer[3][9].value = ref('U');
    footer[6][9].value = `=OFFSET(J${g + 6}, -6, 0) + OFFSET(J${g + 6}, -3, 0) + OFFSET(J${g + 6}, -2, 0)`;
    footer[8][12].value = `=SUM(J${g + 6}:J${g + 7})`;
    footer[9][9].value = `=M${g + 8}*I${g + 9}`;
    footer[9][12].value = `=J${g + 9}`;
    footer[12][9].value = `=SUM(J${g + 6}:J${g + 11})`;
    sheet.push(...footer);

    return { rows: sheet.rows, footerStart: g };
}

// -------------------------------------------------- Bordereau Balancé ----

function buildBalance(parsed, takeOffSubtotal, fraisFooter) {
    const sheet = new SheetBuilder();
    sheet.push(...clone(ROWS.bordereauBalance.header));

    for (const slip of parsed.slips) {
        const slipCells = clone(ROWS.bordereauBalance.slip);
        slipCells[2].value += `${slip.number} - ${slip.title}`;
        sheet.push(slipCells);

        for (const row of slip.rows) {
            if (row.type === 'section') {
                const section = clone(ROWS.bordereauBalance.section);
                section[7].value = row.description;
                sheet.push(section);
                continue;
            }
            const b = sheet.nextRow;
            const cells = clone(ROWS.bordereauBalance.article);
            cells[0].value = `=C${b}`;
            cells[1].value = `=A${b}&"-"&D${b}`;
            cells[2].value = String(slip.number);
            cells[3].value = Number(row.article);
            cells[4].value = row.code === undefined ? '' : String(row.code);
            cells[5].value = row.quantity === '' ? '1' : row.quantity;
            if (row.unit === 'G') cells[6].backgroundColor = '#70AD47';
            cells[6].value = row.unit === 'G' ? 'Global' : row.unit;
            cells[7].value = row.description;
            cells[8].value = `=IFERROR(J${b}/F${b},0)`;
            cells[9].value = `=VLOOKUP(B${b},'${SHEETS.takeOff}'!B8:C${takeOffSubtotal},2,FALSE)`;
            cells[10].value = `=I${b}*$L$1`;
            cells[11].value = `=K${b}*F${b}`;
            cells[12].value = numberOr(row.unitPrice, 0);
            cells[13].value = `=M${b}*F${b}`;
            cells[14].value = `=N${b}-L${b}`;
            cells[15].value = `=N${b}-J${b}`;
            sheet.push(cells);
        }
        sheet.push(clone(BALANCE_SLIP_END));
    }

    const h = sheet.lastRow;
    const frais = `'${SHEETS.frais}'`;
    const footer = clone(ROWS.bordereauBalance.footer);
    footer[1][9].value = `=SUM(J7:J${h})`;
    footer[1][11].value = `=SUM(L7:L${h})`;
    footer[1][13].value = `=SUM(N7:N${h})`;
    footer[2][13].value = `=(N${h + 2}/J${h + 8})`;
    footer[5][9].value = `=${frais}!H${fraisFooter}`;
    footer[6][8].value = `=${frais}!I${fraisFooter + 9}`;
    footer[6][9].value = `=${frais}!M${fraisFooter + 9}`;
    footer[7][9].value = `=SUM(J${h + 2}:J${h + 7})`;
    sheet.push(...footer);
    return sheet.rows;
}

// Sheet list for write-excel-file.
export function buildTakeOffWorkbook(parsed, { now = new Date() } = {}) {
    slipsWithRows(parsed);
    const takeOff = buildTakeOff(parsed, now);
    const frais = buildFrais(parsed, takeOff.subtotal);
    const balance = buildBalance(parsed, takeOff.subtotal, frais.footerStart);
    const widths = (list) => list.map((width) => ({ width }));

    return [
        { data: takeOff.rows, sheet: SHEETS.takeOff, columns: widths(COLUMN_WIDTHS.takeOff), stickyRowsCount: 7, zoomScale: 0.7, orientation: 'landscape' },
        { data: frais.rows, sheet: SHEETS.frais, columns: widths(COLUMN_WIDTHS.fraisGeneraux), orientation: 'portrait' },
        { data: balance, sheet: SHEETS.balance, columns: widths(COLUMN_WIDTHS.bordereauBalance), stickyRowsCount: 6, zoomScale: 0.7, orientation: 'portrait' }
    ];
}

export const takeOffFileName = (metadata) => `${metadata.projectNum}_TakeOff ${metadata.municipality}.xlsx`;
