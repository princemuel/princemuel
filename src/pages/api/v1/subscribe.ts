import { errorMap, parseError, raise } from "@/helpers";
import { resend } from "@/lib/clients";
import { envVars } from "@/lib/env.server";
import { subscribeSchema } from "@/schema";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = subscribeSchema.parse(
      Object.fromEntries(await request.formData()),
      { errorMap },
    );

    const response = await resend.contacts.create({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      unsubscribed: false,
      audienceId: envVars.RESEND_AUDIENCE,
    });

    if (response.error) raise(response.error.message);

    return Response.json({
      status: "success",
      message: "Subscribed!",
    });
  } catch (error) {
    return Response.json({ status: "error", message: parseError(error) });
  }
};

export const ALL: APIRoute = ({ request }) => {
  return Response.json(
    { status: "error", message: `${request.method} not allowed` },
    { status: 405 },
  );
};
