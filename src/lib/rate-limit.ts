import { ipAddress } from "@vercel/edge";
import { rl } from "./clients";

type RateLimitFunction = (
  request: Request,
  locals: App.Locals,
) => ReturnType<typeof rl.limit>;

export const rate_limit: RateLimitFunction = async (request, locals) => {
  const ip =
    ipAddress(request) || request.headers.get("x-forwarded-for") || "anonymous";

  const response = await rl.limit(`ratelimit_${ip}`);
  locals.vercel.edge.waitUntil(response.pending);

  return response;
};

// console.error(`Error in /api PUT method: ${error as string}`);
