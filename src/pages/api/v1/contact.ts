import { errorMap, parseError } from "@/helpers/errors";
import { resend } from "@/lib/clients";
import { envVars } from "@/lib/env.server";
import { formSchema } from "@/lib/form";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = formSchema.parse(
      Object.fromEntries(await request.formData()),
      { errorMap },
    );
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
  return Response.json(
    { status: "error", message: `${request.method} not allowed` },
    { status: 405 },
  );
};
