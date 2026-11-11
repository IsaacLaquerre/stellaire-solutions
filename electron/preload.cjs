// Bridge exposed to the interface as window.api. Sandboxed preloads must be
// CommonJS and can only use the bridge modules.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    // payload: { module, file?: { bytes, name, sha256 }, dpCount?, labourCost?, fields? }
    generate: (payload) => ipcRenderer.invoke('generate', payload),
    // Opens the explorer on a file or folder this session generated.
    showItem: (filePath) => ipcRenderer.send('show-item', filePath),
    setLanguage: (lang) => ipcRenderer.send('set-language', lang)
});
