import { WEBHOOK_SECRET } from "astro:env/server";
import { z } from "astro:schema";
import { handler } from "@/helpers/api-handler";
import { RequestError } from "@/helpers/request-error";
import { purgeCache } from "@netlify/functions";
import { isbot } from "isbot";

export const prerender = false;

const schema = z.object({ id: z.string() });

export const POST = handler(async ({ request }) => {
  if (isbot(request.headers.get("User-Agent")))
    throw RequestError.permissionDenied("This endpoint is not available for bots");

  if (request.headers.get("X-Webhook-Secret") !== WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) throw RequestError.failedPrecondition("Invalid data received");
  const result = parsed.data;

  await purgeCache({ tags: [result.id] });

  return new Response(`Revalidated entry with id ${result.id}`, {
    status: 202,
  });
});

export const ALL = handler(
  async ({ request }) =>
    new Response(`HTTP method ${request.method} not allowed`, {
      status: 405,
    }),
);
