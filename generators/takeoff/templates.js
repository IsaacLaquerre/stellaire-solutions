// Layout data of the TakeOff workbook (cell styles, fixed labels, default
// overhead items). Pure data: the builder clones and fills these templates.
// Formulas in FRAIS_GENERAUX use ${row} for the row they are written on.

export const COLORS = {
    section: "#d8d8d8",
    slip: "#d8d8d8"
};
export const FRAIS_GENERAUX = {
    "1- Frais d'exécution et d'organisation :": [
        ["Permis de construction", "", "", "", "", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Bureau du surveillant", "", "", { value: 1000, format: "#,##0.00" }, "=ROUNDUP($C$5/4,0)", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Bureau du laboratoire", "", "", "", "", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Roulotte Stellaire", "", "", { value: 1000, format: "#,##0.00" }, "=ROUNDUP($C$5/4,0)", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Téléphone, télécopieur, cellulaire", "", "", { value: 900, format: "#,##0.00" }, "=ROUNDUP($C$5/4,0)", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Raccordement électrique", "", "", { value: 900, format: "#,##0.00" }, "2", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##.00" }, ""],
        ["Frais électrique Hydro Québec", "", "", { value: 400, format: "#,##0.00" }, "=ROUNDUP($C$5/4,0)", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Toilettes de chantier", "", "", { value: 300, format: "#,##0.00" }, "=ROUNDUP($C$5/4,0)", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Entrepôt de chantier", "", "", { value: 300, format: "#,##0.00" }, "=ROUNDUP($C$5/4,0)", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Maintien de l'aire d'entreposage", "", "", { value: 300, format: "#,##0.00" }, "=ROUNDUP($C$5/4,0)", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Essence, diesel, propane", "", "", { value: 1500, format: "#,##0.00" }, "=$C$5", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Transport (matériaux, équipement, outillage)", "", "", { value: "500", format: "#,##0.00" }, "=$C$5", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Réparation & achat d'outils", "", "", { value: 800, format: "#,##0.00" }, "=ROUNDUP($C$5/4,0)", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Relevé Video+camion de service", "", "", { value: 1600, format: "#,##0.00" }, "1", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Ouvrier d'entretien et service : ", "", "", "", "", "", "", ""],
        ["", { value: "1", format: '# "ouvrier(s) x"' }, { value: "=$C$5", format: '# "semaine(s) x"' }, { value: 10, format: '#"h x"' }, { value: "='Take Off'!$X$1", format: '#"$/h"', span: 2 }, null, { value: "=C${row}*D${row}*E${row}*F${row}", format: "#,##0.00" }, ""],
        ["", "", "", "", "", "", "", ""]
    ],
    "2- Frais administratifs :": [
        ["Assurance responsabilité civile", "", "", { value: 3500000, format: "#,##0.00" }, { value: 0.01, format: "##.0%", span: 2 }, null, { value: "=E${row}*F${row}", format: "#,##0.00" }, ""],
        ["Assurance véhicule", "", "", "", "", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Assurance spéciale", "", "", "", "", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Cautionnement (0,7% / année)", "", "", { value: 3500000, format: "#,##0.00" }, { value: "0.007", format: "##.0%", span: 2 }, null, { value: "=E${row}*F${row}", format: "#,##0.00" }, ""],
        ["Financement", "", "", { value: 4000, format: "#,##0.00" }, 1, "", "=E${row}*F${row}", ""],
        ["Risques, pénalités et pertes possibles", "", "", { value: 4000, format: "#,##0.00" }, 1, "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["", "", "", "", "", "", "", ""]
    ],
    "3- Frais d'entretien et de protection :": [
        ["Déneigement", "", "", "", "=ROUNDUP($C$5/4,0)", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Échafaudage d'accès et plateforme de passage (bord de culée si pente abrute)", "", "", { value: 1500, format: "#,##0.00" }, "2", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Nettoyage du chantier", "", "", { value: 800, format: "#,##0.00" }, "=ROUNDUP($C$5/4,0)", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Garde-fou temporaire, clôture de chantier", "", "", { value: 500, format: "#,##0.00" }, "=ROUNDUP($C$5/4,0)", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Équiq. de prot. spéc. (ex: zodiac, bouées...)", "", "", { value: 200, format: "#,##0.00" }, "6", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["", "", "", "", "", "", "", ""]
    ],
    "4- Frais de main d'œuvre :": [
        ["Transport des ouvriers", "", "", { value: 280, format: "#,##0.00" }, "=$C$5", 2, { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Pension", "", "", { value: 880, format: "#,##0.00" }, "=$C$5", 3, { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Salaire de contremaître", "", "", { value: 4200, format: "#,##0.00" }, "=$C$5", 1, { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Gérant de projet", "", "", { value: 3000, format: "#,##0.00" }, "=$C$5 + 2", 0.5, { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Ingénieur", "", "", { value: 2000, format: "#,##0.00" }, "=ROUNDUP($C$5/4,0)", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Adjoint(e) (soutient bureau)", "", "", "", "=$C$5", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Surintendant", "", "", "", "", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Responsable sign.", "", "", "", "=$C$5", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Gardien de nuit, techn.", "", "", "", 12, "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Temps supplémentaire des ouvriers", "", { value: 10, format: '# "x"' }, { value: 65, format: '#"$/h x"'}, "=$C$5", "1", { value: "=D${row}*E${row}*F${row}*G${row}", format: "#,##0.00" }, ""],
        ["Org. et pertes de temps (projet 1 M$ et +)", "", "", "", "", "", "", ""],
        ["", { value: "=OFFSET(G${row},-10,0) + OFFSET(G${row},-9,0)", format: '# "ouvrier(s) x"'}, { value: "=OFFSET(F${row},-10,0)", format: '# "semaines(s) x 5 jour(s)"'}, { value: "='Take Off'!$X$1", format: '#"$/h"'}, "(f)", 0.25, { value: "=C${row}*D${row}*5*E${row}*G${row}", format: "#,##0.00" }, ""],
        ["Heures", "", "", "Inclu pension", "", "", "", ""]
    ],
    "5- Frais de services :": [
        ["Honoraires professionnels", "", "", { value: 1000, format: "#,##0.00" }, "6", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Laboratoire", "", "", { value: 4000, format: "#,##0.00" }, "1", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Arpenteur", "", "", { value: 1500, format: "#,##0.00" }, "=ROUNDUP($C$5/4,0)", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Photos & enseignes", "", "", { value: 1000, format: "#,##0.00" }, "1", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Location du terrain pour mob. + droit d'accès", "", "", { value: 1000, format: "#,##0.00" }, "=ROUNDUP($C$5/4,0)", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Papetrie, plan, etc.", "", "", { value: 200, format: "#,##0.00" }, "=ROUNDUP($C$5/4,0)", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["", "", "", "", "", "", "", ""]
    ],
    "6- Location d'équipement :": [
        ["Génératrice", "", "", { value: 500, format: "#,##0.00" }, 1, "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Compresseur", "", "", { value: 750, format: "#,##0.00" }, 2, "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Skytrack", "", "", { value: 3800, format: "#,##0.00" }, 1, "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Machinerie", "", "", { value: 1000, format: "#,##0.00" }, 2, "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Tower light", "", "", { value: 700, format: "#,##0.00" }, 2, "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["", "", "", "", "", "", "", ""]
    ],
    "7- Formation main d'œuvre": [
        ["Formation", "", "", "", "", "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["", "", "", "", "", "", "", ""]
    ],
    "8- Santé sécurité :": [
        ["Programme de prévention", "", "", { value: 250, format: "#,##0.00" }, 2, "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Mesures de sécurité", "", "", { value: 500, format: "#,##0.00" }, 2, "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Plan de sécurité", "", "", { value: 10000, format: "#,##0.00" }, 1, "", { value: "=IF(G${row}>0.001,E${row}*F${row}*G${row},E${row}*F${row})", format: "#,##0.00" }, ""],
        ["Radio de chantier + gestion du bruit", "", "", "", "", "", { value: 2000, format: "#,##0.00" }, ""],
        ["", "", "", "", "", "", "", ""]
    ],
    "9- Autres :": [
        ["Retenues possibles", "", "", "", "", "", "", ""],
        ["Budget pour plateforme de bois flottante (Préparation, transporrts, mise en place et entretien)", "", "", "", "", "", { value: 5000, format: "#,##0.00" }, ""],
        ["RSS", "", { value: "=$C$5", format: '# "semaine(s) x 5 jour(s) x"' }, { value: 0.5, format: '0#.0 "x"' }, "='Take Off'!$X$1", "", { value: "=D${row}*E${row}*F${row}*5", format: "#,##0.00" }, ""],
        ["", "", "", "", "", "", "", ""]
    ]
};
export const FORMATS = {
    accounting: '_ * #,##0.00_) $_ ;_ * (#,##0.00) $_ ;_ * "-"??_) $_ ;_ @_ ',
    accountingColored: '[Color50]_ * #,##0.00_) $_ ;[Red]_ * (#,##0.00) $_ ;_ * "-"??_) $_ ;_ @_ '
}
export const ROWS = {
    takeOff: {
        header: [
            [
                { type: "String", value: "", height: 26.25 },
                null,
                null,
                null,
                null,
                null,
                { type: "String", value: "PROJET:", span: 2, fontSize: 10, fontWeight: "bold", fontFamily: "Arial", align: "center", alignVertical: "bottom" },
                null,
                { type: "String", value: "", span: 8, rowSpan: 3, fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "center", wrap: true },
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                { type: "String", value: "CLIENT:", fontSize: 10, fontWeight: "bold", fontFamily: "Arial", align: "center", alignVertical: "bottom" },
                { type: "String", value: "MTQ", span: 4, fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                null,
                null,
                null,
                { type: "String", value: "cout unit. main d'oeuvre:", fontSize: 10, fontFamily: "Arial", align: "left", alignVertical: "bottom" },
                null,
                { type: "Number", format: "#,##0.00", value: 87, fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", leftBorderColor: "#000000", leftBorderStyle: "thin" }
            ],
            [ { type: "String", value: "", height: 12.75 } ],
            [
                { type: "String", value: "", height: 12.75 },
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                { type: "String", value: "DATE:", fontSize: 10, fontWeight: "bold", fontFamily: "Arial", align: "center", alignVertical: "bottom" },
                { type: "String", value: "", span: 2, fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "top", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                null,
                { type: "String", value: "page:", fontSize: 10, fontWeight: "bold", fontFamily: "Arial", align: "right", alignVertical: "bottom" },
                { type: "String", value: "DE", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "thin" }
            ],
            [
                { type: "String", value: "", height: 12.75 },
                null,
                null,
                null,
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "ESTIMATION", fontSize: 10, fontWeight: "bold", fontFamily: "Arial", align: "right", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
            ],
            [
                { type: "String", value: "", height: 14.25 },
                null,
                null,
                null,
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", leftBorderColor: "#000000", leftBorderStyle: "thin" },
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin" },
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin" },
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "double" },
                { type: "String", value: "MATÉRIAUX", fontSize: 9, align: "center", alignVertical: "bottom", wrap: true, span: 2, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                null,
                { type: "String", value: "MAIN D'ŒUVRE", fontSize: 9, align: "center", alignVertical: "bottom", wrap: true, span: 3, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                null,
                null,
                { type: "String", value: "SOUS-TRAITANCE", fontSize: 9, align: "center", alignVertical: "bottom", wrap: true, span: 2, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                null,
                { type: "String", value: "TRANSPORT", fontSize: 9, align: "center", alignVertical: "bottom", wrap: true, span: 2, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                null,
                { type: "String", value: "ÉQUIPEMENT", fontSize: 9, align: "center", alignVertical: "bottom", wrap: true, span: 2, rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                null,
                { type: "String", value: "COÛT TOTAL", fontSize: 9, align: "center", alignVertical: "bottom", wrap: true, span: 2, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                null
            ],
            [
                { type: "String", value: "", height: 14.25 },
                null,
                null,
                null,
                { type: "String", value: "No. Art.", fontSize: 10, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", leftBorderColor: "#000000", leftBorderStyle: "thin" },
                { type: "String", value: "DESCRIPTION", fontSize: 10, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin" },
                { type: "String", value: "QUANTITÉ", fontSize: 10, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin" },
                { type: "String", value: "un.", fontSize: 9, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "double" },
                { type: "String", value: "COÛT", fontSize: 6, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin" },
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin" },
                { type: "String", value: "REND.", fontSize: 6, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin" },
                { type: "String", value: "COÛT", fontSize: 6, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin" },
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin" },
                { type: "String", value: "COÛT", fontSize: 6, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin" },
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin" },
                { type: "String", value: "COÛT", fontSize: 6, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin" },
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin" },
                { type: "String", value: "COÛT", fontSize: 6, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin" },
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "double" },
                { type: "String", value: "COÛT", fontSize: 8, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin" },
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin" },
            ],
            [
                { type: "String", value: "", height: 12.75 },
                null,
                null,
                null,
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double", leftBorderColor: "#000000", leftBorderStyle: "thin" },
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "UNIT.", fontSize: 6, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "TOTAL", fontSize: 9, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "H/H", fontSize: 6, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "UNIT.", fontSize: 6, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "TOTAL", fontSize: 9, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "UNIT.", fontSize: 6, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "TOTAL", fontSize: 9, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "UNIT.", fontSize: 6, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "TOTAL", fontSize: 9, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "UNIT.", fontSize: 6, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "TOTAL", fontSize: 9, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "UNIT.", fontSize: 8, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "TOTAL", fontSize: 9, align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double" }
            ]
        ],
        slip: [
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", height: 18 },
            { type: "Formula", value: "=0", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Calibri", alignVertical: "bottom" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", leftBorderColor: "#000000", leftBorderStyle: "thin" },
            { type: "String", value: "DOCUMENT ", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 2 },
            null,
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "right", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" }
        ],
        section: [
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", height: 18 },
            { type: "Formula", value: "=0", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom" },
            { type: "Formula", format: "#,##0.00", value: "=0", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Calibri", alignVertical: "bottom" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", leftBorderColor: "#000000", leftBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", backgroundColor: COLORS.slip, align: "left", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 2 },
            null,
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "right", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" }
        ],
        article: [
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", height: 18 },
            { type: "Formula", value: "=0", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom" },
            { type: "Formula", format: "#,##0.00", value: "=0", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Calibri", alignVertical: "bottom" },
            { type: "Number", value: 0, fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", leftBorderColor: "#000000", leftBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "left", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", format: "#,##0.00", value: "=0", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 2 },
            null,
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "right", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", format: "#,##0.00", value: "=0", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", format: "#,##0.00", value: "=0", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", format: "#,##0.00", value: "=0", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", backgroundColor: COLORS.slip, rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", format: "#,##0.00", value: "=0", fontSize: 10, fontFamily: "Arial" }
        ],
        empty: [
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", height: 18 },
            { type: "Formula", value: "=0", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom" },
            { type: "Formula", format: "#,##0.00", value: "=0", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Calibri", alignVertical: "bottom" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", leftBorderColor: "#000000", leftBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", format: "#,##0.00", value: "=0", fontSize: 10, fontFamily: "Arial", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", format: "#,##0.00", value: "=$X$1", fontSize: 10, fontFamily: "Arial", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", format: "#,##0.00", value: "=0", fontSize: 10, fontFamily: "Arial", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", format: "#,##0.00", value: "=0", fontSize: 10, fontFamily: "Arial", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", format: "#,##0.00", value: "=0", fontSize: 10, fontFamily: "Arial", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 10, fontFamily: "Arial", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", format: "#,##0.00", value: "=0", fontSize: 10, fontFamily: "Arial", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", format: "#,##0.00", value: "=0", fontSize: 10, fontFamily: "Arial", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", format: "#,##0.00", value: "=0", fontSize: 10, fontFamily: "Arial", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
        ],
        footer: [
            [
                { type: "String", value: "", height: 21.75 },
                null,
                null,
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin" },
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "double", rightBorderColor: "#000000", rightBorderStyle: "thin" },
                { type: "String", value: "SOUS-TOTAL", fontSize: 10, fontFamily: "Arial", align: "left", alignVertical: "bottom", topBorderColor: "#000000", topBorderStyle: "double" },
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "double", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "Formula", value: "=0", format: "#,##0.00 $", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: "#FFFF00", topBorderColor: "#000000", topBorderStyle: "double", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 2 },
                null,
                { type: "Formula", value: "=0", format: "#,##0.00 $", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: "#FFFF00", topBorderColor: "#000000", topBorderStyle: "double", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 2 },
                null,
                { type: "Formula", value: "=0", format: "#,##0.00 $", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: "#FFFF00", topBorderColor: "#000000", topBorderStyle: "double", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "Formula", value: "=0", format: "#,##0.00 $", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: "#FFFF00", topBorderColor: "#000000", topBorderStyle: "double", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 2 },
                null,
                { type: "Formula", value: "=0", format: "#,##0.00 $", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: "#FFFF00", topBorderColor: "#000000", topBorderStyle: "double", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 2 },
                null,
                { type: "Formula", value: "=0", format: "#,##0.00 $", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", backgroundColor: "#FFFF00", topBorderColor: "#000000", topBorderStyle: "double", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 2 },
                null,
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "Formula", value: "=0", format: "#,##0.00 $", fontSize: 10, fontFamily: "Arial", align: "right", alignVertical: "bottom", topBorderColor: "#000000", topBorderStyle: "double", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" }
            ],
            [
                { type: "String", value: "", height: 21.75 },
                null,
                null,
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin" },
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "CORRECTIONS", fontSize: 10, fontFamily: "Arial", align: "left", alignVertical: "bottom", topBorderColor: "#000000", topBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double", span: 2 },
                null,
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double", span: 3 },
                null,
                null,
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double", span: 2 },
                null,
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double", span: 2 },
                null,
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "double", span: 2 },
                null,
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double" },
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "double" }
            ]
        ]
    },
    fraisGeneraux: {
        header: [
            [
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", height: 21.75 },
                { type: "String", value: "PROJET :", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "bottom" },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "center", span: 6, rowSpan: 2, wrap: true, bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                null,
                null,
                null,
                null,
                null
            ],
            [
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", height: 21.75 },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "left", alignVertical: "bottom" },
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", height: 21.75 },
                { type: "String", value: "CLIENT :", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "bottom" },
                { type: "String", value: "MTQ", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", span: 6, wrap: true, bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                null,
                null,
                null,
                null,
                null
            ],
            [
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", height: 21.75 },
                { type: "String", value: "DÉLAI :", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "bottom" },
                { type: "Number", value: 0, format: '"long :" # "semaine(s)"', fontSize: 10, fontFamily: "Arial", align: "right", alignVertical: "bottom", span: 2, wrap: true, bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                null,
                { type: "Number", value: 0, format: '"court :" # "semaine(s)"', fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", span: 4, wrap: true, bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                null,
                null,
                null
            ],
            [
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", height: 21.75 },
                { type: "String", value: "RÉEL :", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "bottom" },
                { type: "Number", value: 0, format: '# "semaine(s)"', fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", span: 6, wrap: true, bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                null,
                null,
                null,
                null,
                null
            ],
            [
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", height: 7.5 }
            ],
            [
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", height: 17.25 },
                { type: "String", value: "FRAIS INDIRECTS SPÉCIFIQUES AU CHANTIER", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "center", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "TOTAL", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "center", alignVertical: "center", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "RÉVISION", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "center", alignVertical: "center", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "thin" }
            ]
        ],
        footer: [
            [
                { type: "String", value: "", height: 18 },
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "hair", bottomBorderColor: "#000000", bottomBorderStyle: "hair", leftBorderColor: "#000000", leftBorderStyle: "hair" },
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "hair", bottomBorderColor: "#000000", bottomBorderStyle: "hair" },
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "hair", bottomBorderColor: "#000000", bottomBorderStyle: "hair" },
                { type: "String", value: "TOTAL :", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "bottom", topBorderColor: "#000000", topBorderStyle: "hair", bottomBorderColor: "#000000", bottomBorderStyle: "hair" },
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "hair", bottomBorderColor: "#000000", bottomBorderStyle: "hair" },
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "hair", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "hair" },
                { type: "Formula", value: "=0", format: "#,##0.00", fontSize: 10, fontFamily: "Arial", align: "right", alignVertical: "bottom", topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "Formula", value: "=0", format: "#,##0.00", fontSize: 10, fontFamily: "Arial", align: "right", alignVertical: "bottom", topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "Formula", value: "=0", format: "#,##0.00", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 3 },
                null,
                null
            ],
            [
                { type: "String", value: "", height: 6.75 },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "thin" }
            ],
            [
                { type: "String", value: "", height: 14.25 },
                { type: "String", value: "RÉSUMÉ", fontSize: 10, fontFamily: "Arial", align: "left", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", leftBorderColor: "#000000", leftBorderStyle: "thin" },
                { type: "String", value: "MATÉRIAUX", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "MAIN D'ŒUVRE", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "SOUS-TRAITANT", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 2 },
                null,
                { type: "String", value: "TRANSPORT", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 2 },
                null,
                { type: "String", value: "ÉQUIPEMENT", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" }
            ],
            [
                { type: "String", value: "", height: 18 },
                { type: "String", value: "TOTAUX", fontSize: 10, fontFamily: "Arial", align: "left", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", leftBorderColor: "#000000", leftBorderStyle: "thin" },
                { type: "Formula", value: "=0", format: "#,##0.00", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "Formula", value: "=0", format: "#,##0.00", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "Formula", value: "=0", format: "#,##0.00", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 2 },
                null,
                { type: "Formula", value: "=0", format: "#,##0.00", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 2 },
                null,
                { type: "Formula", value: "=0", format: "#,##0.00", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "Formula", value: "=0", format: "#,##0.00", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 3 },
                null,
                null
            ],
            [
                { type: "String", value: "", height: 18 },
                { type: "String", value: "RÉVISION", fontSize: 10, fontFamily: "Arial", align: "left", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", leftBorderColor: "#000000", leftBorderStyle: "thin" },
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 2 },
                null,
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 2 },
                null,
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "Number", value: -50000, format: "#,##0.00", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 3 },
                null,
                null
            ],
            [
                { type: "String", value: "", height: 6.75 }
            ],
            [
                { type: "String", value: "", height: 18 },
                { type: "String", value: "Déterminer les risques, opportunités et la vision du projet avec ces méthodes:", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "bottom" },
                null,
                null,
                null,
                null,
                null,
                null,
                { type: "String", value: "SOUS-TOTAL :", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "right", alignVertical: "bottom" },
                { type: "Formula", value: "=0", format: "#,##0.00", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", leftBorderColor: "#000000", leftBorderStyle: "thin", span: 3 },
                null,
                null
            ],
            [
                { type: "String", value: "", height: 18 },
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", leftBorderColor: "#000000", leftBorderStyle: "thin",span: 3 },
                null,
                null
            ],
            [
                { type: "String", value: "", height: 18 },
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                { type: "Formula", value: "=0", format: "#,##0.00", fontSize: 10, fontFamily: "Arial", align: "right", alignVertical: "bottom", topBorderColor: "#000000", topBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", leftBorderColor: "#000000", leftBorderStyle: "thin" },
                { type: "String", value: "SOUS-TOTAL  1 :",  fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "right", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "thin" }
            ],
            [
                { type: "String", value: "", height: 18 },
                { type: "String", value: "RISQUES :", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 2 },
                null,
                { type: "String", value: "ADM. & PROFITS :", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "right", alignVertical: "bottom", span: 3 }, 
                null,
                null,
                { type: "Number", value: 0.1, format: "#.0%", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "center", alignVertical: "bottom" },
                { type: "Formula", value: "=0", format: "#,##0.00", fontSize: 10, fontFamily: "Arial", align: "center", alignVertical: "bottom", topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", leftBorderColor: "#000000", leftBorderStyle: "thin",span: 3 },
                null,
                null,
                { type: "Formula", value: "=0", format: "#,##0.00", fontSize: 10, fontFamily: "Arial", topBorderColor: "#000000", topBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", leftBorderColor: "#000000", leftBorderStyle: "thin" },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", topBorderColor: "#000000", topBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" }
            ],
            [
                { type: "String", value: "", height: 18 },
                { type: "String", value: "OPPORTUNITÉS :", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 2 },
                null,
                { type: "String", value: "FRAIS D'ENTREPRISE MIN. 11,5 %", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "center", alignVertical: "bottom", span: 4 }, 
                null,
                null,
                null,
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "right", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", leftBorderColor: "#000000", leftBorderStyle: "thin", span: 3 }, 
                null,
                null,
            ],
            [
                { type: "String", value: "", height: 18 },
                { type: "String", value: "COMMENTAIRES :", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 2 },
                null,
                { type: "String", value: "CRÉDIT OU SUPPLÉMENT :", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "right", alignVertical: "bottom", span: 4 }, 
                null,
                null,
                null,
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "right", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", leftBorderColor: "#000000", leftBorderStyle: "thin", span: 3 }, 
                null,
                null,
            ],
            [
                { type: "String", value: "", height: 18 },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 4 },
                null,
                null,
                null,
                null,
                null,
                null,
                { type: "String", value: "TOTAL SOUMISSION :", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "right", alignVertical: "bottom" },
                { type: "Formula", value: "=0", format: "#,##0.00", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "right", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin", leftBorderColor: "#000000", leftBorderStyle: "thin", span: 3 }, 
                null,
                null,
            ],
            [
                { type: "String", value: "", height: 18 }
            ],
            [
                { type: "String", value: "", height: 18 },
                { type: "String", value: "Utiliser verso pour plus de détails", fontSize: 10, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "bottom" }
            ],
            [
                { type: "String", value: "", height: 18 }
            ],
            [
                { type: "String", value: "", height: 20.25 }
            ],
            [
                { type: "String", value: "", height: 15.75 }
            ],
            [
                { type: "String", value: "", height: 15.75 },
                { type: "String", value: "Déterminer les risques, opportunités et la vision du projet avec ces méthodes:", fontSize: 11, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "bottom" }
            ],
            [
                { type: "String", value: "", height: 18 }
            ],
            [
                { type: "String", value: "", height: 22.5 },
                { type: "String", value: "Risques:", fontSize: 10, fontFamily: "Arial", align: "left", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "left", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 6 },
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                { type: "String", value: "", height: 22.5 },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "left", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 7 },
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                { type: "String", value: "", height: 22.5 },
                { type: "String", value: "Opportunités:", fontSize: 10, fontFamily: "Arial", align: "left", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "left", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 6 },
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                { type: "String", value: "", height: 22.5 },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "left", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 11 },
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            [
                { type: "String", value: "", height: 22.5 },
                { type: "String", value: "", fontSize: 10, fontFamily: "Arial", align: "left", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "thin", span: 11 },
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ]
        ]
    },
    bordereauBalance: {
        header: [
            [
                { type: "String", value: "", height: 12.75 },
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                { type: "String", value: "% requis pour frais d'organisation et profit", fontSize: 12, fontFamily: "Arial", align: "left", alignVertical: "bottom" },
                null,
                { type: "Number", value: 1.45, fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "bottom"}
            ],
            [
                { type: "String", value: "", height: 12.75 },
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                { type: "String", value: "Total Cost+Frais gen (réel)", fontSize: 12, fontFamily: "Arial", align: "left", alignVertical: "bottom" },
                { type: "Formula", value: "=0", format: "#,##0.00 $", fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "bottom"}
            ],
            [
                { type: "String", value: "", height: 12.75 },
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                { type: "String", value: "Total ave % requis", fontSize: 12, fontFamily: "Arial", align: "left", alignVertical: "bottom" },
                { type: "Formula", value: "=0", format: "#,##0.00 $", fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "bottom"}
            ],
            [
                { type: "String", value: "", height: 12.75 }
            ],
            [
                { type: "String", value: "", height: 23.25 },
                null,
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "Cost", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "center", bottomBorderColor: "#000000", bottomBorderStyle: "medium" },
                { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "medium" },
                { type: "String", value: "Cost + Profit + Admin", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "center", bottomBorderColor: "#000000", bottomBorderStyle: "medium" },
                { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "medium", bottomBorderColor: "#000000", bottomBorderStyle: "medium" },
                { type: "String", value: "Balancé", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "center", topBorderColor: "#000000", topBorderStyle: "medium", bottomBorderColor: "#000000", bottomBorderStyle: "medium" },
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "medium", bottomBorderColor: "#000000", bottomBorderStyle: "medium" },
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "medium", bottomBorderColor: "#000000", bottomBorderStyle: "medium" },
                { type: "String", value: "", topBorderColor: "#000000", topBorderStyle: "medium", rightBorderColor: "#000000", rightBorderStyle: "medium", bottomBorderColor: "#000000", bottomBorderStyle: "medium" }
            ],
            [
                { type: "String", value: "Bord", fontSize: 12, fontFamily: "Arial", align: "left", alignVertical: "bottom", height: 31.5 },
                { type: "String", value: "Art", fontSize: 12, fontFamily: "Arial", align: "left", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin" },
                { type: "String", value: "Bord.", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "center", alignVertical: "center", wrap: true, topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "Art. bord.", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "center", alignVertical: "center", wrap: true, topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "Code", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "center", alignVertical: "center", wrap: true, topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "Quantité estimée", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "center", alignVertical: "center", wrap: true, topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "Unité de mesure", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "center", alignVertical: "center", wrap: true, topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "Désignation de l'ouvrage", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "center", wrap: true, topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "medium", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "Prix unitaire", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "center", wrap: true, topBorderColor: "#000000", topBorderStyle: "medium", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "Total", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "center", wrap: true, topBorderColor: "#000000", topBorderStyle: "medium", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "Prix unitaire", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "center", wrap: true, topBorderColor: "#000000", topBorderStyle: "medium", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "Total", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "center", wrap: true, topBorderColor: "#000000", topBorderStyle: "medium", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "Prix unitaire", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "center", wrap: true, topBorderColor: "#000000", topBorderStyle: "medium", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "Total", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "center", wrap: true, topBorderColor: "#000000", topBorderStyle: "medium", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "Diff avec Cost+Prof", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "center", wrap: true, topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "medium", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
                { type: "String", value: "Diff avec Cost", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "center", wrap: true, topBorderColor: "#000000", topBorderStyle: "thin", rightBorderColor: "#000000", rightBorderStyle: "medium", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            ]
        ],
        slip: [
            { type: "String", value: "", height: 23.25 },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin" },
            { type: "String", value: "DOCUMENT ", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "center", rightBorderColor: "#000000", rightBorderStyle: "medium", bottomBorderColor: "#000000", bottomBorderStyle: "thin", leftBorderColor: "#000000", leftBorderStyle: "thin", span: 6 },
            null,
            null,
            null,
            null,
            null,
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "medium", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "medium", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
        ],
        section: [
            { type: "String", value: "", height: 23.25 },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "TABLIER", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "left", alignVertical: "center", wrap: true, rightBorderColor: "#000000", rightBorderStyle: "medium", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "medium", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "medium", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
        ],
        article: [
            { type: "Formula", value: "=0", fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "bottom", height: 23.25 },
            { type: "Formula", value: "=0", fontSize: 12, fontFamily: "Arial", align: "left", alignVertical: "bottom", rightBorderColor: "#000000", rightBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 12, fontFamily: "Arial", align: "center", alignVertical: "center", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Number", value: 0, format: "000", fontSize: 12, fontFamily: "Arial", align: "center", alignVertical: "center", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 12, fontFamily: "Arial", align: "center", alignVertical: "center", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 12, fontFamily: "Arial", align: "center", alignVertical: "center", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 12, fontFamily: "Arial", align: "center", alignVertical: "center", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "String", value: "", fontSize: 12, fontFamily: "Arial", align: "left", alignVertical: "center", rightBorderColor: "#000000", rightBorderStyle: "medium", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", value: "=0", format: FORMATS.accounting, fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "center", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", value: "=0", format: FORMATS.accounting, fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "center", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", value: "=0", format: FORMATS.accounting, fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "center", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", value: "=0", format: FORMATS.accounting, fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "center", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Number", value: 0, format: "### ### ##0.00##_);[Red] -### ### ##0.00##", fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "center", rightBorderColor: "#000000", rightBorderStyle: "thin", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", value: "=0", format: "### ### ##0.00##_);[Red] -### ### ##0.00##", fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "center", rightBorderColor: "#000000", rightBorderStyle: "double", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", value: "=0", format: FORMATS.accountingColored, fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "right", alignVertical: "center", rightBorderColor: "#000000", rightBorderStyle: "medium", bottomBorderColor: "#000000", bottomBorderStyle: "thin" },
            { type: "Formula", value: "=0", format: FORMATS.accountingColored, fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "right", alignVertical: "center", rightBorderColor: "#000000", rightBorderStyle: "medium", bottomBorderColor: "#000000", bottomBorderStyle: "thin" }
        ],
        footer: [
            [
                { type: "String", value: "", height: 23.25 }
            ],
            [
                { type: "String", value: "", height: 23.25 },
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                { type: "Formula", value: "=0", format: FORMATS.accounting, fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "bottom" },
                { type: "String", value: "Total", fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "bottom" },
                { type: "Formula", value: "=0", format: FORMATS.accounting, fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "bottom" },
                { type: "String", value: "Total", fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "bottom" },
                { type: "Formula", value: "=0", format: FORMATS.accounting, fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "bottom" },
            ],
            [
                { type: "String", value: "", height: 23.25 },
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                { type: "String", value: "Adm & Proft Reel", fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "bottom" },
                { type: "Formula", value: "=0", format: "[Red]#.0%", fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "bottom" },
            ],
            [
                { type: "String", value: "", height: 23.25 }
            ],
            [
                { type: "String", value: "", height: 23.25 }
            ],
            [
                { type: "String", value: "", height: 23.25 },
                null,
                null,
                null,
                null,
                null,
                null,
                { type: "String", value: "Org Chantier", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "right", alignVertical: "center" },
                null,
                { type: "Formula", value: "=0", format: FORMATS.accounting, fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "center" }
            ],
            [
                { type: "String", value: "", height: 23.25 },
                null,
                null,
                null,
                null,
                null,
                null,
                { type: "String", value: "Profit", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "right", alignVertical: "center" },
                { type: "Formula", value: "=0", format: "#,0%", fontSize: 12, fontFamily: "Arial", fontWeight: "bold", align: "right", alignVertical: "center" },
                { type: "Formula", value: "=0", format: FORMATS.accounting, fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "center" }
            ],
            [
                { type: "String", value: "", height: 23.25 },
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                { type: "Formula", value: "=0", format: FORMATS.accounting, fontSize: 12, fontFamily: "Arial", align: "right", alignVertical: "center" }
            ]
        ]
    }
};

// Closing row of each slip in "Bordereau Balancé".
const balanceBorder = (right) => ({ type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: right, bottomBorderColor: "#000000", bottomBorderStyle: "thin" });
export const BALANCE_SLIP_END = [
    { type: "String", value: "", height: 23.25 },
    { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "thin" },
    ...["thin", "thin", "thin", "thin", "thin", "medium", "thin", "double", "thin", "double", "thin", "double", "medium", "medium"].map(balanceBorder)
];

// Section title row of "Frais généraux".
export function fraisSectionRow(title) {
    const hairBottom = { type: "String", value: "", bottomBorderColor: "#000000", bottomBorderStyle: "hair" };
    return [
        { type: "String", value: "", height: title === "" ? 14.75 : 20.25 },
        { type: "String", value: title, fontSize: 10, fontFamily: "Arial", fontWeight: "bold", alignVertical: "bottom", bottomBorderColor: "#000000", bottomBorderStyle: "hair", leftBorderColor: "#000000", leftBorderStyle: "hair" },
        ...Array.from({ length: 6 }, () => ({ ...hairBottom })),
        { type: "String", value: "", rightBorderColor: "#000000", rightBorderStyle: "hair", bottomBorderColor: "#000000", bottomBorderStyle: "hair" }
    ];
}

// Rotated side notes of "Frais généraux", appended to the row with this
// Excel row number (the item list has a fixed length, so rows are fixed).
export const FRAIS_SIDE_NOTES = {
    9: [
        null,
        { type: "String", value: "ESTIMATION", fontSize: 24, fontFamily: "Arial", fontWeight: "bold", align: "center", alignVertical: "top", textRotation: -90, rowSpan: 16 }
    ],
    27: [
        null,
        null,
        { type: "String", value: "où  f  :", fontSize: 8, fontFamily: "Arial", align: "right", alignVertical: "bottom", textRotation: -90, rowSpan: 2 }
    ],
    29: [
        { type: "String", value: "L = 180 à 250 m :                  L = 250 m et + : ", fontSize: 8, fontFamily: "Arial", align: "right", alignVertical: "bottom", textRotation: -90, span: 2, rowSpan: 6, wrap: true },
        null,
        { type: "String", value: " L = 60 à 100 m :                       L = 100 à 180 m :", fontSize: 8, fontFamily: "Arial", align: "right", alignVertical: "bottom", textRotation: -90, rowSpan: 6, wrap: true }
    ],
    35: [
        { type: "String", value: "f = 1.25 h / j / ouv.                     f = 1.5 h / j / ouv.", fontSize: 8, fontFamily: "Arial", align: "right", alignVertical: "top", textRotation: -90, span: 2, rowSpan: 5, wrap: true },
        null,
        { type: "String", value: "f = 0.5 h / j / ouv.                                                                                                           f = 1.0 h / j / ouv.  (travaux maritimes, nuit)", fontSize: 8, fontFamily: "Arial", align: "right", alignVertical: "top", textRotation: -90, rowSpan: 11, wrap: true }
    ]
};

export const COLUMN_WIDTHS = {
    takeOff: [2, 4, 9, 4, 6, 115, 10, 15, 12, 13, 8, 6, 13, 11, 11, 9, 9, 8, 9, 15, 16, 10, 12, 6],
    fraisGeneraux: [15.25, 10.25, 12.25, 35.5, 17.25, 4.25, 5.25, 15.25, 15.25, 4, 4, 7.25, 12, 10],
    bordereauBalance: [10, 10, 10, 10, 10, 12, 13, 75, 24.5, 24.5, 22, 20, 16, 19, 19, 18]
};
