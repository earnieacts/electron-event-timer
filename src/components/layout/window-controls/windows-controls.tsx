import React from 'react';

const WindowsControls: React.FC = () => {
  const handleMinimize = () => {
    if (window.electron?.window?.minimize) {
      window.electron.window.minimize();
    }
  };
  
  const handleMaximize = () => {
    if (window.electron?.window?.maximize) {
      window.electron.window.maximize();
    }
  };
  
  const handleClose = () => {
    if (window.electron?.window?.close) {
      window.electron.window.close();
    }
  };

  return (
    <div className="flex">
      <button
        onClick={handleMinimize}
        className="px-4 py-2 hover:bg-gray-800 text-white transition-colors"
        aria-label="Minimize"
      >
        ─
      </button>
      <button
        onClick={handleMaximize}
        className="px-4 py-2 hover:bg-gray-800 text-white transition-colors"
        aria-label="Maximize"
      >
        □
      </button>
      <button
        onClick={handleClose}
        className="px-4 py-2 hover:bg-red-600 text-white transition-colors"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
};

export default WindowsControls; 