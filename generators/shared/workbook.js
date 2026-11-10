// Writes a workbook with write-excel-file. Templates name cell types as
// strings ("String", "Number"); the library only accepts the constructors
// (and the string "Formula"), so they are converted here.
import writeXl from 'write-excel-file/node';
import { guardWrite } from './files.js';

const TYPES = { String, Number, Date, Boolean };

export function toWriterTypes(sheets) {
    for (const { data } of sheets) {
        for (const row of data) {
            for (const cell of row) {
                if (cell && typeof cell.type === 'string' && Object.hasOwn(TYPES, cell.type)) cell.type = TYPES[cell.type];
            }
        }
    }
    return sheets;
}

export const writeWorkbook = (sheets, filePath) =>
    guardWrite(filePath, () => writeXl(toWriterTypes(sheets)).toFile(filePath));
