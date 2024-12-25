const { contextBridge, ipcRenderer } = require('electron');

// Expose the IPC API securely
contextBridge.exposeInMainWorld('electronAPI', {
  fetchCategories: () => ipcRenderer.invoke('get-categories'),
  addCategory: (category) => ipcRenderer.invoke('add-category', category),
  deleteCategory: (id) => ipcRenderer.invoke('delete-category', id),
  getCategory: (id) => ipcRenderer.invoke('get-category', id),
});
