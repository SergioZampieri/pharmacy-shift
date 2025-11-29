import { useEffect } from 'react';

import { usePreferencesStore } from '@/stores';

/**
 * Hook to manage theme application
 * Detects OS preference on first load, then provides simple toggle
 */
export function useTheme() {
  const { theme, setTheme, toggleTheme } = usePreferencesStore();

  // Detect OS preference on first load (only if no theme is stored)
  useEffect(() => {
    const stored = localStorage.getItem('pharmacy-shifts-preferences');

    // If no stored preference, detect OS preference and set it
    if (!stored) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, [setTheme]);

  // Apply theme to DOM whenever it changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return { theme, toggleTheme };
}
