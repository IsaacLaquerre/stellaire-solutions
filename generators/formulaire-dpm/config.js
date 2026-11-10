// Layout of the submitted slip workbook (0-based row/column indexes, as node-xlsx returns them).
export const INPUT = {
    password: 'bordereau',
    ignoredSheets: ['Démarrage', 'ModeleSommaire', 'ModeleBordereau', 'Soumissionnaire'],
    summarySheet: 'Sommaire',
    // Sheets with fewer rows than this hold no data.
    minRows: 9,
    // First row that can hold an article or a summary line.
    firstDataRow: 12,
    metadata: {
        sheetIndex: 0,
        projectNum: [4, 7],
        projectTitle: [7, 3]
    },
    slipNumberCell: [0, 14],
    article: {
        number: 0,
        code: 1,
        quantity: 2,
        unit: 3,
        description: 4,
        unitPrice: 7,
        totalPrice: 8,
        // Must also be filled for a row to count as an article.
        extraRequired: [16, 17]
    },
    summary: {
        index: 0,
        slipNumber: 1,
        title: 2,
        date: 5,
        quantity: 7,
        total: 8,
        // Label in column A of the row that holds the contract total.
        totalRowLabel: 'Stellaire Construction inc.'
    }
};

export const OUTPUT = {
    fileSuffix: 'Formulaire demande de paiement',
    sheets: {
        rapport: 'Rapport Comparatif',
        facture: 'Demande de paiement',
        v1371Prefix: 'V-1371_'
    },
    tps: 0.05,
    tvq: 0.09975,
    // Rapport Comparatif column summed per slip on the payment request.
    factureSumColumn: 'N'
};

export { UserError } from '../shared/errors.js';
