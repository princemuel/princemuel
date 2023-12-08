import type { APIRoute } from "astro";

export const GET: APIRoute = (context) => {
  return new Response(`User-Agent: *\nAllow: /\n\nSitemap: ${context.site}sitemap-index.html`, {
    status: 200,
  });
};
