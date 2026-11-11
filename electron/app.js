// Starts the application. Used by main.js and by the end-to-end test,
// which passes its own output folder and generator options.
import { app, BrowserWindow } from 'electron';
import { registerIpc } from './ipc.js';
import { buildMenu } from './menu.js';
import { checkForUpdates, registerUpdater } from './updater.js';
import { createWindow, denyPermissions } from './window.js';

export async function startApp({ outputDir = () => app.getPath('downloads'), generatorOptions } = {}) {
    if (!app.requestSingleInstanceLock()) {
        app.quit();
        return null;
    }

    await app.whenReady();
    denyPermissions();
    registerIpc({ outputDir, generatorOptions });
    buildMenu('fr', { outputDir });

    let win = createWindow();
    registerUpdater({ getWindow: () => win });
    checkForUpdates();
    app.on('second-instance', () => {
        if (win.isMinimized()) win.restore();
        win.focus();
    });
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) win = createWindow();
    });
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit();
    });
    return win;
}
