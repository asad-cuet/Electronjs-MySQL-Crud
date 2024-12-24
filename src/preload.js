const { contextBridge, ipcRenderer } = require('electron');

// Expose the IPC API securely
contextBridge.exposeInMainWorld('electronAPI', {
  fetchCategories: () => ipcRenderer.invoke('get-categories'),
});
