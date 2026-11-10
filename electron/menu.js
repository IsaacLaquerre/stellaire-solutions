// Application menu (always visible), rebuilt when the language changes.
import { app, dialog, Menu, shell } from 'electron';

export const MENU_LABELS = {
    fr: {
        file: 'Fichier', openOutput: 'Ouvrir le dossier de sortie', quit: 'Quitter',
        view: 'Affichage', reload: 'Recharger', devtools: 'Outils de développement',
        zoomIn: 'Zoom avant', zoomOut: 'Zoom arrière', zoomReset: 'Zoom par défaut', fullscreen: 'Plein écran',
        help: 'Aide', about: 'À propos', version: 'Version'
    },
    en: {
        file: 'File', openOutput: 'Open output folder', quit: 'Quit',
        view: 'View', reload: 'Reload', devtools: 'Developer tools',
        zoomIn: 'Zoom in', zoomOut: 'Zoom out', zoomReset: 'Reset zoom', fullscreen: 'Full screen',
        help: 'Help', about: 'About', version: 'Version'
    }
};

export const normalizeLang = (lang) => (lang === 'en' ? 'en' : 'fr');

export function buildMenu(lang, { outputDir }) {
    const t = MENU_LABELS[normalizeLang(lang)];
    const template = [
        {
            label: t.file,
            submenu: [
                { label: t.openOutput, click: () => shell.openPath(outputDir()) },
                { type: 'separator' },
                { label: t.quit, role: 'quit' }
            ]
        },
        {
            label: t.view,
            submenu: [
                { label: t.reload, role: 'reload' },
                { label: t.devtools, role: 'toggleDevTools' },
                { type: 'separator' },
                { label: t.zoomIn, role: 'zoomIn' },
                { label: t.zoomOut, role: 'zoomOut' },
                { label: t.zoomReset, role: 'resetZoom' },
                { type: 'separator' },
                { label: t.fullscreen, role: 'togglefullscreen' }
            ]
        },
        {
            label: t.help,
            submenu: [
                {
                    label: t.about,
                    click: () => dialog.showMessageBox({
                        type: 'info',
                        title: t.about,
                        message: app.getName(),
                        detail: `${t.version} ${app.getVersion()}`
                    })
                }
            ]
        }
    ];
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}
