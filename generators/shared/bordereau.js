// Reads a submitted bordereau workbook into { metadata, slips, summary }.
// Used by the DPM and TakeOff generators. Positions are 0-based, as
// node-xlsx returns them. If the bordereau template changes, edit LAYOUT.
import xlsx from 'node-xlsx';
import { UserError } from './errors.js';

export const LAYOUT = {
    password: 'bordereau',
    ignoredSheets: ['Démarrage', 'ModeleSommaire', 'ModeleBordereau', 'Soumissionnaire', 'Sommaire'],
    summarySheet: 'Sommaire',
    metadata: {
        sheetIndex: 0,
        district: [4, 0],
        municipality: [4, 3],
        projectTitle: [7, 3],
        projectNum: [4, 7],
        structureNum: [[8, 5], [8, 4]]
    },
    // Cell holding "DOCUMENT <number> - <title>" on every slip sheet.
    titleCell: [10, 0],
    firstDataRow: 12,
    article: { number: 0, code: 1, quantity: 2, unit: 3, description: 4, unitPrice: 7, total: 8 },
    summary: { index: 0, slipNumber: 1, title: 2, total: 8 },
    // Lump-sum rows show this instead of a quantity or a unit price.
    placeholder: '-------------'
};

// Long unit names shortened as in the output sheets (applied in order).
const UNIT_ABBREVIATIONS = [
    ['Global', 'G'],
    ['Mètre cube', 'm³'],
    ['Mètre carré', 'm²'],
    ['Mètre', 'm'],
    ['Kilogramme', 'Kg'],
    ['Gramme', 'g'],
    ['Tonne', 't'],
    ['Unité', 'un']
];

export function abbreviateUnit(unit) {
    let text = unit === undefined || unit === null ? '' : String(unit);
    for (const [long, short] of UNIT_ABBREVIATIONS) text = text.replace(long, short);
    return text;
}

const cellAt = (data, [row, col]) => data[row]?.[col];
const isSet = (value) => value !== undefined && value !== null;

// "DOCUMENT 201 - Organisation de chantier" -> { number: "201", title: "..." }
export function parseSlipTitle(text) {
    const match = /^DOCUMENT\s+(.+?)\s+-\s+(.*)$/s.exec(String(text ?? '').trim());
    return match ? { number: match[1], title: match[2] } : null;
}

export function readBordereau(buffer, layout = LAYOUT) {
    let sheets;
    try {
        sheets = xlsx.parse(buffer, { password: layout.password });
    } catch (err) {
        throw new UserError("Impossible de lire le fichier Excel. Vérifiez qu'il s'agit bien d'un bordereau .xlsx.", 'unreadable');
    }
    return parseBordereau(sheets, layout);
}

// `sheets` is the node-xlsx output: [{ name, data: rows[] }].
export function parseBordereau(sheets, layout = LAYOUT) {
    const meta = sheets[layout.metadata.sheetIndex]?.data ?? [];
    const metadata = {
        district: cellAt(meta, layout.metadata.district),
        municipality: cellAt(meta, layout.metadata.municipality) ?? '',
        projectTitle: cellAt(meta, layout.metadata.projectTitle) ?? '',
        projectNum: cellAt(meta, layout.metadata.projectNum),
        structureNum: layout.metadata.structureNum.map((pos) => cellAt(meta, pos)).find(Boolean)
    };
    if (!isSet(metadata.projectNum) || metadata.projectNum === '') {
        throw new UserError('Numéro de projet introuvable dans le fichier soumis.');
    }

    const summary = new Map();
    const slips = [];

    for (const sheet of sheets) {
        const heading = parseSlipTitle(cellAt(sheet.data, layout.titleCell));
        if (!heading) continue;

        if (sheet.name === layout.summarySheet) {
            readSummary(sheet.data, layout, summary);
            continue;
        }
        if (layout.ignoredSheets.includes(sheet.name)) continue;

        slips.push({ name: sheet.name, ...heading, rows: readRows(sheet.data, layout) });
    }

    return { metadata, slips, summary };
}

// Slip number -> total, from the summary sheet.
function readSummary(data, layout, summary) {
    const col = layout.summary;
    for (let r = layout.firstDataRow; r < data.length; r++) {
        const row = data[r] ?? [];
        if (![col.index, col.slipNumber, col.title, col.total].every((i) => row[i] !== undefined)) continue;
        summary.set(String(row[col.slipNumber]), row[col.total]);
    }
}

// Articles and section titles of one slip sheet, in order.
function readRows(data, layout) {
    const col = layout.article;
    const rows = [];
    for (let r = layout.firstDataRow; r < data.length; r++) {
        const row = data[r] ?? [];
        if (row.length === 0) continue;

        if (row[col.number] !== undefined && row[col.quantity] !== undefined && row[col.description] !== undefined) {
            // Header or signature rows carry text in the number column.
            if (Number.isNaN(Number(row[col.number]))) continue;
            rows.push({
                type: 'article',
                article: row[col.number],
                code: row[col.code],
                quantity: String(row[col.quantity]).replace(layout.placeholder, '1'),
                unit: abbreviateUnit(row[col.unit]),
                description: row[col.description],
                unitPrice: row[col.unitPrice] || '',
                total: row[col.total]
            });
        } else if (row[col.description] !== undefined) {
            rows.push({ type: 'section', description: row[col.description] });
        }
    }
    return rows;
}

// Slips that hold at least one row, in sheet order. Throws when none.
export function slipsWithRows(parsed) {
    const slips = parsed.slips.filter((slip) => slip.rows.length > 0);
    if (slips.length === 0) throw new UserError('Aucun article trouvé dans les bordereaux.');
    return slips;
}
