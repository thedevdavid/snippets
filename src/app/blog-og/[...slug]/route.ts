import { generateOGImage } from "fumadocs-ui/og";
import { blog } from "@/lib/source";
import { notFound } from "next/navigation";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = blog.getPage([slug]);
  if (!page) notFound();

  return generateOGImage({
    title: page.data.title,
    description: page.data.description,
    site: "Snippets Blog",
  });
}

export function generateStaticParams() {
  return blog.generateParams().map((page) => ({
    ...page,
    slug: [...page.slug, "image.png"],
  }));
}
