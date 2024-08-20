import { z } from "astro:content";
import { checkIfRateLimited } from "@/lib/helpers/rate-limit";
import { parseError } from "@/shared/utils";
import { geolocation } from "@vercel/edge";
import type { APIContext, APIRoute } from "astro";
import { isbot } from "isbot";
import { invariant } from "outvariant";

export const prerender = false;

const schema = z.object({
	name: z.string(),
	version: z.string(),
	pathname: z.string(),
	referrer: z.string(),

	flag: z.string().optional(),
	city: z.string().optional(),
	country: z.string().optional(),
	latitude: z.number().optional(),
	longitude: z.number().optional(),
});

export const POST: APIRoute = async ({ request }) => {
	try {
		invariant(!isbot(request.headers.get("User-Agent")), "Invalid Request.");

		const { isRateLimited, remaining, reset, limit } =
			await checkIfRateLimited(request);

		if (isRateLimited)
			return new Response("You have reached your request limit for the day.", {
				headers: {
					"X-RateLimit-Limit": limit.toString(),
					"X-RateLimit-Remaining": remaining.toString(),
					"X-RateLimit-Reset": reset.toString(),
				},
				status: 429,
				statusText: "Rate limit exceeded",
			});

		const result = await Promise.all([request.json(), geolocation(request)]);

		console.log(...result);

		// await db.analytics.create({ data:  });

		return Response.json({ success: true, payload: "Request sent" });
	} catch (e) {
		return Response.json(
			{ success: false, payload: parseError(e) },
			{ status: 400 },
		);
	}
};

export async function ALL({ request }: APIContext) {
	return new Response(`HTTP method ${request.method} not allowed`, {
		status: 405,
	});
}
