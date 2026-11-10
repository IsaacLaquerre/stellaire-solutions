import { OUTPUT } from '../config.js';
import { pad, quoteSheet, safeSheetName } from '../utils.js';
import { FACTURE } from './facture.js';
import { RAPPORT, rapportRef } from './rapport.js';
import { BOLD, LINK, WRAP, align, bg, blank, borders, font, formula, height, nulls, num, rowSpan, spacer, span, str } from './styles.js';

export const V1371 = {
    headerRows: 11,
    entryRows: 14,
    articleCell: '$B$8',
    columns: [2.0758, 12.059, 12.8941, 9.0785, 14.8791, 14.8791, 2.9763, 8.9277, 8.9277, 8.9277, 8.9277, 3.3402, 6.1234, 3.3402, 20.29, 8.71, 3.57, 3.3402, 3.71, 5.71].map((width) => ({ width }))
};

export const v1371SheetName = (slip, article) => safeSheetName(`${OUTPUT.sheets.v1371Prefix}${slip.number}-${pad(article.number, 3)}`);

const AN9 = font('Arial Narrow', 9);
const GREY = bg('#D9D9D9');
const HAIR = 'hair';
const DATE = { format: 'yyyy-mm-dd' };
const greyLabel = (value, ...styles) => str(value, AN9, align('left', 'center'), GREY, ...styles);
const greyHeading = (value, vertical, sides, ...styles) => str(value, AN9, BOLD, align('center', vertical), GREY, borders(sides), ...styles);

// rapportRow: row of this article in Rapport Comparatif. slipIndex: shown as "Numéro de bordereau".
export function header({ rapportRow, articleNumber, slipIndex }) {
    const rc = (col) => rapportRef(`$${col}$${rapportRow}`);
    return [
        spacer(9.75),
        [
            null,
            formula(`=HYPERLINK("#${quoteSheet(RAPPORT.name)}!$${RAPPORT.col.article}$${rapportRow}","← Retour")`, font('Arial Narrow', 12), align('left', 'center'), WRAP, LINK, height(21)),
            null,
            str('Calcul des ouvrages exécutés – m, m² ou m³', font('Arial Narrow', 14), BOLD, align('left', 'center'), WRAP, bg('#BFBFBF'), span(17)),
            ...nulls(16)
        ],
        spacer(13.5),
        [
            null,
            greyLabel('Ouvrage payé au (unité)⁽¹⁾', BOLD, span(5), height(13.5)),
            ...nulls(5),
            greyLabel('Période du', span(5)),
            ...nulls(4),
            greyLabel('Numéro de dossier', span(3)),
            null,
            null,
            greyLabel('Numéro de l\'estimation', span(5)),
            ...nulls(4)
        ],
        [
            null,
            formula(`=${rc(RAPPORT.col.plannedQty)}`, AN9, align('center', 'center'), borders({ left: HAIR, bottom: HAIR }), span(4), height(16.5)),
            ...nulls(3),
            formula(`=${rc(RAPPORT.col.unit)}`, font('Arial Narrow', 11), align('center', 'center'), borders({ right: HAIR, bottom: HAIR })),
            null,
            formula(`=${quoteSheet(FACTURE.name)}!${FACTURE.startDateCell}`, DATE, AN9, align('right', 'center'), borders({ left: HAIR, bottom: HAIR }), span(2)),
            null,
            str('au', AN9, align('center', 'center'), borders({ bottom: HAIR })),
            formula(`=${quoteSheet(FACTURE.name)}!${FACTURE.endDateCell}`, DATE, AN9, align('left', 'center'), borders({ right: HAIR, bottom: HAIR }), span(2)),
            null,
            formula(`=${rapportRef(RAPPORT.projectNumCell)}`, AN9, align('left', 'center'), borders({ right: HAIR, bottom: HAIR }), span(3)),
            null,
            null,
            formula(`=${rapportRef(RAPPORT.estimateCell)}`, { format: '00' }, AN9, align('left', 'center'), borders({ left: HAIR, right: HAIR, bottom: HAIR }), span(5)),
            ...nulls(4)
        ],
        spacer(2.25),
        [
            null,
            greyLabel('Numéro de l\'article⁽²⁾', BOLD, span(2), height(13.5)),
            null,
            greyLabel('Désignation', span(9)),
            ...nulls(8),
            greyLabel('Entrepreneur', span(3)),
            null,
            null,
            greyLabel('Numéro de bordereau', span(5)),
            ...nulls(4)
        ],
        [
            null,
            num(articleNumber, { format: '000' }, AN9, align('left', 'center'), borders({ left: HAIR, bottom: HAIR }), span(2), height(16.5)),
            null,
            formula(`=${rc(RAPPORT.col.description)}`, AN9, align('left', 'center'), borders({ left: HAIR, right: HAIR, bottom: HAIR }), span(9)),
            ...nulls(8),
            str('Stellaire Construction', AN9, align('left', 'center'), borders({ right: HAIR, bottom: HAIR }), span(3)),
            null,
            null,
            num(slipIndex, { format: '00' }, AN9, align('left', 'center'), borders({ left: HAIR, right: HAIR, bottom: HAIR }), span(5)),
            ...nulls(4)
        ],
        spacer(2.25),
        [
            null,
            greyHeading('Chaînage', 'center', { left: HAIR, top: HAIR, bottom: HAIR }, span(3), rowSpan(2), height(16.5)),
            null,
            null,
            greyHeading('Côté', 'center', { left: HAIR, top: HAIR, bottom: HAIR }, rowSpan(2)),
            greyHeading('Longueur⁽³⁾', 'bottom', { left: HAIR, top: HAIR }, span(2)),
            null,
            greyHeading('Largeur', 'bottom', { left: HAIR, top: HAIR }, span(2)),
            null,
            greyHeading('Hauteur', 'bottom', { left: HAIR, top: HAIR }, span(2)),
            null,
            greyHeading('Unité', 'bottom', { left: HAIR, top: HAIR }, span(3)),
            null,
            null,
            greyHeading('Remarque', 'center', { left: HAIR, top: HAIR, right: HAIR, bottom: HAIR }, span(6), rowSpan(2)),
            ...nulls(5)
        ],
        [
            // Hidden helper cell (white text) used by the rounding in the footer.
            num(3, { textColor: '#FFFFFF' }),
            ...nulls(4),
            greyHeading('m', 'top', { left: HAIR, bottom: HAIR }, span(2), height(16.5)),
            null,
            greyHeading('m', 'top', { left: HAIR, bottom: HAIR }, span(2)),
            null,
            greyHeading('m', 'top', { left: HAIR, bottom: HAIR }, span(2)),
            null,
            Object.assign(greyHeading('', 'top', { left: HAIR, bottom: HAIR }, span(3)), { type: 'Formula', value: '=SUBSTITUTE($F$5,"Unité","un")' }),
            ...nulls(8)
        ]
    ];
}

const input = (...styles) => str('', borders({ left: HAIR, right: HAIR, bottom: HAIR }), ...styles);

export function entry() {
    return [
        null,
        input(span(3), height(16.5)),
        null,
        null,
        input(),
        input(span(2)),
        null,
        input(span(2)),
        null,
        input(span(2)),
        null,
        input(span(3)),
        null,
        null,
        input(span(6)),
        ...nulls(5)
    ];
}

const ROW_BOX = borders({ left: HAIR, bottom: HAIR, right: HAIR });
const DECIMAL = { format: '0.00' };
const BLUE = () => Array.from({ length: 6 }, () => str('', bg('#8DB3E2')));

// Value cells in columns F (span 2) and L (span 3).
const valueCell = (cell, ...styles) => Object.assign(cell, DECIMAL, AN9, align('right', 'center'), ROW_BOX, ...styles);

function totalLine(text, labelStyles, f, l, { blue = true } = {}) {
    return [
        null,
        null,
        str(text, AN9, align('left', 'center'), borders({ left: HAIR, bottom: HAIR }), span(3), height(16.5), ...labelStyles),
        null,
        null,
        valueCell(f, span(2)),
        ...nulls(5),
        valueCell(l, span(3)),
        null,
        null,
        ...(blue ? BLUE() : [])
    ];
}

export function footer() {
    const first = V1371.headerRows + 1;
    const last = V1371.headerRows + V1371.entryRows;
    const sheetA = last + 1, previous = last + 2, period = last + 3, before = last + 4;
    const D8 = bg('#D8D8D8');
    const F2 = bg('#F2F2F2');

    return [
        totalLine('Sous-total de la feuille (A)', [BOLD, D8], num(0, D8), formula(`=SUM($L$${first}:$N$${last})`, D8), { blue: false }),
        totalLine('Sous-total des feuilles précédentes (B)', [F2], num(0, BOLD), num(0, BOLD)),
        totalLine('Sous-total de la période courante (A + B)', [F2], formula(`=SUM($F$${sheetA}:$G$${previous})`), formula(`=SUM($L$${sheetA}:$N$${previous})`)),
        totalLine('Quantité totale de la période antérieure', [F2], num(0, BOLD), num(0, BOLD)),
        [
            null,
            null,
            null,
            str('Total', AN9, BOLD, align('left', 'center'), height(16.5)),
            null,
            valueCell(formula(`=ROUND(SUM(F${period}:G${before}),A11-1)`, BOLD), BOLD, D8, span(2)),
            ...nulls(5),
            valueCell(formula(`=ROUND(SUM(L${period}:N${before}),A11-1)`), BOLD, span(3)),
            null,
            null
        ]
    ];
}
