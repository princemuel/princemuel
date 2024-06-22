import { resend } from "@/lib/config/clients";
import { envVars } from "@/lib/config/environment";
import { rate_limit } from "@/lib/helpers/actions";
import { contactSchema } from "@/lib/schema/forms";
import { parseError } from "@/shared/utils";
import type { APIRoute } from "astro";
import { ZodError } from "zod";

export const POST: APIRoute = async (ctx) => {
  try {
    const { isRateLimited } = await rate_limit(ctx);

    if (isRateLimited)
      return new Response("You have reached your request limit for the day.", {
        // headers: {
        //   "X-RateLimit-Limit": limit.toString(),
        //   "X-RateLimit-Remaining": remaining.toString(),
        //   "X-RateLimit-Reset": reset.toString(),
        // },
        status: 429,
        statusText: "Rate limit exceeded",
      });

    const formData = contactSchema.parse(await ctx.request.json());
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
