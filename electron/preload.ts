import { contextBridge, ipcRenderer } from 'electron';

// Define the types for the exposed API
export type ElectronAPI = {
  window: {
    minimize: () => void;
    maximize: () => void;
    close: () => void;
    openExternal: (url: string) => void;
  };
};

// Validate URLs before sending them to the main process
const isValidUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return ['http:', 'https:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
};

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electron', {
  window: {
    minimize: () => ipcRenderer.send('window:minimize'),
    maximize: () => ipcRenderer.send('window:maximize'),
    close: () => ipcRenderer.send('window:close'),
    openExternal: (url: string) => {
      if (isValidUrl(url)) {
        ipcRenderer.send('window:openExternal', url);
      }
    },
  },
});
