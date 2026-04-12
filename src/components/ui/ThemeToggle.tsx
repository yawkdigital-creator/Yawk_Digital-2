import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-10 h-6 sm:w-12 sm:h-7 md:w-14 md:h-8 rounded-full border-2 border-red-500 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 group overflow-hidden touch-manipulation active:scale-95 flex-shrink-0 ${
        theme === 'dark' ? 'bg-slate-950' : 'bg-gradient-to-r from-yellow-200 to-orange-200'
      }`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{ minHeight: 'auto', minWidth: 'auto' }}
    >
      {/* Toggle Circle */}
      <div
        className={`absolute top-0.5 left-0.5 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full shadow-lg transform transition-transform duration-500 flex items-center justify-center ${
          theme === 'light' ? 'translate-x-0 bg-white' : 'translate-x-4 sm:translate-x-5 md:translate-x-6 bg-slate-950'
        }`}
      >
        {theme === 'light' ? (
          <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-yellow-500 transition-all duration-500" />
        ) : (
          <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white transition-all duration-500" />
        )}
      </div>
    </button>
  );
};
