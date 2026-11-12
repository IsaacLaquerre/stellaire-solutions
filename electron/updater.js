// Auto-update from the public repo's GitHub Releases. Checks on launch,
// downloads in the background, installs only when the user clicks a button.
import { app, ipcMain } from 'electron';
import updater from 'electron-updater';
import { isTrustedSender } from './window.js';

const { autoUpdater } = updater;

export const GITHUB_OWNER = 'IsaacLaquerre';
export const GITHUB_REPO = 'stellaire-solutions';

export const UPDATE_CHANNELS = {
    ready: 'update-ready',
    pending: 'update-pending',
    install: 'update-install'
};

autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = false;
// No channel set: an alpha install then accepts newer alpha releases and
// falls back from alpha.yml to the published latest.yml. Setting
// channel = 'latest' makes it skip every alpha release.
autoUpdater.on('error', (err) => console.log('[autoUpdater] error:', err && err.message));

// Downloaded update waiting for the user: { version, url } or null.
let ready = null;

export const releaseUrl = (version) => `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/releases/tag/v${version}`;

export function registerUpdater({ getWindow }) {
    autoUpdater.on('update-downloaded', (info) => {
        const version = info && info.version;
        ready = { version, url: releaseUrl(version) };
        const win = getWindow();
        if (win && !win.isDestroyed()) win.webContents.send(UPDATE_CHANNELS.ready, ready);
    });

    // The page asks on load, in case the download finished before it.
    ipcMain.handle(UPDATE_CHANNELS.pending, (event) => (isTrustedSender(event.senderFrame) ? ready : null));
    ipcMain.handle(UPDATE_CHANNELS.install, (event) => {
        if (isTrustedSender(event.senderFrame) && ready) autoUpdater.quitAndInstall();
    });
}

export function checkForUpdates() {
    if (!app.isPackaged) return;
    autoUpdater.checkForUpdates().catch((err) => console.log('[autoUpdater] check failed:', err && err.message));
}
