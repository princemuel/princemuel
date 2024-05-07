import { parseError } from "@/helpers/errors";
import { resend } from "@/lib/clients";
import { envVars } from "@/lib/env.server";
import { rate_limit } from "@/lib/rate-limit";
import { contactSchema } from "@/schema";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const { success, limit, reset, remaining } = await rate_limit(request, locals);

    if (!success)
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
      reply_to: envVars.RESEND_ADDRESS,
      text: formData.message,
    });

    // console.log("📧 Email sent", { response });

    if (response.error)
      return Response.json(
        {
          status: "error",
          message: response.error.message,
        },
        { statusText: response.error.name },
      );

    // console.log("📧 Contact form submission successful");

    return Response.json({
      status: "success",
      message: "Thanks! Your message has been sent.",
    });
  } catch (error) {
    const message = parseError(error);
    console.error("📧 Contact form submission failed", { error: message });
    return Response.json({ status: "error", message }, { status: 400 });
  }
};

export const ALL: APIRoute = ({ request }) => {
  return Response.json({ status: "error", message: `${request.method} not allowed` }, { status: 405 });
};
