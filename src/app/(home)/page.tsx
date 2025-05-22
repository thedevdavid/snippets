import Link from "next/link";
import { GithubInfo } from "fumadocs-ui/components/github-info";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <h1 className="mb-4 text-2xl font-bold">Snippets</h1>
      <GithubInfo
        owner="thedevdavid"
        repo="snippets"
        // your own GitHub access token (optional)
        // token={process.env.GITHUB_TOKEN}
      />
      <p className="text-fd-muted-foreground">
        See the{" "}
        <Link
          href="/docs"
          className="text-fd-foreground font-semibold underline"
        >
          snippets
        </Link>{" "}
        or whatever. I won&apos;t tell you what to do.
      </p>
    </main>
  );
}
