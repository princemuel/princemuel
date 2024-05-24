import type { APIRoute } from "astro";

import feedFonts from "@/styles/fonts.css?raw";
import feedStyles from "@/styles/xml-feed.css?raw";
import feedTemplate from "@/styles/xml-feed.xsl?raw";

export const GET: APIRoute = () => {
  const styles = feedTemplate
    .replace(
      "<!-- {{ styles }} -->",
      `<style>\n${feedFonts}\n${feedStyles}\n</style>`,
    )
    .replaceAll(/\t|\n/giu, "")
    .replaceAll(/\s+/giu, " ");

  return new Response(styles, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
};
