import type { APIRoute } from "astro";

export const GET: APIRoute = (context) => {
  const body = `# I, for one, welcome our new robotic overlords\n\nUser-Agent: *\nAllow: /\nDisallow: /private/\n\nSitemap: ${new URL("/", context.site).toString()}sitemap-index.html`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=604800, s-max-age=604800,stale-while-revalidate=86400",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,OPTIONS,HEAD",
      "Access-Control-Allow-Headers":
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, If-Modified-Since, X-Api-Version",
    },
  });
};
