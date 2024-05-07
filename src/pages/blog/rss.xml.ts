import { convertTime } from "@/helpers";
import { fetchResource } from "@/lib/utils";
import rss, { type RSSFeedItem } from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { marked as mkd } from "marked";

export const GET: APIRoute = async (ctx) => {
  const baseUrl = new URL("/blog", ctx.site).toString();
  const [author, collection] = await Promise.all([
    getEntry("authors", "princemuel"),
    fetchResource("posts"),
  ]);

  const results = (collection ?? []).map(async (item) => {
    const author = await getEntry(item.data.author);
    return {
      title: item.data.title,
      description: item.data.description,
      content: await mkd(item.body, { gfm: true, breaks: true, async: true }),
      categories: item.data.tags,
      pubDate: item.data.publishedAt,
      author: author.data.links.email,
      link: new URL(`/${item.slug}`, baseUrl).toString(),
      commentsUrl: "https://github.com/princemuel/princemuel.com/discussions",
      enclosure: {
        url: new URL(item.data.media?.cover?.src || "", baseUrl).toString(),
        type: `image/${item.data.media?.cover?.format}`,
        length: 0,
      },
      customData: `
      <media:content
        url="${new URL(item.data.media?.cover?.src || "", baseUrl).toString()}"
        type="image/${item.data.media?.cover?.format}"
        width="${item.data.media?.cover?.width ?? "512"}"
        height="${item.data.media?.cover?.height ?? "512"}"
        medium="image"
      />
      <media:description type="plain">
        ${item.data.media?.coverAlt ?? ""}
      </media:description>
  `,
    } as RSSFeedItem;
  });

  //https://openlibrary.org/developers/api
  return rss({
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      media: "http://search.yahoo.com/mrss/",
      dc: "http://purl.org/dc/elements/1.1/",
    },
    title: `${author.data.name}'s Blog RSS Feed`,
    description: `${author.data.name}'s Personal Website scaffolded with Astro. If you subscribe to this RSS feed, you will receive updates and summaries of ${author.data.name}'s new posts`,
    site: new URL("/", baseUrl),
    items: await Promise.all(results),
    customData: `
    <atom:link href="${new URL("/rss.xml", baseUrl)}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/"/>
    <image>
      <url>${new URL("/blogimage_src", baseUrl).toString()}</url>
      <title>${author.data.name}'s Blog RSS Feed</title>
      <description>
        ${author.data.name}'s Personal Website scaffolded with Astro. If you subscribe to this RSS feed, you will receive updates and summaries of ${author.data.name}'s new posts
      </description>
      <link>${baseUrl}</link>
      <width>142</width>
      <height>116</height>
    </image>
    <managingEditor>${author}</managingEditor>
    <webMaster>${author}</webMaster>
    <dc:creator>${author}</dc:creator>
    <language>en-US</language>
    <generator>${ctx.generator}</generator>
    <ttl>${convertTime(7).mins}</ttl>
    <lastBuildDate>${new Date().toISOString()}</lastBuildDate>`,
    stylesheet: "/static/media/styles.xsl",
  });
};
