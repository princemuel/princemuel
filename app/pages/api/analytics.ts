import { handler } from "@/helpers/api-handler";
import { RequestError } from "@/helpers/errors";
import { PUBLIC_SITE_URL } from "astro:env/client";
import { z } from "astro:schema";
import { isbot } from "isbot";

export const prerender = false;

const schema = z.object({
  url: z.string(),
  referrer: z.string(),
  flag: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
});

export const POST = handler(async ({ request }) => {
  if (isbot(request.headers.get("User-Agent")))
    throw RequestError.permissionDenied(
      "This endpoint is not available for bots",
    );

  const response = await Promise.all([
    request.json(),
    fetch(new URL("geolocation", PUBLIC_SITE_URL)),
  ]);

  const parsed = schema.safeParse(Object.assign({}, ...response));
  if (!parsed.success)
    throw RequestError.failedPrecondition(parsed.error.message);

  // await db.analytics.create({ data: parsed.data });
  return Response.json({
    ok: true,
    payload: "Analytics data sent successfully",
  });
});

export const ALL = handler(
  async ({ request }) =>
    new Response(`HTTP method ${request.method} not allowed`, {
      status: 405,
    }),
);
