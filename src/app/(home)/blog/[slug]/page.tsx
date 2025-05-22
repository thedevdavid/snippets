import { blog } from "@/lib/source";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";
import Link from "next/link";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();
  const MDXContent = page.data.body;

  return (
    <>
      <div className="container pt-8 md:px-8">
        <Link href="/blog" className="border px-4 py-2 rounded">
          Back
        </Link>
        <h1 className="my-2 text-3xl font-bold">{page.data.title}</h1>
        <p className="mb-4">{page.data.description}</p>
      </div>

      <article className="container flex flex-col px-0 py-8 lg:flex-row lg:px-4">
        <div className="prose min-w-0 flex-1 p-4">
          <InlineTOC items={page.data.toc} />
          <MDXContent
            components={getMDXComponents({
              a: createRelativeLink(blog, page),
            })}
          />
          {/* <page.data.body components={defaultMdxComponents} /> */}
        </div>
        <div className="flex flex-col gap-4 border-l p-4 text-sm lg:w-[250px]">
          <div>
            <p className="mb-1 text-fd-muted-foreground">Written by</p>
            <p className="font-medium">{page.data.author}</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-fd-muted-foreground">At</p>
            <p className="font-medium">
              {new Date(page.data.date ?? page.file.name).toDateString()}
            </p>
          </div>
        </div>
      </article>
    </>
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
