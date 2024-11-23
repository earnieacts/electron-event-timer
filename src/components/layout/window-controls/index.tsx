import React from 'react';
import MacControls from './mac-controls';
import WindowsControls from './windows-controls';

const WindowControls: React.FC = () => {
  const isMac = window.navigator.platform.toLowerCase().includes('mac');
  
  return isMac ? <MacControls /> : <WindowsControls />;
};

export default WindowControls; 