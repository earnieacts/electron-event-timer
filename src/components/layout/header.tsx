import React from 'react';
import WindowControls from './window-controls';
import ThemeToggle from './theme-toggle';
import { useTheme } from '@/hooks/use-theme';

const Header: React.FC = () => {
  const isMac = window.navigator.platform.toLowerCase().includes('mac');
  const { theme, setTheme } = useTheme();

  return (
    <header 
      className="bg-gray-100 dark:bg-black p-2 flex justify-between items-center select-none" 
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      {isMac && <WindowControls />}
      <div className="text-gray-900 dark:text-white text-sm">EVENT TIMER</div>
      <div 
        className="flex items-center gap-4" 
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        <ThemeToggle currentTheme={theme} onThemeChange={setTheme} />
        {!isMac && <WindowControls />}
      </div>
    </header>
  );
};

export default Header;
