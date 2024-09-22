import { hash } from "@/helpers/create-hash";
import { ipAddress, waitUntil } from "@vercel/functions";
import { invariant } from "outvariant";
import { ratelimit } from "../config/clients";

type RateLimitResponse = Awaited<ReturnType<typeof ratelimit.limit>> & {
  isRateLimited: boolean;
};

export async function checkIfRateLimited(
  request: Request,
): Promise<RateLimitResponse> {
  const ip = import.meta.env.DEV
    ? "anonymous"
    : (ipAddress(request) ?? request.headers.get("x-forwarded-for"));
  invariant(ip, "No rate limiting header found for this address!");

  const ipHash = await hash(ip);
  const result = await ratelimit.limit(ipHash, { rate: 2 });
  waitUntil(result.pending);

  return { ...result, isRateLimited: !result.success };
}
