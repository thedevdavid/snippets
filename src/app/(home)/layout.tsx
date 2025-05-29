import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";
// import { GithubInfo } from "fumadocs-ui/components/github-info";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[
        {
          text: "Snippets",
          url: "/docs",
          secondary: false,
        },
        {
          text: "Blog",
          url: "/blog",
          secondary: false,
        },
      ]}
    >
      {children}
      <footer className="border-t py-6 text-center text-xs text-fd-muted-foreground justify-between items-center flex flex-row max-w-6xl mx-auto">
        <span>
          © 2025 snippets.thedevdavid.com. Licensed under MIT. All rights
          reserved.
        </span>
        {/* <GithubInfo
          className="hidden md:flex"
          owner="thedevdavid"
          repo="snippets"
          // your own GitHub access token (optional)
          // token={process.env.GITHUB_TOKEN}
        /> */}
      </footer>
    </HomeLayout>
  );
}
