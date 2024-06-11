import { ipAddress } from "@vercel/edge";
import { waitUntil } from "@vercel/functions";
import type { APIContext } from "astro";
import { limitter } from "./clients";
import { createHash } from "./utils";

export async function rate_limit(ctx: Pick<APIContext, "request" | "locals">) {
  const ip = import.meta.env.DEV
    ? "anonymous"
    : ipAddress(ctx.request) || ctx.request.headers.get("x-forwarded-for");

  if (!ip) throw new Error("No rate limiting header found or this address!");
  const id = await createHash(ip);

  const { pending, ...rest } = await limitter.limit(id, { rate: 3 });
  waitUntil(pending);

  return { ...rest, isRateLimited: !rest.success };
}

export const updateLikes = async (_: Record<string, any>) => {
  return { likes: 10 };
};
