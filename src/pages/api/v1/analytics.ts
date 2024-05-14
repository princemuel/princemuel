import { parseError } from "@/helpers";
import { db } from "@/lib/clients";
import { geolocation } from "@vercel/edge";
import type { APIRoute } from "astro";
import { z } from "zod";

export const prerender = false;

const schema = z.object({
  pathname: z.string(),
  referrer: z.string(),
  flag: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: any = await request.json();
    const geo = geolocation(request);

    const result = schema.parse({ ...body, ...geo });

    await db.analytics.create({ data: result });

    return Response.json({ status: "success", message: "" });
  } catch (error) {
    console.log(error);

    return Response.json({
      status: "error",
      message: parseError(error),
    });
  }
};

export const config = { runtime: "edge" };
