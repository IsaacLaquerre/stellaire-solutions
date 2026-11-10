// French / English strings. Both languages must have the same keys
// (checked by test/unit/i18n.test.js).

export const I18N = {
    fr: {
        appTitle: 'Stellaire Solutions',
        appSub: 'Documents techniques · génération automatisée',
        home: 'Retour au menu',
        settings: 'Paramètres',
        close: 'Fermer',
        homeEyebrow: 'Modules disponibles',
        homeTitle: 'Que voulez-vous générer ?',
        moduleEyebrow: 'Module',
        back: '← Retour au menu',
        submit: 'Lancer la génération',
        chooseFile: 'Choisir un fichier…',
        bordereau: 'Bordereau (.xlsx)',

        modDpm: 'Générateur DPM',
        modDpmDesc: "Produit les DP à partir d'un bordereau.",
        modFormulaire: 'Générateur Formulaire DPM',
        modFormulaireDesc: 'Génère le formulaire de demande de paiement.',
        modTakeoff: 'Générateur TakeOff',
        modTakeoffDesc: "Prépare l'estimation à partir d'un bordereau.",
        modRapport: 'Générateur Rapport Inspection',
        modRapportDesc: "Génère les rapports journaliers d'inspection.",

        dpQty: 'Quantité de DP',
        rFileNum: 'Numéro de dossier',
        rProjectName: 'Nom du projet',
        rLocation: "Localisation d'entrave",
        rSupervisor: 'Surveillant',
        rSignalManager: 'Responsable en signalisation du surveillant',
        rSignatory: 'Nom du signataire du formulaire',
        rStartDate: "Date de début (vide : aujourd'hui)",
        rMinHour: "Heure minimum d'inspection (vide : 8)",
        rMaxHour: "Heure maximum d'inspection (vide : 17)",
        rDays: 'Nombre de jours à générer',
        rapportHint: "Le gabarit s'ouvrira dans PDF-XChange Editor. Modifiez-le au besoin, enregistrez, puis fermez l'éditeur pour lancer la génération.",

        darkTheme: 'Thème sombre',
        darkThemeHint: 'Interface à faible luminosité',
        language: 'Langue',
        languageHint: 'Interface et menus',

        running: 'Génération en cours…',
        runningRapport: "En attente de la fermeture de PDF-XChange Editor, puis génération…",
        fileDone: 'Fichier créé dans le dossier Téléchargements.',
        folderDone: 'Dossier créé dans le dossier Téléchargements.',
        showItem: 'Afficher dans le dossier',

        errEmpty: 'Le fichier est vide.',
        errTooLarge: 'Le fichier dépasse la limite de 50 Mo.',
        errType: 'Seuls les fichiers Excel .xlsx sont acceptés.',
        errHash: 'Le fichier a été altéré pendant le transfert. Réessayez.',
        errUnreadable: "Ce fichier n'a pas la structure d'un bordereau reconnu.",
        errInvalid: 'Valeur invalide : {detail}',
        errLocked: '{detail}',
        errBusy: 'Une génération est déjà en cours pour ce module.',
        errEditor: "PDF-XChange Editor est introuvable. Installez-le ou mettez-le à jour, puis réessayez.",
        errTimeout: 'La génération a pris trop de temps et a été arrêtée.',
        errGeneration: 'La génération a échoué : {detail}',
        errUnknown: "Une erreur est survenue pendant l'envoi au serveur."
    },

    en: {
        appTitle: 'Stellaire Solutions',
        appSub: 'Technical documents · automated generation',
        home: 'Back to menu',
        settings: 'Settings',
        close: 'Close',
        homeEyebrow: 'Available modules',
        homeTitle: 'What do you want to generate?',
        moduleEyebrow: 'Module',
        back: '← Back to menu',
        submit: 'Start generation',
        chooseFile: 'Choose a file…',
        bordereau: 'Bid schedule (.xlsx)',

        modDpm: 'DPM Generator',
        modDpmDesc: 'Produces the DPs from a bid schedule.',
        modFormulaire: 'DPM Form Generator',
        modFormulaireDesc: 'Generates the payment request form.',
        modTakeoff: 'TakeOff Generator',
        modTakeoffDesc: 'Prepares the estimate from a bid schedule.',
        modRapport: 'Inspection Report Generator',
        modRapportDesc: 'Generates daily inspection reports.',

        dpQty: 'Number of DPs',
        rFileNum: 'File number',
        rProjectName: 'Project name',
        rLocation: 'Obstruction location',
        rSupervisor: 'Supervisor',
        rSignalManager: "Supervisor's signaling manager",
        rSignatory: 'Form signatory name',
        rStartDate: 'Start date (empty: today)',
        rMinHour: 'Earliest inspection hour (empty: 8)',
        rMaxHour: 'Latest inspection hour (empty: 17)',
        rDays: 'Number of days to generate',
        rapportHint: 'The template will open in PDF-XChange Editor. Edit it if needed, save, then close the editor to start the generation.',

        darkTheme: 'Dark theme',
        darkThemeHint: 'Low-brightness interface',
        language: 'Language',
        languageHint: 'Interface and menus',

        running: 'Generating…',
        runningRapport: 'Waiting for PDF-XChange Editor to close, then generating…',
        fileDone: 'File created in the Downloads folder.',
        folderDone: 'Folder created in the Downloads folder.',
        showItem: 'Show in folder',

        errEmpty: 'The file is empty.',
        errTooLarge: 'The file exceeds the 50 MB limit.',
        errType: 'Only Excel .xlsx files are accepted.',
        errHash: 'The file was altered during transfer. Please try again.',
        errUnreadable: 'This file does not have the structure of a recognized bid schedule.',
        errInvalid: 'Invalid value: {detail}',
        errLocked: '{detail}',
        errBusy: 'A generation is already running for this module.',
        errEditor: 'PDF-XChange Editor was not found. Install or update it, then try again.',
        errTimeout: 'The generation took too long and was stopped.',
        errGeneration: 'Generation failed: {detail}',
        errUnknown: 'An error occurred while sending to the server.'
    }
};

export function translate(lang, key, vars = {}) {
    const dict = I18N[lang] || I18N.fr;
    let text = dict[key] ?? I18N.fr[key] ?? key;
    for (const [name, value] of Object.entries(vars)) text = text.replaceAll(`{${name}}`, String(value));
    return text;
}
