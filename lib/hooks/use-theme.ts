'use client';

import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef } from 'react';

function useThemeSwitch() {
  const theme = useTheme();
  const { setTheme, resolvedTheme } = theme;
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  const isDarkMode = mounted && resolvedTheme === 'dark';

  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  const Icon = isDark ? MoonStar : Sun;
  const iconText = isDark ? 'Dark' : 'Light';

  const updateTheme = useCallback(() => {
    startTransition(() => {
      setTheme(isDarkMode ? 'light' : 'dark');
    });
  }, [isDarkMode, setTheme]);

  return {
    mounted,
    Icon,
    iconText,
    toggleTheme,
    updateTheme,
  };
}
