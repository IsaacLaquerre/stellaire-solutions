import { OUTPUT } from '../config.js';
import { RAPPORT, rapportRef } from './rapport.js';
import { BOLD, MONEY, WRAP, align, bg, blank, borders, box, font, formula, height, nulls, num, rowSpan, spacer, span, str } from './styles.js';

export const FACTURE = {
    name: OUTPUT.sheets.facture,
    headerRows: 8,
    firstEntryRow: 9,
    // The distribution list always shows at least this many lines.
    minEntries: 13,
    // Labels in column A, by entry offset from the first entry row.
    entryLabels: { 0: 'Surveillant:', 5: 'Autre:' },
    startDateCell: '$D$6',
    endDateCell: '$E$6',
    columns: [41, 17, 30.5, 17.4468, 20.6483, 20.6483, 26.6064, 3.3411].map((width) => ({ width }))
};

const C8 = font('Courier New', 8);
const T10 = font('Times New Roman', 10);
const THIN = 'thin';
const DATE = { format: 'yyyy-mm-dd' };
const AMOUNT = { format: '# ##0.00"  $"' };
const HEADING = [C8, BOLD, align('center', 'top'), WRAP, bg('#D9DBDC'), box(THIN)];

export function header() {
    return [
        [
            str('Demande de paiement', font('Courier New', 9.5), BOLD, align('center', 'top'), WRAP, span(5), height(13.5)),
            ...nulls(4),
            str('PAGE : 1 de 1', C8, align('center', 'top'), WRAP, span(2)),
            null
        ],
        spacer(40.5),
        [
            str('', C8, align('center', 'top'), WRAP, box(THIN), span(4), rowSpan(2), height(11.25)),
            ...nulls(3),
            formula(`="Dossier"&CHAR(10)&CHAR(10)&${rapportRef(RAPPORT.projectNumCell)}`, C8, align('left', 'top'), WRAP, box(THIN), rowSpan(2)),
            formula(`="Estimation"&CHAR(10)&CHAR(10)&TEXT(${rapportRef(RAPPORT.estimateCell)}, "00")`, C8, align('left', 'top'), WRAP, box(THIN), rowSpan(2)),
            str('Montant original contrat', C8, align('left', 'top'), WRAP, borders({ top: THIN, left: THIN, right: THIN }), span(2)),
            null
        ],
        [
            ...nulls(6),
            num(0, MONEY, T10, align('left', 'center'), WRAP, borders({ left: THIN, bottom: THIN, right: THIN }), span(2), height(43.5)),
            null
        ],
        [
            str('Nom et adresse du fournisseur', C8, align('center', 'top'), WRAP, borders({ top: THIN, left: THIN, right: THIN }), span(3), height(11.25)),
            null,
            null,
            str('Début période', C8, align('left', 'top'), WRAP, borders({ top: THIN, left: THIN, right: THIN })),
            str('Fin période', C8, align('left', 'top'), WRAP, borders({ top: THIN, left: THIN, right: THIN })),
            str('Date transmission de la facture', C8, align('left', 'top'), WRAP, borders({ top: THIN, left: THIN, right: THIN }), span(3)),
            null,
            null
        ],
        [
            str('Stellaire Construction\n100 rue des Grands-Lacs, Saint-Augustin-de-Desmaures, QC G3A 2K1', C8, align('center', 'top'), WRAP, borders({ left: THIN, bottom: THIN, right: THIN }), span(3), height(21)),
            null,
            null,
            num(0, DATE, C8, align('left', 'top'), WRAP, borders({ left: THIN, bottom: THIN, right: THIN })),
            formula('=EOMONTH(D6, 0)', DATE, C8, align('left', 'top'), WRAP, borders({ left: THIN, bottom: THIN, right: THIN })),
            formula('=E6+1', DATE, C8, align('left', 'top'), WRAP, borders({ left: THIN, bottom: THIN, right: THIN }), span(3)),
            null,
            null
        ],
        spacer(6),
        [
            str('Liste de distribution', ...HEADING, height(21.75)),
            str('No. bordereau', ...HEADING),
            str('Description des bordereaux', ...HEADING, span(3)),
            null,
            null,
            str('Total', ...HEADING, span(3)),
            null,
            null
        ]
    ];
}

const LABEL_STYLE = { fontSize: 8, fontFamily: 'Courier New', fontWeight: 'bold' };

// offset: position of the line in the distribution list (0 = first).
export function entry(offset = -1) {
    const row = [
        str('', T10, align('left', 'bottom'), WRAP, borders({ left: THIN, right: THIN }), height(11.25)),
        num(0, { format: '0#' }, C8, align('center', 'bottom'), WRAP, borders({ top: THIN, right: THIN, bottom: THIN })),
        str('', T10, align('left', 'bottom'), WRAP, borders({ top: THIN, right: THIN, bottom: THIN }), span(3)),
        null,
        null,
        formula('=0', { format: '* #,##0.00 $; * (#,##0.00) $; * "-"?? $;@' }, T10, align('right', 'bottom'), WRAP, borders({ top: THIN, right: THIN, bottom: THIN }), span(3)),
        null,
        null
    ];
    const label = FACTURE.entryLabels[offset];
    if (label) Object.assign(row[0], LABEL_STYLE, { value: label });
    return row;
}

// One "label: amount" line of the totals block.
function amountLine(rowHeight, text, valueCell) {
    return [
        str('', T10, align('left', 'bottom'), WRAP, borders({ right: THIN }), height(rowHeight)),
        str('', C8, align('center', 'bottom'), borders({ bottom: THIN })),
        str(text, C8, align('right', 'bottom'), borders({ right: THIN, bottom: THIN }), span(3)),
        null,
        null,
        Object.assign(valueCell, AMOUNT, C8, align('right', 'top'), borders({ right: THIN, bottom: THIN }), span(3)),
        null,
        null
    ];
}

const signCell = (value, sides, ...styles) => str(value, C8, align('center', 'top'), borders(sides), ...styles);

// firstEntryRow/lastEntryRow: rows of the distribution list. Footer rows follow it.
export function footer(firstEntryRow, lastEntryRow) {
    const r = lastEntryRow + 1;
    // Rows of the amount lines, in order.
    const total = r + 1, holdbacks = r + 2, subtotal = r + 3, previous = r + 4, current = r + 5, tps = r + 6, tvq = r + 7;
    const ref = (row) => `F${row}`;

    return [
        [
            str('', T10, align('left', 'bottom'), WRAP, borders({ right: THIN }), height(12.75)),
            str('', C8, align('center', 'bottom'), borders({ right: THIN, bottom: THIN })),
            str('', C8, align('center', 'bottom'), borders({ right: THIN, bottom: THIN }), span(3)),
            null,
            null,
            str('', C8, align('right', 'top'), borders({ right: THIN, bottom: THIN }), span(3)),
            null,
            null
        ],
        amountLine(11.25, 'Total des ouvrages exécutés', formula(`=SUM(F${firstEntryRow}:H${lastEntryRow})`)),
        amountLine(11.25, 'MOINS: Cumulatif des retenues', blank()),
        amountLine(11.25, 'Sous-total des ouvrages exécutés', formula(`=${ref(total)}-${ref(holdbacks)}`)),
        amountLine(12.75, 'MOINS: Ouvrages paiements antérieurs', blank()),
        amountLine(12, 'Sous-total de la facture courante', formula(`=${ref(subtotal)}-${ref(previous)}`)),
        amountLine(12.75, 'TPS', formula(`=${ref(current)}*${OUTPUT.tps}`)),
        amountLine(13.5, 'TVQ', formula(`=${ref(current)}*${OUTPUT.tvq}`)),
        amountLine(11.25, 'Montant à payer', formula(`=${ref(current)}+${ref(tps)}+${ref(tvq)}`)),
        spacer(14.25),
        [
            str('PRÉPARATION', C8, align('center', 'top'), box(THIN), span(2), height(11.25)),
            ...nulls(3),
            str('CONTRÔLE SURVEILLANT', C8, align('center', 'top'), box(THIN), span(4)),
            ...nulls(3)
        ],
        signatureRow(['', '', '', '']),
        signatureRow(['Représentant de l\'entrepreneur', 'Date', 'Surveillant', 'Date'])
    ];
}

function signatureRow([a, b, e, g]) {
    return [
        signCell(a, { top: THIN, left: THIN, bottom: THIN }, height(16.5)),
        signCell(b, { top: THIN, right: THIN, bottom: THIN }),
        null,
        null,
        signCell(e, { top: THIN, left: THIN, bottom: THIN }, span(2)),
        null,
        signCell(g, { top: THIN, right: THIN, bottom: THIN }, span(2)),
        null
    ];
}
