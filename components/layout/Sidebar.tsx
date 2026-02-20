"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/ui/language-provider";

export default function Sidebar(): JSX.Element {
  const pathname = usePathname();
  const { t } = useLanguage();

  const items = [
    { href: "/dashboard", label: t.dashboard },
    { href: "/batches", label: t.batches }
  ];

  return (
    <aside className="fixed top-16 h-[calc(100vh-4rem)] w-60 border-r border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950">
      <nav className="flex flex-col gap-2">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm ${
                active
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  : "text-slate-700 dark:text-slate-300"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
