'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/components/ui/LanguageProvider';
import clsx from 'clsx';

export function Sidebar(): JSX.Element {
  const pathname = usePathname();
  const { t } = useLanguage();

  const items = [
    { href: '/dashboard', label: t.dashboard },
    { href: '/batches', label: t.batches }
  ];

  return (
    <aside className="hidden w-56 border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:block">
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={clsx(
                'block rounded-md px-3 py-2 text-sm',
                pathname === item.href
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
