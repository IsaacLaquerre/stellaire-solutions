import { letterToColumn } from '../shared/excel.js';
import { UserError } from './config.js';

export { isoDate, safeFileName } from '../shared/files.js';

// 0-based array index of a column letter.
export const colIndex = (letter) => letterToColumn(letter) - 1;

// Sets the value of the cell at a column letter in a row of cell objects.
export function setCell(row, letter, value) {
    const cell = row[colIndex(letter)];
    if (!cell) throw new Error(`Aucune cellule de gabarit en colonne ${letter}`);
    cell.value = value;
    return cell;
}

// Excel serial number of a calendar date (1900 date system).
export function toExcelSerial(year, monthIndex, day) {
    const msPerDay = 24 * 60 * 60 * 1000;
    return Math.round((Date.UTC(year, monthIndex, day) - Date.UTC(1899, 11, 30)) / msPerDay);
}

export const pad = (value, length) => String(value).padStart(length, '0');

// Id written in Rapport Comparatif column A, e.g. "03-12".
export const slipId = (slip) => `${pad(slip.index, 2)}-${slip.number}`;

// Quotes a sheet name for use in a formula reference.
export const quoteSheet = (name) => `'${String(name).replace(/'/g, "''")}'`;

// Escapes text for use inside a formula string literal.
export const formulaText = (text) => String(text).replace(/"/g, '""');

// Excel sheet names: max 31 chars, none of []:*?/\
export const safeSheetName = (name) => String(name).replace(/[[\]:*?/\\]/g, '_').slice(0, 31);

// Lump-sum rows show dashes instead of a quantity or unit price.
export const isPlaceholder = (value) => typeof value === 'string' && /^-+$/.test(value.trim());

// Parses numbers from cells, including French formatting ("1 234,50").
export function toNumber(value, context = '') {
    if (typeof value === 'number' && Number.isFinite(value)) return value;
    if (typeof value === 'string') {
        const cleaned = value.replace(/[\s  $]/g, '').replace(',', '.');
        if (cleaned !== '' && Number.isFinite(Number(cleaned))) return Number(cleaned);
    }
    throw new UserError(`Valeur numérique invalide "${value}"${context ? ` (${context})` : ''}`);
}

export const roundCents = (value) => Math.round((value + Number.EPSILON) * 100) / 100;
