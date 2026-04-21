const { contextBridge, ipcRenderer } = require('electron');

// Expose protected APIs to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  saveAnalysis: (data) => ipcRenderer.invoke('save-analysis', data)
});
