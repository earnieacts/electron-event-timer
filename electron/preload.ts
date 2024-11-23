import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  window: {
    minimize() {
      ipcRenderer.send('window:minimize');
    },
    maximize() {
      ipcRenderer.send('window:maximize');
    },
    close() {
      ipcRenderer.send('window:close');
    }
  }
});
