import type { APIRoute } from "astro";

const defaultAgents = ["User-agent: ChatGPT-User", "User-agent: PerplexityBot"];
const matcher = /^User-agent:.*/iu;

export const GET: APIRoute = async (ctx) => {
  const request = await fetch("https://darkvisitors.com/robots-txt-builder");
  const response = await request.text();

  const agents = [
    ...new Set([
      ...defaultAgents,
      ...response.split("\n").filter((line) => matcher.test(line.trim())),
    ]),
  ];

  const texts = [
    "# I, for one, welcome our new robotic overlords",
    "User-Agent: *\nAllow: /\nDisallow: /api/",
    "# Block AI Bots",
    `${agents.map((a) => `${a}\nDisallow: /`).join("\n\n")}`,
    `Sitemap: ${new URL("/", ctx.site).toString()}sitemap-index.html`,
  ];

  return new Response(texts.join("\n\n").trim(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=UTF-8",
    },
  });
};
