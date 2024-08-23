import { resend } from "@/lib/config/clients";
import { envVars } from "@/lib/config/environment";
import { checkIfRateLimited } from "@/lib/helpers/rate-limit";
import { contactSchema } from "@/lib/schema/forms";
import { parseError } from "@/shared/utils";
import { ZodError } from "zod";

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { isRateLimited, remaining, reset, limit } =
      await checkIfRateLimited(request);

    if (isRateLimited)
      return new Response("You have reached your request limit for the day.", {
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
        status: 429,
        statusText: "Rate limit exceeded",
      });

    const formData = contactSchema.parse(await request.json());
    // console.log("📧 Contact form submission", formData);

    // const data = await resend.emails.send({
    //   from: `${body.name} <onboarding@resend.dev>`,
    //   to: ["delivered@resend.dev"],
    //   subject: body.message,
    //   react: EmailTemplate({ ...body }),
    // });

    const response = await resend.emails.send({
      from: `${formData.firstName} <${formData.email}>`,
      to: envVars.RESEND_ADDRESS,
      subject: `New ${formData.type} email from ${formData.firstName} ${formData.lastName}`,
      replyTo: envVars.RESEND_ADDRESS,
      text: formData.message,
    });

    // console.log("📧 Email sent", { response });

    if (response.error)
      return Response.json(
        {
          success: false,
          message: response.error.message,
        },
        { statusText: response.error.name },
      );

    // console.log("📧 Contact form submission successful");

    return Response.json({
      success: true,
      message: "Thanks! Your message has been sent.",
    });
  } catch (e) {
    const message =
      e instanceof ZodError ? "Invalid Submission" : parseError(e);
    console.log("📧 Contact form submission failed", { error: message });
    return Response.json({ success: false, message: message }, { status: 400 });
  }
};

export const ALL: APIRoute = ({ request }) =>
  new Response(` Request method ${request.method} not allowed`, {
    status: 405,
  });
