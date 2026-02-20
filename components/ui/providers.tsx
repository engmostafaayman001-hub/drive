"use client";

import { ReactNode } from "react";
import { LanguageProvider } from "@/components/ui/language-provider";
import { ThemeProvider } from "@/components/ui/theme-provider";

export function Providers({ children }: { children: ReactNode }): JSX.Element {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
