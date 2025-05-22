import Link from "next/link";
import { GithubInfo } from "fumadocs-ui/components/github-info";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Fullstack snippets that actually work
        </h1>

        <p className="text-xl text-fd-muted-foreground leading-relaxed">
          Drop-in code that includes the client, server, database, and config to
          build production-ready features. No more half-finished tutorials or
          components that break when you try to deploy them.
        </p>

        <div className="flex flex-wrap justify-center gap-3 text-sm text-fd-muted-foreground">
          <span className="px-3 py-1 bg-fd-muted rounded-full">Next.js</span>
          <span className="px-3 py-1 bg-fd-muted rounded-full">
            TanStack Start
          </span>
          <span className="px-3 py-1 bg-fd-muted rounded-full">Supabase</span>
          <span className="px-3 py-1 bg-fd-muted rounded-full">Drizzle</span>
          <span className="px-3 py-1 bg-fd-muted rounded-full">Cloudflare</span>
          <span className="px-3 py-1 bg-fd-muted rounded-full">
            Better-Auth
          </span>
          <span className="text-fd-muted-foreground">+ more</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/docs"
            className="inline-flex items-center justify-center px-6 py-3 bg-fd-primary text-fd-primary-foreground font-medium rounded-lg hover:bg-fd-primary/90 transition-colors"
          >
            Browse snippets
          </Link>
          <code className="px-3 py-2 bg-fd-muted rounded text-sm font-mono">
            npx shadcn@latest add
            &quot;https://snippets.thedevdavid.com/r/[name].json&quot;
          </code>
        </div>

        <div className="border-t border-fd-border pt-8 mt-8">
          <p className="text-lg font-medium mb-6">
            Because modern apps aren&apos;t just &quot;Next.js apps&quot;
          </p>
          <p className="text-fd-muted-foreground mb-8 leading-relaxed">
            Your app needs auth (Supabase), state management (TanStack),
            deployment (Cloudflare), database (Drizzle), and API layer (tRPC).
            Most snippets give you one piece. We give you the whole integration,
            with multiple stack combinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-left">
          <div className="space-y-2">
            <h3 className="font-semibold">Multi-tool integration</h3>
            <p className="text-sm text-fd-muted-foreground">
              Not just &quot;a React component&quot; but React + Supabase +
              Cloudflare + TanStack working together. The way you actually build
              apps.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Choose your stack</h3>
            <p className="text-sm text-fd-muted-foreground">
              Same feature, different implementations. Next.js + Supabase, or
              TanStack Start + Drizzle, or whatever combo works for your
              project.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Deploy-ready code</h3>
            <p className="text-sm text-fd-muted-foreground">
              Includes the middleware, environment configs, and deployment
              scripts. Not just dev mode - actually shipping to production.
            </p>
          </div>
        </div>

        <div className="pt-8">
          <GithubInfo
            owner="thedevdavid"
            repo="snippets"
            // your own GitHub access token (optional)
            // token={process.env.GITHUB_TOKEN}
          />
        </div>

        <p className="text-sm text-fd-muted-foreground">
          Free, open source, no BS. Just code that works.
        </p>
      </div>
    </main>
  );
}
