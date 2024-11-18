import { getCollection, getEntry } from "astro:content";

import { published_date } from "@/config/settings";
import { handler } from "@/helpers/api-handler";
import { convertTime } from "@/utilities/time";

import rss from "@astrojs/rss";

import type { RSSFeedItem } from "@astrojs/rss";

export const GET = handler(async (ctx) => {
  const [author, collection] = await Promise.all([
    getEntry("authors", "princemuel"),
    getCollection("posts", ({ data }) => !(import.meta.env.PROD && data.draft)),
  ]);

  const results = (collection ?? []).map(async (item) => {
    const author = await getEntry(item.data.author);

    return {
      title: item.data.title,
      description: item.data.description,
      categories: [...new Set(item.data.tags)],
      pubDate: item.data.publishedAt,
      author: `${author.data.links.email} (${author.data.name})`,
      link: new URL(`/blog/${item.id}`, ctx.site).toString(),
      commentsUrl: "https://github.com/princemuel/princemuel.com/discussions",
    } as RSSFeedItem;
  });

  //https://openlibrary.org/developers/api
  return rss({
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    title: `${author.data.name}'s Blog Feed`,
    description:
      "My Personal Website scaffolded with Astro. If you subscribe to this RSS feed, you will receive updates and summaries of my new posts",
    site: new URL("/", ctx.site),
    items: await Promise.all(results),
    trailingSlash: true,
    customData: `
      <language>en-US</language>
      <pubDate>${published_date.toUTCString()}</pubDate>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <docs>${new URL("rss-specification", "https://www.rssboard.org/")}</docs>
      <generator>${ctx.generator}</generator>
      <managingEditor>
        ${author.data.links.email} (${author.data.name})
      </managingEditor>
      <webMaster>${author.data.links.email} (${author.data.name})</webMaster>
      <copyright>Copyright 2024 ${author.data.name}</copyright>
      <ttl>${convertTime(7).mins}</ttl>
      <atom:link href="${new URL("/blog/feed.xml", ctx.site)}" rel="self" type="application/rss+xml"/>
    `,
    stylesheet: false,
  });
});
