import { blog } from "@/lib/source";
import Link from "next/link";

export default function BlogPage() {
  const posts = blog.getPages();

  return (
    <main className="min-h-screen px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold">Snippets blog</h1>
        </header>

        <p className="mb-6 text-sm text-fd-muted-foreground">
          Details about building and using the snippets.
        </p>

        <section>
          <div className="space-y-6">
            {posts.slice(0, 4).map((post) => (
              <article key={post.url}>
                <Link href={post.url} className="group block">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="mb-1 text-sm font-medium group-hover:text-fd-primary">
                        {post.data.title}
                      </h3>
                      <p className="text-xs text-fd-muted-foreground">
                        {post.data.description}
                      </p>
                    </div>
                    <time className="shrink-0 text-xs text-fd-muted-foreground">
                      {new Date(
                        post.data.date ?? post.file.name
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
