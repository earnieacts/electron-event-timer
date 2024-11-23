import React from 'react';

const WindowsControls: React.FC = () => {
  const handleMinimize = () => window.electron?.window.minimize();
  const handleMaximize = () => window.electron?.window.maximize();
  const handleClose = () => window.electron?.window.close();

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