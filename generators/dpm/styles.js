// Cell styles and templates of the DPM workbook.

export const COLORS = {
    section: '#e2efda',
    slip: '#93a299',
    header: '#39463f',
    header2: '#d9d9d9',
    row: '#d9d9d9',
    code: '#c0c000'
};

const HAIR = { borderColor: '#000000', borderStyle: 'hair' };
const BLACK = '#000000';

// Cell factory: `base` style merged with per-cell overrides.
const styled = (base) => (overrides = {}) => ({ type: 'String', value: '', ...base, ...overrides });

// ----------------------------------------------------- Bordereau Réel ----

const headerCell = styled({ backgroundColor: COLORS.header, textColor: '#ffffff', fontSize: 11, fontFamily: 'Arial', fontWeight: 'bold', wrap: true, ...HAIR });
const fillerCell = styled({ backgroundColor: COLORS.header, textColor: '#ffffff', fontSize: 11, fontFamily: 'Arial', wrap: true, ...HAIR });
export const slipCell = styled({ backgroundColor: COLORS.slip, textColor: COLORS.header, fontSize: 12, fontFamily: 'Arial', fontWeight: 'bold', align: 'left', alignVertical: 'center', wrap: false, ...HAIR });
export const sectionCell = styled({ backgroundColor: COLORS.section, textColor: COLORS.header, fontSize: 12, fontFamily: 'Arial', align: 'left', alignVertical: 'bottom', wrap: false, ...HAIR });
const articleCell = styled({ backgroundColor: COLORS.row, textColor: COLORS.header, fontSize: 11, fontFamily: 'Calibri', ...HAIR });
const dpEntryCell = styled({ textColor: COLORS.header, fontSize: 11, fontFamily: 'Calibri', align: 'left', alignVertical: 'bottom', wrap: false, ...HAIR });
const dpHeaderCell = styled({ backgroundColor: COLORS.header, textColor: '#ffffff', fontSize: 11, fontFamily: 'Arial', alignVertical: 'bottom', wrap: false, ...HAIR });

// Columns A to J of the first header row.
export function headerRow() {
    const c = (value, align, alignVertical) => headerCell({ value, align, alignVertical });
    return [
        { ...c('Article Bordereau', 'center', 'center'), height: 45 },
        c('Code', 'center', 'center'),
        c('Désignation', 'left', 'center'),
        c('Unité', 'center', 'center'),
        c('Prix Unitaire', 'center', 'center'),
        c('Qté Prévue', 'center', 'center'),
        c('Montant Prévu', 'center', 'center'),
        c('Cumulatif', 'center', 'bottom'),
        c('Cumulatif', 'center', 'bottom'),
        c('', 'center', 'bottom')
    ];
}

// Columns A to J of the second and third header rows.
export function fillerRow(labels = ['', '', '']) {
    const c = (align, alignVertical) => fillerCell({ align, alignVertical });
    const bold = (value) => fillerCell({ value, fontWeight: 'bold', align: 'center', alignVertical: 'bottom' });
    return [
        { ...c('center', 'center'), height: 15 },
        c('center', 'center'),
        c('left', 'center'),
        c('center', 'center'),
        c('center', 'center'),
        c('center', 'center'),
        c('center', 'center'),
        ...labels.map(bold)
    ];
}

// Per-DP header cells (3 columns each).
export const dpHeaderCells = (n) => [
    dpHeaderCell({ value: `DP${n}`, fontWeight: 'bold', align: 'left' }),
    dpHeaderCell({ fontWeight: 'bold', align: 'left' }),
    dpHeaderCell({ fontWeight: 'bold', align: 'left' })
];
export const dpPeriodCells = () => [
    dpHeaderCell({ value: '    Période courante', align: 'center' }),
    dpHeaderCell({ align: 'center' }),
    dpHeaderCell({ align: 'left' })
];
export const dpLabelCells = () => ['Quantité', 'Montant', 'Remarque'].map((value) => dpHeaderCell({ value, align: 'center' }));

// Ten styled cells in columns A to J, `first` holding the text.
export const slipRow = (text) => [{ ...slipCell({ value: text }), height: 18 }, ...Array.from({ length: 9 }, () => slipCell())];
export const sectionRow = (text) => [{ ...sectionCell({ value: text }), height: 15.75 }, ...Array.from({ length: 9 }, () => sectionCell())];
export const fill = (count, factory) => Array.from({ length: count }, () => factory());

// Columns A to J of an article row (values filled by the builder).
export function articleRow() {
    return [
        articleCell({ align: 'left', alignVertical: 'bottom', wrap: false }),
        articleCell({ type: 'Number', fillPatternStyle: 'darkDown', fillPatternColor: COLORS.code, fontFamily: 'Arial', align: 'center', alignVertical: 'bottom', wrap: false }),
        articleCell({ align: 'left', alignVertical: 'center', wrap: true }),
        articleCell({ align: 'center', alignVertical: 'bottom', wrap: true }),
        articleCell({ type: 'Number', format: '#,##0.00 $', align: 'right', alignVertical: 'bottom', wrap: true }),
        articleCell({ type: 'Number', format: '#,##0.00', align: 'right', alignVertical: 'bottom', wrap: true }),
        articleCell({ type: 'Formula', format: '#,##0.00 $', align: 'right', alignVertical: 'bottom', wrap: false }),
        articleCell({ type: 'Formula', format: '#,##0.00', align: 'right', alignVertical: 'bottom', wrap: false }),
        articleCell({ type: 'Formula', format: '#,##0.00 $', align: 'right', alignVertical: 'bottom', wrap: false }),
        articleCell({ type: 'Formula', format: '0.00%', align: 'center', alignVertical: 'bottom', wrap: false })
    ];
}

// Per-DP cells of an article row: quantity, amount formula, remark.
export const dpEntryCells = (amountFormula) => [
    dpEntryCell(),
    dpEntryCell({ type: 'Formula', format: '#,##0.00$', value: amountFormula }),
    dpEntryCell()
];

// Last row of the sheet (totals), styled with a double blue border.
const TOTAL_BORDER = { topBorderStyle: 'double', topBorderColor: '#4472c4', bottomBorderStyle: 'double', bottomBorderColor: '#4472c4' };
export function totalRow({ plannedSum, realSum, ratio }) {
    return [
        {}, {}, {}, {}, {},
        { type: 'String', value: 'Total', fontSize: 12, fontWeight: 'bold', ...TOTAL_BORDER, leftBorderStyle: 'double', leftBorderColor: '#4472c4' },
        { type: 'Formula', format: '#,##0.00 $', value: plannedSum, fontSize: 12, fontWeight: 'bold', ...TOTAL_BORDER },
        { ...TOTAL_BORDER },
        { type: 'Formula', format: '#,##0.00 $', value: realSum, fontSize: 12, fontWeight: 'bold', ...TOTAL_BORDER },
        { type: 'Formula', format: '0.00%', value: ratio, fontSize: 12, fontWeight: 'bold', ...TOTAL_BORDER, rightBorderStyle: 'double', rightBorderColor: '#4472c4' }
    ];
}
export const dpTotalCells = (sumFormula) => [
    null,
    { type: 'Formula', value: sumFormula, format: '#,##0.00 $', fontSize: 11, fontFamily: 'Calibri', align: 'right', alignVertical: 'bottom' },
    null
];

// ------------------------------------------------------------ Sommaire ----

const sides = (top, right, bottom, left) => ({
    topBorderColor: BLACK, topBorderStyle: top,
    rightBorderColor: BLACK, rightBorderStyle: right,
    bottomBorderColor: BLACK, bottomBorderStyle: bottom,
    leftBorderColor: BLACK, leftBorderStyle: left
});
const summaryHeadCell = styled({ backgroundColor: COLORS.header2, textColor: BLACK, fontSize: 11, fontFamily: 'Calibri', align: 'center', alignVertical: 'center', wrap: false });
const summaryCell = styled({ backgroundColor: '#ffffff', textColor: BLACK, fontSize: 11, fontFamily: 'Calibri', wrap: false, borderColor: BLACK });
const thin = { topBorderStyle: 'thin', rightBorderStyle: 'thin', bottomBorderStyle: 'thin', leftBorderStyle: 'thin' };

export function summaryHeaderRow() {
    const c = (value, left, wrap = false) => summaryHeadCell({ value, wrap, ...sides('medium', 'thin', 'thin', left) });
    return [
        { type: 'String', value: '', height: 51.75 },
        c('Bord.', 'medium'),
        c('Document', 'thin'),
        c('Description', 'thin'),
        c('Total bordereau initial soumissionné', 'thin', true),
        c('Total cumulatif réel', 'thin'),
        c('%', 'thin')
    ];
}
export const summaryFillerRow = () => [{ type: 'String', value: '', height: 27 }, ...fill(6, () => ({ type: 'String', value: '' }))];
export const summaryDpHeadCell = (value = '') =>
    summaryHeadCell({ value, borderColor: BLACK, topBorderStyle: 'medium', rightBorderStyle: 'thin', bottomBorderStyle: 'thin', leftBorderStyle: 'thin' });

// Columns A to G of a summary line. `bottom` is the bottom border style.
export function summaryEntryRow({ index, number, title = '', label, total, cumulative, ratio, bottom = 'thin' }) {
    const text = (value, align, alignVertical, extra = {}) => summaryCell({ value, align, alignVertical, ...thin, ...extra });
    return [
        { type: 'String', value: '', height: 27 },
        text(index, 'center', 'center', { leftBorderStyle: 'medium', bottomBorderStyle: bottom }),
        text(number, 'center', 'center', { bottomBorderStyle: bottom }),
        text(title, 'center', 'center', { wrap: true, bottomBorderStyle: bottom }),
        label === undefined
            ? summaryCell({ type: 'Number', format: '#,##0.00 $', value: total, align: 'right', alignVertical: 'center', ...thin })
            : text(label, 'left', 'bottom', { bottomBorderStyle: bottom }),
        summaryCell({ type: 'Formula', format: '#,##0.00 $', value: cumulative, align: 'right', alignVertical: 'center', ...thin, bottomBorderStyle: bottom }),
        summaryCell({ type: 'Formula', format: '0.00%', value: ratio, align: 'center', alignVertical: 'center', ...thin, bottomBorderStyle: bottom })
    ];
}
export const summaryDpCell = (value, { bottom = 'thin', last = false } = {}) => ({
    type: 'Formula', format: '#,##0.00 $', value,
    backgroundColor: '#ffffff', textColor: BLACK, fontSize: 11, fontFamily: 'Calibri', align: 'right', alignVertical: 'center', wrap: false,
    borderColor: BLACK, ...thin, bottomBorderStyle: bottom, ...(last ? { rightBorderStyle: 'medium' } : {}), height: 27
});

const MEDIUM_BOX = { topBorderStyle: 'medium', topBorderColor: BLACK, bottomBorderStyle: 'medium', bottomBorderColor: BLACK, leftBorderStyle: 'medium', leftBorderColor: BLACK };
export const summaryTotalLabel = (value, height) => ({ type: 'String', value, fontSize: 11, align: 'right', alignVertical: 'center', ...MEDIUM_BOX, height });
export const summaryTotalCell = (value, format = '#,##0.00 $', extra = {}) => ({
    type: 'Formula', format, value, fontSize: 11, align: format === '0.00%' ? 'center' : 'right', alignVertical: 'center', ...MEDIUM_BOX, ...extra
});
export const summaryBlankBox = () => ({ ...MEDIUM_BOX });
