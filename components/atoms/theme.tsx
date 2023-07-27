'use client';

import { cn } from '@/lib';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Laptop, MoonIcon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { startTransition, useCallback } from 'react';

interface Props {
  className?: string;
}

export const ThemeSwitch = ({ className }: Props) => {
  const { theme, setTheme } = useTheme();

  // const [_, setMounted] = useState(false);
  // useEffect(() => setMounted(true), []);

  const updateTheme = useCallback(
    (theme: string) => startTransition(() => setTheme(theme)),
    [setTheme]
  );

  return (
    <ToggleGroup.Root
      type='single'
      aria-label='Theme Mode Switch'
      className={cn('flex items-center gap-3 p-1', className)}
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
        <Sun strokeWidth={1} />
        <span className='sr-only'>Select light theme</span>
      </ToggleGroup.Item>

      <ToggleGroup.Item
        value='system'
        aria-label='Use default system theme'
        className={cn('')}
      >
        <Laptop strokeWidth={1} />
      </ToggleGroup.Item>

      <ToggleGroup.Item
        value='dark'
        aria-label='Choose dark theme'
        className={cn('')}
      >
        <MoonIcon strokeWidth={1} />
      </ToggleGroup.Item>
    </ToggleGroup.Root>
  );
};
