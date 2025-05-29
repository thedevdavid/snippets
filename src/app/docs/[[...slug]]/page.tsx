import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";
import { Rate } from "@/components/rate";
import posthog from "posthog-js";
import { getGithubLastEdit } from "fumadocs-core/server";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;
  const lastModified = page.data.lastModified
    ? new Date(page.data.lastModified).toLocaleDateString()
    : undefined;

  const time = await getGithubLastEdit({
    owner: "thedevdavid",
    repo: "snippets",
    path: `content/docs/${page.file.path}`,
    token: process.env.GITHUB_TOKEN,
  });

  const lastUpdate = time ? new Date(time).toLocaleDateString() : undefined;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full} lastUpdate={lastUpdate}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        {/* <EditOnGitHub
          href={`https://github.com/thedevdavid/snippets/edit/main/content/docs/${page.file.path}`}
        /> */}
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
        <Rate
          onRateAction={async (url, feedback) => {
            "use server";
            await posthog.capture("on_rate_docs", feedback);
          }}
        />
        {lastModified && (
          <p className="text-sm text-gray-500">Last updated: {lastModified}</p>
        )}
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
  const image = ["/docs-og", ...slug, "image.png"].join("/");
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
