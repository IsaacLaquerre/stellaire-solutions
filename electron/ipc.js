// IPC channels between the interface and the main process. Each handler
// checks the sender, then delegates to core/ (no business logic here).
import { ipcMain, shell } from 'electron';
import { createRequestHandler } from '../core/requests.js';
import { failure } from '../core/errors.js';
import { buildMenu, normalizeLang } from './menu.js';
import { isTrustedSender } from './window.js';

export const CHANNELS = {
    generate: 'generate',
    showItem: 'show-item',
    setLanguage: 'set-language'
};

export function registerIpc({ outputDir, generatorOptions = {} }) {
    const requests = createRequestHandler({
        outputDir,
        log: (line) => console.log(line),
        generatorOptions
    });

    ipcMain.handle(CHANNELS.generate, async (event, payload) => {
        if (!isTrustedSender(event.senderFrame)) return failure('forbidden');
        try {
            return await requests.generate(payload);
        } catch (err) {
            console.error(err);
            return failure('internal', err.message);
        }
    });

    ipcMain.on(CHANNELS.showItem, (event, filePath) => {
        if (!isTrustedSender(event.senderFrame)) return;
        if (requests.isKnownOutput(filePath)) shell.showItemInFolder(filePath);
    });

    ipcMain.on(CHANNELS.setLanguage, (event, lang) => {
        if (!isTrustedSender(event.senderFrame)) return;
        buildMenu(normalizeLang(lang), { outputDir });
    });
}
