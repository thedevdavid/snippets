import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { Banner } from "fumadocs-ui/components/banner";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
          search={
            {
              // options: {
              //   defaultTag: "nextjs-supabase",
              //   tags: [
              //     {
              //       name: "nextjs-supabase",
              //       value: "nextjs-supabase",
              //     },
              //     {
              //       name: "tanstack-supabase",
              //       value: "tanstack-supabase",
              //     },
              //     {
              //       name: "blog",
              //       value: "blog",
              //     },
              //   ],
              // },
            }
          }
        >
          <Banner variant="rainbow">
            Honestly, I just wanted a nice rainbow gradient banner at the top.
          </Banner>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
