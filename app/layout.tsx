import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { LanguageProvider } from '@/components/ui/LanguageProvider';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

export const metadata: Metadata = {
  title: 'Drive SaaS',
  description: 'Production dashboard with auth and search'
};

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <div className="min-h-screen">
              <Header />
              <div className="flex min-h-[calc(100vh-4rem)]">
                <Sidebar />
                <main className="flex-1 p-4 md:p-6">{children}</main>
              </div>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
