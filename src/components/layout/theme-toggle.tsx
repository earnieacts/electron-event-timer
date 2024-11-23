import { useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeToggleProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        className="text-white hover:text-gray-300 transition-colors"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="material-icons text-xl">
          {currentTheme === 'light' ? 'light_mode' : 
           currentTheme === 'dark' ? 'dark_mode' : 'computer'}
        </span>
      </button>
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-36 py-2 bg-gray-800 rounded-lg shadow-xl"
          onMouseLeave={() => setIsOpen(false)}
        >
          <button
            className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center gap-2"
            onClick={() => {
              onThemeChange('light');
              setIsOpen(false);
            }}
          >
            <span className="material-icons text-xl">light_mode</span>
            Light
          </button>
          <button
            className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center gap-2"
            onClick={() => {
              onThemeChange('dark');
              setIsOpen(false);
            }}
          >
            <span className="material-icons text-xl">dark_mode</span>
            Dark
          </button>
          <button
            className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 flex items-center gap-2"
            onClick={() => {
              onThemeChange('system');
              setIsOpen(false);
            }}
          >
            <span className="material-icons text-xl">computer</span>
            System
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle; 