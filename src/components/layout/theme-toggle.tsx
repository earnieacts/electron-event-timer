import { useState, useRef } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ComputerIcon from '@mui/icons-material/Computer';

type Theme = 'light' | 'dark' | 'system';

interface ThemeToggleProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseLeave = () => {
    closeTimeoutRef.current = window.setTimeout(() => {
      if (!containerRef.current?.matches(':hover')) {
        setIsOpen(false);
      }
    }, 100);
  };

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleThemeChange = (theme: Theme) => {
    onThemeChange(theme);
    setIsOpen(false);
  };

  return (
    <div 
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        <span className="material-icons text-xl">
          {currentTheme === 'light' ? <LightModeIcon className="text-xl" /> : 
           currentTheme === 'dark' ? <DarkModeIcon className="text-xl" /> : <ComputerIcon className="text-xl" />}
        </span>
      </button>
      {isOpen && (
        <div 
          className="absolute right-0 top-full"
        >
          <div className="mt-2 w-36 py-2 bg-gray-800 rounded-lg shadow-xl">
            <div
              className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center gap-2 cursor-pointer"
              onClick={() => handleThemeChange('light')}
            >
              <LightModeIcon className="text-xl" />
              Light
            </div>
            <div
              className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center gap-2 cursor-pointer"
              onClick={() => handleThemeChange('dark')}
            >
              <DarkModeIcon className="text-xl" />
              Dark
            </div>
            <div
              className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center gap-2 cursor-pointer"
              onClick={() => handleThemeChange('system')}
            >
              <ComputerIcon className="text-xl" />
              System
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle; 