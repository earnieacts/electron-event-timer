// Define the structure of the Electron API exposed through the preload script
export interface ElectronWindow extends Window {
  electron?: {
    window: {
      /**
       * Minimizes the current Electron window.
       */
      minimize: () => void;

      /**
       * Toggles maximization of the current Electron window.
       */
      maximize: () => void;

      /**
       * Closes the current Electron window.
       */
      close: () => void;

      /**
       * Opens an external URL in the default web browser.
       * @param url - The URL to open.
       */
      openExternal: (url: string) => void;
    };
  };
}

// Extend the global Window interface to include the `electron` property
declare global {
  interface Window {
    electron?: {
      window: {
        /**
         * Minimizes the current Electron window.
         */
        minimize: () => void;

        /**
         * Toggles maximization of the current Electron window.
         */
        maximize: () => void;

        /**
         * Closes the current Electron window.
         */
        close: () => void;

        /**
         * Opens an external URL in the default web browser.
         * @param url - The URL to open.
         */
        openExternal: (url: string) => void;
      };
    };
  }
}
