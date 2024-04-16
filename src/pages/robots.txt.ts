import type { APIRoute } from "astro";

export const GET: APIRoute = (ctx) => {
  const text = `# I, for one, welcome our new robotic overlords\n\nUser-Agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${new URL("/", ctx.site).toString()}sitemap-index.html`;

  return new Response(text, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control":
        "public, max-age=604800, s-max-age=604800,stale-while-revalidate=86400",
    },
  });
};
