'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle(): JSX.Element {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      className="rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
