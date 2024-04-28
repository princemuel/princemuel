import { calcTimeUnits } from "@/helpers";
import {} from "@vercel/edge";
import type { APIRoute } from "astro";

const defaultAgents = ["User-agent: ChatGPT-User", "User-agent: PerplexityBot"];
const matcher = /^User-agent:.*/iu;

export const GET: APIRoute = async (ctx) => {
  const request = await fetch("https://darkvisitors.com/robots-txt-builder");
  const response = await request.text();

  const agents = [
    ...new Set([
      ...response.split("\n").filter((line) => matcher.test(line.trim())),
      ...defaultAgents,
    ]),
  ];

  const text = `# I, for one, welcome our new robotic overlords\n\nUser-Agent: *\nAllow: /\nDisallow: /api/\n\n# Block AI Bots\n\n${agents.map((agent) => `${agent}\nDisallow: /`).join("\n\n")}\n\nSitemap: ${new URL("/", ctx.site).toString()}sitemap-index.html`;

  return new Response(text, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=UTF-8",
      "Cache-Control": `public, max-age=${calcTimeUnits(7).secs}, s-max-age=${calcTimeUnits(7).secs}, stale-while-revalidate=${calcTimeUnits(1).secs}`,
    },
  });
};
