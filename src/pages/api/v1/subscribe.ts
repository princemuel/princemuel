import { parseError, raise } from "@/helpers";
import { resend } from "@/lib/clients";
import { envVars } from "@/lib/env.server";
import type { APIRoute } from "astro";
import { isbot } from "isbot";
import { ZodError, z } from "zod";

const schema = z.object({
  honeypot: z.string().max(0, "Invalid submission detected.").optional(),
  email: z.string().email(),
});

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    if (isbot(request.headers.get("User-Agent")))
      raise("Invalid submission detected.");

    const body = (await request.json()) as any;
    const formData = schema.parse(body);

    const response = await resend.contacts.create({
      email: formData.email,
      unsubscribed: false,
      audienceId: envVars.RESEND_AUDIENCE,
    });

    if (response.error) raise(response.error.message);

    return Response.json({
      status: "success",
      message: "Subscribed!",
    });
  } catch (e) {
    const message =
      e instanceof ZodError ? "Invalid Submission" : parseError(e);
    return Response.json(
      { status: "error", message: message },
      { status: 400 },
    );
  }
};

export const ALL: APIRoute = ({ request }) =>
  new Response(` Request method ${request.method} not allowed`, {
    status: 405,
  });
