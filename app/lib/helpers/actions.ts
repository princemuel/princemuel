import { createHash } from "@/shared/helpers/create-hash";
import { raise } from "@/shared/utils";
import { ipAddress } from "@vercel/edge";
import { waitUntil } from "@vercel/functions";
import type { APIContext } from "astro";
import { limitter } from "../config/clients";

export async function rate_limit(ctx: Pick<APIContext, "request" | "locals">) {
  const ip = import.meta.env.DEV
    ? "anonymous"
    : (ipAddress(ctx.request) ?? ctx.request.headers.get("x-forwarded-for"));

  if (!ip) raise("No rate limiting header found or this address!");
  const id = await createHash(ip);

  const { pending, ...rest } = await limitter.limit(id, { rate: 3 });
  waitUntil(pending);

  return { ...rest, isRateLimited: !rest.success };
}

export const updateLikes = async (_: Record<string, any>) => {
  return { likes: 10 };
};

type CallbackAction<T> = (request: Request) => Promise<T>;
type ActionReturnType<T> = Promise<{ response?: Response; result?: T }>;

export const action = async <T>(
  request: Request,
  callback: CallbackAction<T>,
): ActionReturnType<T> => {
  if (request.method === "POST") {
    const isClientRequest =
      request.headers.get("accept") === "application/json";

    const result = await callback(request);
    if (!isClientRequest) return { result };

    return { response: Response.json(result), result };
  }

  return { result: undefined };
};
