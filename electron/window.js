// Main window, locked down: sandboxed renderer, no navigation, no popups.
import { BrowserWindow, session, shell } from 'electron';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = new URL('../', import.meta.url);
export const INDEX_FILE = fileURLToPath(new URL('renderer/index.html', ROOT));
export const INDEX_URL = pathToFileURL(INDEX_FILE).href;

// Only the app's own page may talk to the main process.
export const isTrustedSender = (frame) => Boolean(frame) && frame.url === INDEX_URL;

export function createWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 760,
        minWidth: 720,
        minHeight: 560,
        autoHideMenuBar: false,
        icon: fileURLToPath(new URL('assets/icon.png', ROOT)),
        backgroundColor: '#10151d',
        show: false,
        webPreferences: {
            preload: fileURLToPath(new URL('electron/preload.cjs', ROOT)),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true,
            spellcheck: false
        }
    });

    win.once('ready-to-show', () => win.show());
    win.webContents.on('will-navigate', (event) => event.preventDefault());
    win.webContents.setWindowOpenHandler(({ url }) => {
        if (/^https:\/\//.test(url)) shell.openExternal(url);
        return { action: 'deny' };
    });
    win.loadFile(INDEX_FILE);
    return win;
}

// No camera, microphone, notifications, etc.
export function denyPermissions() {
    session.defaultSession.setPermissionRequestHandler((_wc, _permission, callback) => callback(false));
}
