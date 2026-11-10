import { INPUT, UserError } from './config.js';

const filled = (row, indexes) => indexes.every((i) => row[i] !== undefined && row[i] !== null && row[i] !== '');
const cellAt = (data, [row, col]) => data[row]?.[col];

// Turns node-xlsx sheets ([{ name, data }]) into { metadata, slips }.
// Slips are indexed from 1 in sheet order; the summary sheet is not a slip.
export function parseWorkbook(sheets, layout = INPUT) {
    const metaSheet = sheets[layout.metadata.sheetIndex]?.data ?? [];
    const metadata = {
        projectNum: cellAt(metaSheet, layout.metadata.projectNum),
        projectTitle: cellAt(metaSheet, layout.metadata.projectTitle) ?? '',
        total: 0
    };
    if (metadata.projectNum === undefined || metadata.projectNum === '') {
        throw new UserError('Numéro de projet introuvable dans le fichier soumis');
    }

    const titles = new Map();
    const slips = [];

    for (const sheet of sheets) {
        if (layout.ignoredSheets.includes(sheet.name)) continue;
        if (sheet.data.length < layout.minRows) continue;

        if (sheet.name === layout.summarySheet) {
            parseSummary(sheet.data, layout, metadata, titles);
        } else {
            slips.push(parseSlip(sheet, layout));
        }
    }

    slips.forEach((slip, i) => {
        slip.index = i + 1;
        slip.title = titles.get(String(slip.number)) ?? '';
    });

    return { metadata, slips };
}

function parseSummary(data, layout, metadata, titles) {
    const col = layout.summary;
    for (let r = layout.firstDataRow; r < data.length; r++) {
        const row = data[r] ?? [];
        if (row[col.index] === col.totalRowLabel) metadata.total = row[col.total] ?? 0;
        if (filled(row, [col.index, col.slipNumber, col.title, col.date, col.quantity, col.total])) {
            titles.set(String(row[col.slipNumber]), row[col.title]);
        }
    }
}

function parseSlip(sheet, layout) {
    const col = layout.article;
    const required = [col.number, col.code, col.quantity, col.unit, col.description, col.unitPrice, col.totalPrice, ...col.extraRequired];
    const articles = [];

    for (let r = layout.firstDataRow; r < sheet.data.length; r++) {
        const row = sheet.data[r] ?? [];
        if (!filled(row, required)) continue;
        articles.push({
            number: row[col.number],
            code: row[col.code],
            quantity: row[col.quantity],
            unit: row[col.unit],
            description: row[col.description],
            unitPrice: row[col.unitPrice],
            totalPrice: row[col.totalPrice]
        });
    }

    return {
        name: sheet.name,
        number: cellAt(sheet.data, layout.slipNumberCell) ?? sheet.name,
        articles
    };
}
