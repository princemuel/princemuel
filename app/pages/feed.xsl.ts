import feedStyles from "@/assets/styles/xml-feed.css?raw";
import feedTemplate from "@/assets/styles/xml-feed.xsl?raw";
import { handler } from "@/helpers/api-handler";

export const GET = handler(() => {
  const styles = feedTemplate
    .replace("<!-- {{ styles }} -->", `<style>\n${feedStyles}\n</style>`)
    .replaceAll(/\t|\n/giu, "")
    .replaceAll(/\s+/giu, " ");

  return new Response(styles, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
});
