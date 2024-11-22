import { ratelimit } from "@/config/clients";
import { hash } from "@/helpers/create-hash";

import { invariant } from "outvariant";

import type { ActionAPIContext } from "astro:actions";

type RateLimitResponse = Awaited<ReturnType<typeof ratelimit.limit>> & {
  isRateLimited: boolean;
};

export async function checkIfRateLimited(
  context: ActionAPIContext,
): Promise<RateLimitResponse> {
  const request = context.request;
  const ipAddress = context.clientAddress;

  const ip = import.meta.env.DEV
    ? "anonymous"
    : (ipAddress ?? request.headers.get("x-forwarded-for"));
  invariant(ip, "No rate limiting header found for this address!");

  const address = await hash(ip);

  const result = await ratelimit.limit(address);

  return { ...result, isRateLimited: !result.success };
}
