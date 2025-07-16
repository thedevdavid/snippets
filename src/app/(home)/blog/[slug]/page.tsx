import { blog } from "@/lib/source";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";
import Link from "next/link";
import {
  ClockIcon,
  HouseSimpleIcon,
  CaretRightIcon,
} from "@phosphor-icons/react/ssr";
import { BackToTop } from "@/components/back-to-top";
import { ShareButtons } from "@/components/share-buttons";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();
  const MDXContent = page.data.body;

  // Calculate reading time (using 200 wpm)
  const content = MDXContent.toString() || "";
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen">
      <article className="mx-auto max-w-5xl px-4 py-6">
        <nav className="mb-6 flex items-center space-x-1 text-xs text-fd-muted-foreground">
          <Link href="/" className="hover:text-fd-foreground">
            <HouseSimpleIcon size={12} weight="duotone" className="size-3" />
          </Link>
          <CaretRightIcon size={12} weight="duotone" className="size-3" />
          <Link href="/blog" className="hover:text-fd-foreground">
            Blog
          </Link>
        </nav>

        <h1 className="mb-4 text-2xl font-bold md:text-3xl lg:text-4xl">
          {page.data.title}
        </h1>

        <div className="mb-6 flex items-center gap-3 text-xs text-fd-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="font-medium text-fd-foreground">
              {page.data.author || "thedevdavid"}
            </span>
          </div>
          <span>
            on{" "}
            {new Date(page.data.date ?? page.file.name).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </span>
          <span className="flex items-center gap-1">
            <ClockIcon size={12} weight="duotone" className="size-3" />
            {readingTime} min. read
          </span>
        </div>

        <hr className="mb-6" />

        <div className="relative grid grid-cols-12 gap-6 lg:grid">
          <div className="col-span-12 lg:col-span-8">
            <div className="prose prose-sm prose-neutral max-w-none dark:prose-invert">
              <MDXContent
                components={getMDXComponents({
                  a: createRelativeLink(blog, page),
                })}
              />
            </div>
          </div>

          <aside className="sticky top-32 col-span-3 col-start-10 hidden h-fit lg:block">
            <div className="space-y-6">
              {page.data.toc && page.data.toc.length > 0 && (
                <div>
                  <h3 className="mb-3 text-base font-semibold">On this page</h3>
                  <nav className="space-y-2">
                    {page.data.toc.map((item) => (
                      <Link
                        key={item.url}
                        href={item.url}
                        className="block text-xs text-fd-muted-foreground hover:text-fd-foreground"
                        style={{ paddingLeft: `${(item.depth - 2) * 12}px` }}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              )}

              <div>
                <ShareButtons
                  title={page.data.title}
                  url={`https://snippets.thedevdavid.com/blog/${page.slugs[0]}`}
                />
              </div>

              <div className="pt-8">
                <BackToTop />
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = blog.getPage([slug]);
  if (!page) notFound();

  const image = ["/blog-og", slug, "image.png"].join("/");

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      images: image,
    },
  };
}
