'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/ui/LanguageProvider';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Header(): JSX.Element {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-lg font-semibold">Drive SaaS</h1>
      <div className="flex items-center gap-3">
        <nav className="hidden gap-3 sm:flex">
          <Link href="/dashboard" className="text-sm hover:underline">
            {t.dashboard}
          </Link>
          <Link href="/batches" className="text-sm hover:underline">
            {t.batches}
          </Link>
        </nav>
        <button
          type="button"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700"
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        >
          {t.language}
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
