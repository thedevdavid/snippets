import { Feed } from "feed";
import { blog } from "@/lib/source";
import { NextResponse } from "next/server";

export const revalidate = false;

export function GET() {
  const feed = new Feed({
    title: "Snippets Blog",
    id: "https://snippets.thedevdavid.com",
    link: "https://snippets.thedevdavid.com",
    language: "en",

    image: "https://snippets.thedevdavid.com/banner.png",
    favicon: "https://snippets.thedevdavid.com/icon.png",
    copyright: "All rights reserved 2025, @thedevdavid",
  });

  for (const page of blog.getPages()) {
    feed.addItem({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      link: page.url,
      date: new Date(page.data.date ?? Date.now()),

      author: [
        {
          name: page.data.author,
        },
      ],
    });
  }

  return new NextResponse(feed.rss2());
}
