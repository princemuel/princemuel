import { published_date } from "@/config/settings";
import { handler } from "@/helpers/api-handler";
import { normalize } from "@/utilities/strings";
import { timeToUnits } from "@/utilities/time";

import { getCollection, getEntry } from "astro:content";

import rss from "@astrojs/rss";

import { marked } from "marked";

import type { RSSFeedItem } from "@astrojs/rss";

export const GET = handler(async (ctx) => {
  const [author, collection] = await Promise.all([
    getEntry("authors", "princemuel"),
    getCollection("changelog"),
  ]);

  const results = (collection ?? []).map(async (item) => {
    const author = await getEntry(item.data.author);
    return {
      title: `v${item.data.version}`,
      description: item.data.description,
      content: marked(item.body ?? "", { gfm: true, breaks: true }),
      pubDate: item.data.publishedAt,
      author: `${author.data.links.email} (${author.data.name})`,
      link: new URL(
        `/changelog.xml#v${normalize(item.data.version)}`,
        ctx.site,
      ).toString(),
      commentsUrl: "https://github.com/princemuel/princemuel.com/discussions",
    } as RSSFeedItem;
  });

  return rss({
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    title: `${author.data.name}'s Site Changelog`,
    description: `Version History for ${author.data.name}'s Website, containing all the recent changes.`,
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
      <ttl>${timeToUnits(7).mins}</ttl>
      <atom:link href="${new URL("/changelog.xml", ctx.site)}" rel="self" type="application/rss+xml"/>
    `,
    stylesheet: false,
  });
});
