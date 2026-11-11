// Bridge exposed to the interface as window.api. Sandboxed preloads must be
// CommonJS and can only use the bridge modules.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    // payload: { module, file?: { bytes, name, sha256 }, dpCount?, labourCost?, fields? }
    generate: (payload) => ipcRenderer.invoke('generate', payload),
    // Opens the explorer on a file or folder this session generated.
    showItem: (filePath) => ipcRenderer.send('show-item', filePath),
    setLanguage: (lang) => ipcRenderer.send('set-language', lang),
    // Downloaded update: { version, url } or null.
    pendingUpdate: () => ipcRenderer.invoke('update-pending'),
    onUpdateReady: (callback) => { ipcRenderer.on('update-ready', (_event, info) => callback(info)); },
    // Quits, installs the downloaded update and restarts.
    installUpdate: () => ipcRenderer.invoke('update-install')
});
