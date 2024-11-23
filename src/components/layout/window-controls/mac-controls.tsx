import React from 'react';

const MacControls: React.FC = () => {
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
    <div className="flex gap-2">
      <button
        onClick={handleClose}
        className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors"
        aria-label="Close"
      />
      <button
        onClick={handleMinimize}
        className="w-3 h-3 rounded-full bg-yellow-400 hover:bg-yellow-500 transition-colors"
        aria-label="Minimize"
      />
      <button
        onClick={handleMaximize}
        className="w-3 h-3 rounded-full bg-green-400 hover:bg-green-500 transition-colors"
        aria-label="Maximize"
      />
    </div>
  );
};

export default MacControls; 