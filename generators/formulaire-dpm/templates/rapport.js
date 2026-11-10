import { OUTPUT } from '../config.js';
import { quoteSheet } from '../utils.js';
import { BOLD, LINK, MONEY, WRAP, align, borders, box, font, formula, height, nulls, num, rowSpan, spacer, span, str } from './styles.js';

export const RAPPORT = {
    name: OUTPUT.sheets.rapport,
    headerRows: 8,
    firstDataRow: 9,
    projectNumCell: '$R$1',
    estimateCell: '$J$3',
    col: {
        slip: 'A', article: 'B', code: 'C', plannedQty: 'D', previousQty: 'E',
        mtmdQty: 'F', contractorQty: 'G', unit: 'H', description: 'I', rem: 'J',
        unitPrice: 'K', totalPrice: 'L', variance: 'M', previousTotal: 'N',
        mtmdTotal: 'O', contractorTotal: 'P', difference: 'Q', comments: 'R'
    },
    // Columns totalled in the header and footer rows.
    totalColumns: ['N', 'O', 'P', 'Q'],
    columns: [10.02, 6.87, 10.02, 9.44, 17.3, 21.73, 21.3, 15.16, 44.44, 13.44, 21.44, 13.44, 13.44, 18.02, 14.59, 16.73, 20.16, 36.16].map((width) => ({ width }))
};

// Reference to a Rapport Comparatif cell from another sheet.
export const rapportRef = (cell) => `${quoteSheet(RAPPORT.name)}!${cell}`;

const A11 = font('Aptos Narrow', 11);
const label = (value, ...styles) => str(value, A11, BOLD, align('left', 'center'), ...styles);
const sumCols = (lastRow) => RAPPORT.totalColumns.map((c) => `=SUM(${c}${RAPPORT.firstDataRow}:${c}${lastRow})`);

// "Total:" label in column M, then the totals in N..Q.
function totalsRow(lastRow, totalStyle) {
    return [
        ...nulls(12),
        str('Total:', A11, BOLD, align('right', 'center'), WRAP, borders({ right: 'thin' }), height(15)),
        ...sumCols(lastRow).map((f) => formula(f, MONEY, A11, BOLD, align('right', 'center'), WRAP, totalStyle))
    ];
}

const COLUMN_TITLES = [
    'Bordereau', 'Article', 'Code Ouvrage', 'Quantité prévue', 'Quantité cumulée paiement antérieur',
    'Quantité exécutée paiement courant\nMTMD', 'Quantité exécutée paiement courant Entrepreneur',
    'Unité de mesure', 'Désignation de l\'ouvrage', 'Rem\n*', 'Prix unitaire', 'Prix total', 'Écart %',
    'Total\npaiement antérieur', 'Total\nMTMD pour la période', 'Total Entrepreneur pour la période',
    'Écart MTMD/Entrepreneur', 'Commentaires/\njustificatifs MTMD'
];

export function header(lastRow) {
    return [
        [
            ...nulls(5),
            str('Rapport comparatif des travaux exécutés', font('Arial Black', 22), BOLD, align('center', 'center'), WRAP, height(29.25), span(6)),
            ...nulls(6),
            formula(`="Depuis estimation no "& ${RAPPORT.estimateCell} - 1`, A11, align('center', 'center'), WRAP, span(4)),
            ...nulls(3),
            label('No dossier', WRAP, borders({ top: 'medium', left: 'medium', right: 'thin', bottom: 'medium' })),
            str('', A11, align('center', 'center'), WRAP, borders({ top: 'medium', left: 'thin', right: 'medium', bottom: 'medium' }))
        ],
        spacer(9),
        [
            ...nulls(5),
            label('Numéro de la demande de paiement', WRAP, borders({ top: 'medium', left: 'medium', right: 'thin', bottom: 'thin' }), height(32.25)),
            formula(`=_xlfn.TEXTJOIN("",TRUE,_xlfn.TEXTSPLIT(${RAPPORT.projectNumCell},"-"))&"-"&${RAPPORT.estimateCell}`, A11, align('left', 'center'), borders({ top: 'medium', right: 'thin', bottom: 'thin' }), span(2)),
            null,
            label('No d\'estimation', borders({ top: 'medium', right: 'thin', bottom: 'thin' })),
            num(1, A11, align('center', 'center'), borders({ top: 'medium', right: 'medium', bottom: 'thin' })),
            label('Fournisseur', borders({ top: 'medium', right: 'thin', bottom: 'thin' })),
            null,
            null,
            str('Stellaire Construction Inc.', A11, align('left', 'center'), WRAP, borders({ top: 'medium', right: 'medium', bottom: 'thin' }), span(3)),
            null,
            null,
            label('Montant facture', borders({ top: 'medium', right: 'thin', bottom: 'medium' })),
            num(0, MONEY, A11, align('right', 'center'), borders({ top: 'medium', right: 'medium', bottom: 'medium' }))
        ],
        [
            ...nulls(5),
            label('Contrat (BC)', borders({ top: 'thin', left: 'medium', right: 'thin', bottom: 'thin' }), height(14.25)),
            str('', A11, align('left', 'center'), box('thin'), span(2)),
            null,
            label('Type de paiement', box('thin')),
            str('Régulière', A11, align('center', 'center'), borders({ top: 'thin', left: 'thin', right: 'medium', bottom: 'thin' })),
            label('No facture', borders({ top: 'thin', left: 'medium', bottom: 'thin' })),
            null,
            null,
            str('', A11, align('left', 'center'), borders({ top: 'thin', left: 'thin', right: 'medium', bottom: 'thin' }), span(3)),
            null,
            null,
            label('Montant payable', borders({ top: 'thin', left: 'medium', right: 'medium', bottom: 'medium' }), rowSpan(2)),
            formula('=0', MONEY, A11, align('right', 'center'), borders({ top: 'thin', left: 'medium', right: 'medium', bottom: 'medium' }), rowSpan(2))
        ],
        [
            ...nulls(5),
            label('Unité administrative', WRAP, borders({ top: 'thin', left: 'medium', right: 'thin', bottom: 'medium' }), height(15)),
            num(1556603, A11, align('left', 'center'), borders({ top: 'thin', left: 'thin', right: 'thin', bottom: 'medium' }), span(2)),
            null,
            label('Travail fait en date du', WRAP, borders({ top: 'thin', left: 'thin', right: 'thin', bottom: 'medium' })),
            str('', A11, align('left', 'center'), WRAP, borders({ top: 'thin', left: 'thin', right: 'medium', bottom: 'medium' })),
            label('Date réception facture', WRAP, borders({ top: 'thin', left: 'medium', right: 'thin', bottom: 'medium' })),
            null,
            null,
            str('', A11, align('left', 'center'), WRAP, borders({ top: 'thin', left: 'thin', right: 'medium', bottom: 'medium' }), span(3)),
            ...nulls(4)
        ],
        spacer(8.25),
        totalsRow(lastRow, borders({ top: 'thin', right: 'thin' })),
        COLUMN_TITLES.map((title, i) => str(title, A11, BOLD, align('center', 'top'), WRAP, box('thin'), i === 0 ? height(60) : {}))
    ];
}

const RB = borders({ right: 'thin', bottom: 'thin' });
const entryCell = (make, value, horizontal, ...styles) => make(value, ...styles, A11, align(horizontal, 'bottom'), RB);

export function entry() {
    return [
        entryCell(str, 'XX-XXX', 'left'),
        entryCell(formula, '=0', 'right', WRAP, LINK),
        ...Array.from({ length: 5 }, () => entryCell(num, 0, 'right')),
        entryCell(str, 'G', 'left'),
        entryCell(str, '', 'left', WRAP),
        entryCell(str, '', 'left'),
        entryCell(num, 0, 'right', MONEY),
        entryCell(num, 0, 'right', MONEY),
        entryCell(formula, '=0', 'right', { format: '0.00%' }),
        ...Array.from({ length: 4 }, () => entryCell(formula, '=0', 'right', MONEY)),
        entryCell(str, '', 'right')
    ];
}

export const footer = (lastRow) => totalsRow(lastRow, borders({ top: 'thin', right: 'thin', bottom: 'thin' }));
