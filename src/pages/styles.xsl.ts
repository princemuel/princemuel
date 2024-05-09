import type { APIRoute } from "astro";

import cssBase from "@/styles/base.css?raw";
import feedXsl from "@/styles/feed.xsl?raw";
import cssFonts from "@/styles/fonts.css?raw";
import cssVars from "@/styles/vars.css?raw";
import cssXmlFeed from "@/styles/xml-feed.css?raw";

export const GET: APIRoute = () => {
  const feedStyles = feedXsl
    .replace(
      "<!-- {{ styles }} -->",
      `<style>\n${cssVars}\n${cssFonts}\n${cssBase}\n${cssXmlFeed}\n</style>`,
    )
    .replaceAll(/\t|\n/giu, "")
    .replaceAll(/\s+/giu, " ");

  return new Response(feedStyles, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Content-Disposition": "inline",
      "Cache-Control":
        "public, max-age=604800, s-max-age=604800,stale-while-revalidate=86400",
    },
  });
};
