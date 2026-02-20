'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';
import { THEME_STORAGE_KEY } from '@/lib/theme';

export function ThemeProvider({ children }: { children: ReactNode }): JSX.Element {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem storageKey={THEME_STORAGE_KEY}>
      {children}
    </NextThemesProvider>
  );
}
