import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div className="flex items-center bg-gray-100 dark:bg-white/5 p-1 rounded-xl border border-gray-200 dark:border-white/10">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-lg transition-all ${
          theme === 'light' 
            ? 'bg-white dark:bg-zinc-800 shadow-sm text-samarkand' 
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'
        }`}
        title="Light Mode"
        aria-label="Switch to Light Mode"
      >
        <Sun className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-lg transition-all ${
          theme === 'dark' 
            ? 'bg-white dark:bg-zinc-800 shadow-sm text-samarkand' 
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'
        }`}
        title="Dark Mode"
        aria-label="Switch to Dark Mode"
      >
        <Moon className="w-4 h-4" />
      </button>

      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-lg transition-all ${
          theme === 'system' 
            ? 'bg-white dark:bg-zinc-800 shadow-sm text-samarkand' 
            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'
        }`}
        title="System Preference"
        aria-label="Switch to System Preference"
      >
        <Monitor className="w-4 h-4" />
      </button>
    </div>
  );
}
