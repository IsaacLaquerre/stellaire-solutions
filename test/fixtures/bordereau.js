// Synthetic bordereau with the same layout as the real template (no client
// data). `bordereauSheets()` returns what node-xlsx.parse would return;
// `bordereauXlsx()` returns the same workbook as .xlsx bytes.
import xlsx from 'node-xlsx';

const P = '-------------';
// node-xlsx skips rows with no cell at all; this column keeps them.
const PAD_COLUMN = 30;

// Row from a sparse { column: value } map, with holes for empty cells.
function row(cells = {}) {
    const out = [];
    for (const [col, value] of Object.entries(cells)) out[Number(col)] = value;
    return out;
}

function sheet(rows, length = 34) {
    return Array.from({ length }, (_, i) => rows[i] ?? []);
}

function meta(rows) {
    return {
        4: row({ 0: 'Jean-Talon', 3: 'Lévis', 7: '1234-56-7890' }),
        7: row({ 3: 'Réfection du pont' }),
        8: row({ 4: '04296' }),
        ...rows
    };
}

const signature = (total) => ({
    19: row({ 0: 'Nom du soumissionnaire', 3: 'Adresse', 7: 'Date', 8: 'Montant total' }),
    20: row({ 0: 'Stellaire Construction inc.', 3: '100 rue Exemple, Québec', 7: 46079, 8: total })
});

export const FIXTURE_TOTALS = { '201': 278400, '230': 455150, contract: 733550 };

export function bordereauSheets() {
    const sommaire = sheet(meta({
        10: row({ 0: 'DOCUMENT 200 - SOMMAIRE DES BORDEREAUX' }),
        11: row({ 0: 'Bord.', 1: 'Document', 2: 'Description', 5: 'Date Devis', 7: 'Date révision (addenda)', 8: 'Total' }),
        12: row({ 0: 1, 1: '201', 2: 'Organisation de chantier', 5: 45996, 7: P, 8: FIXTURE_TOTALS['201'] }),
        13: row({ 0: 2, 1: '230', 2: 'Travaux - phase 1', 5: 45996, 7: P, 8: FIXTURE_TOTALS['230'] }),
        ...signature(FIXTURE_TOTALS.contract)
    }));

    const slip1 = sheet({
        0: row({ 14: 201 }),
        10: row({ 0: 'DOCUMENT 201 - Organisation de chantier' }),
        11: row({ 0: 'Art. bord.', 1: 'Code', 2: 'Quantité estimée', 3: 'Unité de mesure', 4: "Désignation de l'ouvrage", 7: 'Prix unitaire', 8: 'Total' }),
        12: row({ 0: 1, 1: '630000', 2: P, 3: 'Global', 4: 'Mobilisation, démobilisation et frais de chantier', 7: P, 8: 67400, 16: 'GLOBL', 17: 1 }),
        13: row({ 0: 2, 1: '630005', 2: P, 3: 'Global', 4: "Maintien de l'organisation de chantier", 7: P, 8: 211000, 16: 'GLOBL', 17: 2 }),
        14: row({ 7: P, 8: P }),
        ...signature(FIXTURE_TOTALS['201'])
    });

    const slip2 = sheet({
        0: row({ 14: 230 }),
        10: row({ 0: 'DOCUMENT 230 - Travaux - phase 1' }),
        11: row({ 0: 'Art. bord.', 1: 'Code', 2: 'Quantité estimée', 3: 'Unité de mesure', 4: "Désignation de l'ouvrage", 7: 'Prix unitaire', 8: 'Total' }),
        12: row({ 4: 'STRUCTURE', 7: P, 8: P }),
        13: row({ 0: 1, 1: '637020', 2: '2', 3: 'Unité', 4: "Ouvrage en acier; structure d'acier", 7: 120000, 8: 240000, 16: 'REGLR', 17: 1 }),
        14: row({ 0: 2, 1: '900055', 2: '165,5', 3: 'Mètre carré', 4: 'Ouvrage en acier; plancher', 7: 1300, 8: 215150, 16: 'REGLR', 17: 2 }),
        15: row({ 7: P, 8: P }),
        ...signature(FIXTURE_TOTALS['230'])
    });

    return [
        { name: 'Sommaire', data: sommaire },
        { name: 'Bordereau1', data: slip1 },
        { name: 'Bordereau2', data: slip2 },
        { name: 'Démarrage', data: [row({ 0: 'Démarrage' }), []] },
        { name: 'ModeleSommaire', data: sheet({ 10: row({ 0: 'DOCUMENT 200 - SOMMAIRE DES BORDEREAUX' }) }) },
        { name: 'ModeleBordereau', data: sheet({}) },
        { name: 'Soumissionnaire', data: sheet({ 0: row({ 0: 'Soumissionnaire' }) }, 7) }
    ];
}

export function bordereauXlsx() {
    const sheets = bordereauSheets().map(({ name, data }) => ({
        name,
        data: data.map((r) => (r.length === 0 ? row({ [PAD_COLUMN]: '.' }) : r))
    }));
    return xlsx.build(sheets);
}
