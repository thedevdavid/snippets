import { DocsLayout, type DocsLayoutProps } from "fumadocs-ui/layouts/notebook";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
// import { GithubInfo } from "fumadocs-ui/components/github-info";
import { Brain } from "lucide-react";

const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: source.pageTree,
  links: [
    {
      icon: <Brain />,
      text: "llms.txt",
      url: "/docs/llms.txt",
      secondary: true,
    },
    // {
    //   type: "custom",
    //   children: (
    //     <GithubInfo owner="thedevdavid" repo="snippets" className="lg:-mx-2" />
    //   ),
    // },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsLayout {...docsOptions}>{children}</DocsLayout>;
}
