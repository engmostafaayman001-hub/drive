"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/ui/language-provider";

export default function Header(): JSX.Element {
  const { setTheme, resolvedTheme } = useTheme();
  const { t, toggleLanguage } = useLanguage();

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-700 dark:bg-slate-900">
      <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{t.appName}</h1>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleLanguage}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium dark:border-slate-600"
        >
          {t.language}
        </button>
        <button
          type="button"
          aria-label={t.theme}
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="rounded-md border border-slate-300 p-2 dark:border-slate-600"
        >
          {resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
