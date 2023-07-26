'use client';

import { cn } from '@/lib';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Laptop, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { startTransition, useCallback } from 'react';

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();

  // const [_, setMounted] = useState(false);
  // useEffect(() => setMounted(true), []);

  const updateTheme = useCallback(
    (theme: string) => {
      startTransition(() => {
        setTheme(theme);
      });
    },
    [setTheme]
  );

  return (
    <ToggleGroup.Root
      type='single'
      aria-label='Theme Mode Switch'
      value={theme}
      onValueChange={(value) => {
        if (value) updateTheme(value);
      }}
    >
      <ToggleGroup.Item
        value='light'
        aria-label='Choose light theme'
        className={cn('')}
      >
        <SunIcon />
      </ToggleGroup.Item>

      <ToggleGroup.Item
        value='system'
        aria-label='Use default system theme'
        className={cn('')}
      >
        <Laptop />
      </ToggleGroup.Item>

      <ToggleGroup.Item
        value='dark'
        aria-label='Choose dark theme'
        className={cn('')}
      >
        <MoonIcon />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};
