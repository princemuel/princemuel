'use client';

import { ThemeProvider } from 'next-themes';
import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider
      storageKey='page-theme'
      defaultTheme='system'
      enableSystem={true}
      attribute='data-theme'
    >
      {children}
    </ThemeProvider>
  );
};

export { Providers };
