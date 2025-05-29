import Link from "next/link";
import {
  ArrowRightIcon,
  EyesIcon,
  GameControllerIcon,
  PuzzlePieceIcon,
  WrenchIcon,
} from "@phosphor-icons/react/ssr";
import { Button } from "@/registry/new-york/ui/button";
import { buttonVariants } from "fumadocs-ui/components/ui/button";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col px-4">
      <section className="flex-1 flex flex-col justify-center text-center py-16">
        <div className="max-w-5xl mx-auto space-y-6">
          <p className="text-xs font-medium text-fd-muted-foreground uppercase tracking-wider">
            Fullstack Snippets
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            Copy, paste, ship
            <br />
            production-ready code
          </h1>

          <p className="text-lg text-fd-muted-foreground max-w-2xl mx-auto">
            Drop-in code that includes client, server, database, and config. Add
            to any existing project or start fresh. Production-tested,
            production-ready.
          </p>

          <div className="pt-3">
            <Button className={buttonVariants({ color: "primary" })} asChild>
              <Link href="/docs">
                Browse snippets
                <ArrowRightIcon size={24} weight="duotone" className="size-6" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-xs text-fd-muted-foreground pt-6">
            <span className="px-2 py-1 bg-fd-muted rounded-full">Next.js</span>
            <span className="px-2 py-1 bg-fd-muted rounded-full">
              TanStack Start
            </span>
            <span className="px-2 py-1 bg-fd-muted rounded-full">Supabase</span>
            <span className="px-2 py-1 bg-fd-muted rounded-full">
              Better-Auth
            </span>
            <span className="px-2 py-1 bg-fd-muted rounded-full">
              shadcn/ui
            </span>
            <span className="px-2 py-1 bg-fd-muted rounded-full">
              TypeScript
            </span>
            <span className="text-fd-muted-foreground py-1 px-2">+ more</span>
          </div>
        </div>
      </section>

      <section className="py-16 border-t">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="gap-4">
              <h3 className="text-lg font-semibold">Beyond UI kits</h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed text-balance">
                Not just fancy components. Fullstack feature set up including
                client, server, database, and configs. The stuff that gets the
                app running.
              </p>
            </div>
            <div className="gap-4">
              <h3 className="text-lg font-semibold">
                More flexible than starter kits
              </h3>
              <p className="text-sm text-fd-muted-foreground leading-relaxed text-balance">
                Using Snippets, you can add features to your existing project
                without starting a new one. Or start a new project using the
                tech stack of <strong>your choice</strong> with the snippets
                <strong> you need</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <EyesIcon className="size-8" size={32} weight="duotone" />
              </div>
              <h3 className="text-base font-semibold">
                See before you install
              </h3>
              <p className="text-xs text-fd-muted-foreground">
                Browse the exact code you&apos;re getting. No black box
                surprises.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <PuzzlePieceIcon
                  className="size-8"
                  size={32}
                  weight="duotone"
                />
              </div>
              <h3 className="text-base font-semibold">
                Add to existing projects
              </h3>
              <p className="text-xs text-fd-muted-foreground">
                Drop into any codebase. No need to start from scratch.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <GameControllerIcon
                  size={32}
                  className="size-8"
                  weight="duotone"
                />
              </div>
              <h3 className="text-base font-semibold">Full control</h3>
              <p className="text-xs text-fd-muted-foreground">
                Own every line of code. Modify, extend, or strip down as needed.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <WrenchIcon className="size-8" size={32} weight="duotone" />
              </div>
              <h3 className="text-base font-semibold">Multiple stacks</h3>
              <p className="text-xs text-fd-muted-foreground">
                Same feature, different tech. Use what you&apos;re comfortable
                with.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-xl font-medium">
            Pick what you need, skip what you don&apos;t
          </p>
          <p className="text-sm text-fd-muted-foreground leading-relaxed">
            Need subdomain auth but not user management? Want file uploads but
            not payments? Just grab the snippets you need. Each one is a
            complete, working feature you can install independently. Mix and
            match as you need.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-left">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">
                Fullstack implementation
              </h3>
              <p className="text-xs text-fd-muted-foreground">
                Client that talk to real server and APIs, with database schemas,
                configs, and deployment included. Not just mockups or
                components.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Your tech, your way</h3>
              <p className="text-xs text-fd-muted-foreground">
                Want Next.js + Supabase? TanStack + Better-Auth? Same features
                implemented with different stacks. No vendor lock-in or forced
                choices.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Battle-tested</h3>
              <p className="text-xs text-fd-muted-foreground">
                Used in real production apps. No tutorial code that breaks when
                you try to deploy it or fails to scale beyond hello world.
              </p>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <div className="gap-4 flex flex-col items-center">
              <code className="block px-3 py-2 bg-fd-muted rounded-lg text-sm font-mono border">
                <span className="text-gray-500 select-none">$ </span>
                <span className="text-fd-accent-foreground">
                  npx shadcn@latest add snippets.thedevdavid.com/r/
                </span>
                <span className="text-fd-diff-add-symbol">[snippet-name]</span>
              </code>
              <Button className={buttonVariants({ color: "primary" })} asChild>
                <Link href="/docs">
                  Browse snippets
                  <ArrowRightIcon
                    size={16}
                    weight="duotone"
                    className="size-4"
                  />
                </Link>
              </Button>
              <p className="text-xs text-fd-muted-foreground text-center">
                Open source. MIT licensed. No catch. No BS.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
