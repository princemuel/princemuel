import { errorMap, parseError, raise } from "@/helpers";
import type { APIRoute } from "astro";
import { Resend } from "resend";
import { z } from "zod";

const formSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const resend = new Resend(import.meta.env.RESEND_TOKEN);
    const resend_audience_id = import.meta.env.RESEND_AUDIENCE_ID;

    const formData = formSchema.parse(
      Object.fromEntries(await request.formData()),
      { errorMap },
    );

    const response = await resend.contacts.create({
      email: formData.email,
      unsubscribed: false,
      audienceId: resend_audience_id,
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
