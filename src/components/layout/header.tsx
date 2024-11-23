import React from 'react';
// import WindowControls from './window-controls';
import ThemeToggle from './theme-toggle';
import { useTheme } from '@/hooks/use-theme';

const Header: React.FC = () => {

  const { theme, setTheme } = useTheme();

  return (
    <header 
      className="bg-gray-100 dark:bg-black p-2 flex justify-end items-center select-none" 
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      <div 
        className="flex items-center gap-4 px-4 py-2" 
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        <ThemeToggle currentTheme={theme} onThemeChange={setTheme} />
      
      </div>
    </header>
  );
};

export default Header;
