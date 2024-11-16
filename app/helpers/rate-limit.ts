import { hash } from "@/helpers/create-hash";
import { ratelimit } from "../config/clients";

import { invariant } from "outvariant";

type RateLimitResponse = Awaited<ReturnType<typeof ratelimit.limit>> & {
  isRateLimited: boolean;
};

export async function checkIfRateLimited(
  request: Request,
  ipAddress?: string,
): Promise<RateLimitResponse> {
  const ip = import.meta.env.DEV
    ? "anonymous"
    : (ipAddress ?? request.headers.get("x-forwarded-for"));
  invariant(ip, "No rate limiting header found for this address!");

  const ipHash = await hash(ip);

  const result = await ratelimit.limit(ipHash, { rate: 2 });

  return { ...result, isRateLimited: !result.success };
}
