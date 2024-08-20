import type { APIRoute } from "astro";

const defaultAgents = ["User-agent: ChatGPT-User", "User-agent: PerplexityBot"];
const matcher = /^User-agent:.*/iu;

export const GET: APIRoute = async (ctx) => {
	try {
		const text = await fetch(
			"https://darkvisitors.com/robots-txt-builder",
		).then((response) => response.text());

		const agents = [
			...new Set([
				...defaultAgents,
				...text.split("\n").filter((line) => matcher.test(line.trim())),
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
			headers: { "Content-Type": "text/plain; charset=UTF-8" },
		});
	} catch (error) {
		const texts = [
			"# I, for one, welcome our new robotic overlords",
			"User-Agent: *\nAllow: /\nDisallow: /api/",
			"# Block AI Bots",
			`${defaultAgents.map((a) => `${a}\nDisallow: /`).join("\n\n")}`,
			`Sitemap: ${new URL("/", ctx.site).toString()}sitemap-index.html`,
		];
		return new Response(texts.join("\n\n").trim(), {
			status: 200,
			headers: { "Content-Type": "text/plain; charset=UTF-8" },
		});
	}
};
