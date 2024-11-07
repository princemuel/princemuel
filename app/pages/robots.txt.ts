import { handler } from "@/helpers/api-handler";

const defaultAgents = ["User-agent: ChatGPT-User", "User-agent: PerplexityBot"];
const matcher = /^User-agent:.*/iu;

export const GET = handler(async () => {
  const text = await fetch("https://darkvisitors.com/robots-txt-builder", {
    signal: AbortSignal.timeout(5000),
  })
    .then((response) => (response.ok ? response.text() : ""))
    .catch(() => "");

  const agents = [
    ...new Set([
      ...defaultAgents,
      ...text.split("\n").filter((line) => matcher.test(line.trim())),
    ]),
  ];

  const robotsTxt = [
    "# I, for one, welcome our new robotic overlords",
    "User-Agent: *\nAllow: /\nDisallow: /api/",
    "# Block AI Bots",
    `${agents.map((a) => `${a}\nDisallow: /`).join("\n\n")}`,
    `Sitemap: ${new URL("/", import.meta.env.SITE).toString()}sitemap-index.html`,
  ];

  return new Response(robotsTxt.join("\n\n").trim(), {
    status: 200,
    headers: { "Content-Type": "text/plain; charset=UTF-8" },
  });
});
