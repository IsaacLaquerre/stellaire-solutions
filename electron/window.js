// Main window, locked down: sandboxed renderer, no navigation, no popups.
import { BrowserWindow, session, shell } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = new URL('../', import.meta.url);
export const INDEX_FILE = fileURLToPath(new URL('renderer/index.html', ROOT));

// Compares paths, not URL strings: Node and Chromium encode some
// characters differently (for example "~" in short Windows paths).
const samePath = (a, b) => (process.platform === 'win32' ? a.toLowerCase() === b.toLowerCase() : a === b);

// Only the app's own page may talk to the main process.
export function isTrustedSender(frame) {
    if (!frame || typeof frame.url !== 'string' || !frame.url.startsWith('file:')) return false;
    try {
        return samePath(path.resolve(fileURLToPath(frame.url)), path.resolve(INDEX_FILE));
    } catch {
        return false;
    }
}

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
