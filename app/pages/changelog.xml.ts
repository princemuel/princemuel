import { published_date } from "@/lib/config/site";
import { asyncPool, convertTime, normalize } from "@/shared/utils";
import rss, { type RSSFeedItem } from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";
import { marked as mkd } from "marked";

export const GET: APIRoute = async (ctx) => {
  const baseUrl = new URL("/", ctx.site).toString();
  const [author, collection] = await Promise.all([
    getEntry("authors", "princemuel"),
    getCollection("changelog"),
  ]);

  const results = asyncPool(collection, 20, async (item) => {
    const author = await getEntry(item.data.author);

    return {
      title: `v${item.data.version}`,
      description: item.data.description,
      content: await mkd(item.body, { gfm: true, breaks: true, async: true }),
      pubDate: item.data.publishedAt,
      author: `${author.data.links.email} (${author.data.name})`,
      link: new URL(
        `/changelog.xml#v${normalize(item.data.version)}`,
        baseUrl,
      ).toString(),
      commentsUrl: "https://github.com/princemuel/princemuel.com/discussions",
      customData: `
        <slug>v${normalize(item.data.version)}</slug>
        <lead>v${normalize(`${item.data.version}-lead`)}</lead>
      `,
    } as RSSFeedItem;
  });

  return rss({
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    title: `${author.data.name}'s Site Changelog`,
    description: `Version History for ${author.data.name}'s Website, containing all the recent changes.`,
    site: new URL("/", baseUrl),
    items: await results,
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
    <atom:link href="${new URL("/changelog.xml", baseUrl)}" rel="self" type="application/rss+xml"/>
    `,
    stylesheet: "/feed.xsl",
  });
};
