// Helpers shared by the spreadsheet generators (write-excel-file cell objects).

// 1 -> A, 27 -> AA
export function columnToLetter(column) {
    let letter = '';
    while (column > 0) {
        const rest = (column - 1) % 26;
        letter = String.fromCharCode(rest + 65) + letter;
        column = (column - rest - 1) / 26;
    }
    return letter;
}

// A -> 1, AA -> 27
export function letterToColumn(letter) {
    let column = 0;
    for (const char of letter.toUpperCase()) {
        column = column * 26 + (char.charCodeAt(0) - 64);
    }
    return column;
}

// Deep copy of a template row (or rows). Templates only hold plain data,
// with cell types written as strings ("String", "Number", "Formula").
export const clone = (template) => JSON.parse(JSON.stringify(template));

// Builds a sheet row by row and tracks the 1-based Excel row number, so
// formulas can reference the row being added without global counters.
export class SheetBuilder {
    constructor() {
        this.rows = [];
    }

    // Excel number of the next row that will be added.
    get nextRow() {
        return this.rows.length + 1;
    }

    // Excel number of the last row added.
    get lastRow() {
        return this.rows.length;
    }

    push(...rows) {
        this.rows.push(...rows);
        return this.lastRow;
    }
}

// Number from a cell that may hold a number or a numeric string
// ("1 234,50" included). Returns `fallback` when it is not numeric.
export function numberOr(value, fallback) {
    if (typeof value === 'number') return Number.isFinite(value) ? value : fallback;
    if (typeof value !== 'string') return fallback;
    const parsed = parseFloat(value.replace(/[\s  ]/g, '').replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : fallback;
}
