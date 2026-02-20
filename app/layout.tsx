import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { Providers } from "@/components/ui/providers";

export const metadata: Metadata = {
  title: "Drive Dashboard",
  description: "Production-grade dashboard"
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Header />
          <Sidebar />
          <main className="pt-20 ltr:ml-60 rtl:mr-60 px-6 pb-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
