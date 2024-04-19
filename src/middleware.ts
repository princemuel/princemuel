import { geolocation, ipAddress } from "@vercel/edge";
import { defineMiddleware } from "astro:middleware";
import { envVars } from "./lib/env.server";
import { rl } from "./lib/rate-limit";

export const onRequest = defineMiddleware(async (ctx, next) => {
  const request = ctx.request;
  const pathname = new URL(request.url).pathname;
  if (pathname.startsWith("/api")) {
    const id = ipAddress(request) || request.headers.get("x-forwarded-for");

    const limit = await rl.limit(id ?? "anonymous", {
      geo: geolocation(request),
      rate: envVars.UPSTASH_LIMIT_TOKEN,
    });

    ctx.locals.vercel.edge.waitUntil(limit.pending);

    if (!limit.success)
      return Response.json(
        { status: "error", message: "Unable to process request at this time" },
        { status: 429, statusText: "Rate limit exceeded" },
      );
  }

  return next();
});
