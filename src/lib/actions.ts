import { ipAddress } from "@vercel/edge";
import { waitUntil } from "@vercel/functions";
import type { APIContext } from "astro";
import { ActionError } from "astro:actions";
import { limitter } from "./clients";
import { createHash } from "./utils";

export const checkIsRateLimited = async (
  ctx: Pick<APIContext, "request" | "locals">,
) => {
  const ip = import.meta.env.DEV
    ? "anonymous"
    : ipAddress(ctx.request) || ctx.request.headers.get("x-forwarded-for");

  if (!ip) {
    throw new ActionError({
      code: "FORBIDDEN",
      message: "No header found for rate limiting",
    });
  }
  const id = await createHash(ip);
  const response = await limitter.limit(id);
  waitUntil(response.pending);
  return !response.success;
};

export const updateLikes = async (_: Record<string, any>) => {
  return { likes: 10 };
};
