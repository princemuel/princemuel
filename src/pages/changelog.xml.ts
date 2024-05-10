import DefaultImage from "@/assets/images/placeholder.avif";
import { convertTime } from "@/helpers";
import rss, { type RSSFeedItem } from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getImage } from "astro:assets";
import { getCollection, getEntry } from "astro:content";
import { marked as mkd } from "marked";

export const GET: APIRoute = async (ctx) => {
  const baseUrl = new URL("/", ctx.site).toString();
  const [author, collection] = await Promise.all([
    getEntry("authors", "princemuel"),
    getCollection("changelog"),
  ]);

  const results = (collection ?? []).map(async (item) => {
    const author = await getEntry(item.data.author);
    return {
      title: `${item.data.version}(${item.data.title})`,
      description: item.data.description,
      content: await mkd(item.body, { gfm: true, breaks: true, async: true }),
      pubDate: item.data.publishedAt,
      author: author.data.links.email,
      link: new URL(`/changelog.xml#${item.data.version}`, baseUrl).toString(),
      commentsUrl: "https://github.com/princemuel/princemuel.com/discussions",
    } as RSSFeedItem;
  });
  const image = await getImage({ src: DefaultImage });

  return rss({
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      media: "http://search.yahoo.com/mrss/",
      dc: "http://purl.org/dc/elements/1.1/",
    },
    title: `${author.data.name}'s Site Changelog`,
    description: `Changelog (Version History) for ${author.data.name}\` Website, containing all recent changes.`,
    site: new URL("/", baseUrl),
    items: await Promise.all(results),
    trailingSlash: true,
    customData: `
    <atom:link href="${new URL("/changelog.xml", baseUrl)}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/"/>
    <language>en-US</language>
		<image>
			<url>${new URL(image.src, baseUrl).toString()}</url>
			<title>${author.data.name}'s Website Changelog</title>
			<description>
        Changelog (Version History) for ${author.data.name}'s Website, containing all recent changes.
      </description>
      <link>${new URL("/changelog.xml", baseUrl).toString()}/</link>
			<width>142</width>
			<height>116</height>
		</image>
    <managingEditor>${author.data.name}</managingEditor>
    <webMaster>${author.data.name}</webMaster>
    <dc:creator>${author.data.name}</dc:creator>
    <language>en-US</language>
    <generator>${ctx.generator}</generator>
    <ttl>${convertTime(7).mins}</ttl>
    <lastBuildDate>${new Date().toISOString()}</lastBuildDate>`,
    // stylesheet: "/feed.xsl",
  });
};
