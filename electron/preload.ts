import { contextBridge, ipcRenderer } from 'electron';

// Define the types for the exposed API
export type ElectronAPI = {
  store: {
    get: (key: string) => Promise<any>;
    set: (key: string, value: any) => Promise<void>;
    delete: (key: string) => Promise<void>;
    clear: () => Promise<void>;
  };
  platform: {
    isMac: boolean;
    isWindows: boolean;
    isLinux: boolean;
  };
  window: {
    minimize: () => void;
    maximize: () => void;
    close: () => void;
    openExternal: (url: string) => void;
  };
  ipc: {
    send: (channel: string, data?: any) => void;
    on: (channel: string, func: (...args: any[]) => void) => () => void;
    invoke: (channel: string, data?: any) => Promise<any>;
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

contextBridge.exposeInMainWorld('electron', {
  store: {
    get: (key: string) => ipcRenderer.invoke('electron-store-get', key),
    set: (key: string, value: any) => ipcRenderer.invoke('electron-store-set', { key, value }),
    delete: (key: string) => ipcRenderer.invoke('electron-store-delete', key),
    clear: () => ipcRenderer.invoke('electron-store-clear')
  },
  platform: {
    isMac: process.platform === 'darwin',
    isWindows: process.platform === 'win32',
    isLinux: process.platform === 'linux'
  },
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
  ipc: {
    send: (channel: string, data?: any) => ipcRenderer.send(channel, data),
    on: (channel: string, func: (...args: any[]) => void) => {
      const subscription = (_event: any, ...args: any[]) => func(...args);
      ipcRenderer.on(channel, subscription);
      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    invoke: (channel: string, data?: any) => ipcRenderer.invoke(channel, data)
  }
});
