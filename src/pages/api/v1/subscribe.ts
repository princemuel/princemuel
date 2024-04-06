import { errorMap, parseError, raise } from "@/helpers";
import { resend } from "@/lib/clients";
import { envVars } from "@/lib/env.server";
import type { APIRoute } from "astro";
import { z } from "zod";

const formSchema = z.object({
  firstName: z
    .string({ required_error: "FirstName is required" })
    .min(1)
    .max(255),
  lastName: z
    .string({ required_error: "LastName is required" })
    .min(1)
    .max(255),
  email: z.string({ required_error: "Email is required" }).email(),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = formSchema.parse(
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
