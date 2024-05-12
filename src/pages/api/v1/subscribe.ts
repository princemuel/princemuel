import { errorMap, parseError, raise } from "@/helpers";
import { resend } from "@/lib/clients";
import { envVars } from "@/lib/env.server";
import type { APIRoute } from "astro";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(1, { message: "FirstName is required" }).max(255),
  lastName: z.string().min(1, { message: "LastName is required" }).max(255),
  email: z.string().email(),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = schema.parse(
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
