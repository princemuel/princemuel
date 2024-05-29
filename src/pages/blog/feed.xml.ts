import { convertTime } from "@/helpers";
import { published_date } from "@/lib/config";
import { fetchResource } from "@/lib/utils";
import rss, { type RSSFeedItem } from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getEntries, getEntry } from "astro:content";

export const GET: APIRoute = async (ctx) => {
  const baseUrl = new URL("/", ctx.site).toString();
  const [author, collection] = await Promise.all([
    getEntry("authors", "princemuel"),
    fetchResource("posts"),
  ]);

  const results = (collection ?? []).map(async (item) => {
    const author = await getEntry(item.data.author);

    const keywords = await getEntries(item.data.keywords);

    return {
      title: item.data.title,
      description: item.data.description,
      categories: keywords.map((item) => item.data.title),
      pubDate: item.data.publishedAt,
      author: `${author.data.links.email} (${author.data.name})`,
      link: new URL(`/blog/${item.slug}`, baseUrl).toString(),
      commentsUrl: "https://github.com/princemuel/princemuel.com/discussions",
      customData: `<slug>${item.slug}</slug>`,
    } as RSSFeedItem;
  });

  //https://openlibrary.org/developers/api
  return rss({
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    title: `${author.data.name}'s Blog Feed`,
    description: `My Personal Website scaffolded with Astro. If you subscribe to this RSS feed, you will receive updates and summaries of my new posts`,
    site: new URL("/", baseUrl),
    items: await Promise.all(results),
    trailingSlash: true,
    customData: `
    <language>en-us</language>
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
    <atom:link href="${new URL("/blog/feed.xml", baseUrl)}" rel="self" type="application/rss+xml"/>
    `,
    stylesheet: "/feed.xsl",
  });
};
