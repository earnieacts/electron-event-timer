export interface ElectronWindow {
  window: {
    minimize: () => void;
    maximize: () => void;
    close: () => void;
  }
}

declare global {
  interface Window {
    electron: ElectronWindow;
  }
} 