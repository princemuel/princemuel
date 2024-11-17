import { published_date } from "@/config/settings";
import { handler } from "@/helpers/api-handler";
import { convertTime } from "@/utilities/time";

import { getImage } from "astro:assets";
import { getCollection, getEntry } from "astro:content";

import rss from "@astrojs/rss";
import { marked as mkd } from "marked";

import type { RSSFeedItem } from "@astrojs/rss";

export const GET = handler(async (ctx) => {
  const [author, collection] = await Promise.all([
    getEntry("authors", "princemuel"),
    getCollection("posts", ({ data }) => !(import.meta.env.PROD && data.draft)),
    getCollection("projects", ({ data }) => !(import.meta.env.PROD && data.draft)),
    getCollection("posts", ({ data }) => !(import.meta.env.PROD && data.draft)),
  ]);

  const results = (collection ?? []).map(async (item) => {
    const [author, img] = await Promise.all([
      getEntry(item.data.author),
      item?.data?.media?.cover &&
        getImage({ src: item?.data?.media?.cover?.src, format: "png" }),
    ]);

    return {
      title: item.data.title,
      description: item.data.description,
      content: mkd(item.body, { gfm: true, breaks: true }),
      enclosure: img && {
        length: 0,
        url: new URL(img.src, ctx.site).toString(),
        type: "image/png",
      },
      pubDate: item.data.publishedAt,
      author: `${author.data.links.email} (${author.data.name})`,
      link: new URL(`/${item.collection}/${item.id}`, import.meta.env.SITE).toString(),
      commentsUrl: "https://github.com/princemuel/princemuel.com/discussions",
    } as RSSFeedItem;
  });

  //https://openlibrary.org/developers/api
  return rss({
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    title: `${author.data.name}'s RSS Feed`,
    description:
      "My Personal Website scaffolded with Astro. If you subscribe to this RSS feed, you will receive updates and summaries of all relevant data on my site",
    site: new URL("/", import.meta.env.SITE),
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
      <atom:link href="${new URL("/rss.xml", import.meta.env.SITE)}" rel="self" type="application/rss+xml"/>
    `,
    stylesheet: false,
  });
});
