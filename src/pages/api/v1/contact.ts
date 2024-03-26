import { errorMap, parseError, raise } from "@/helpers/errors";
import { formSchema } from "@/lib/form";
import type { APIRoute } from "astro";
import { Resend } from "resend";

export const POST: APIRoute = async ({ request }) => {
  try {
    const resend = new Resend(import.meta.env.RESEND_TOKEN);
    const resend_from = import.meta.env.RESEND_ADDRESS_FROM;
    const resend_to = import.meta.env.RESEND_ADDRESS_TO;

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
      from: resend_from,
      to: resend_to,
      subject: `New ${formData.type} message from ${formData.name}`,
      reply_to: formData.email,
      text: formData.message,
    });

    // console.log("📧 Email sent", { response });

    if (response.error) raise(response.error.message);

    // console.log("📧 Contact form submission successful");

    return Response.json({
      status: "success",
      message: "Thanks! Your message has been sent.",
    });
  } catch (error) {
    const message = parseError(error);
    console.error("📧 Contact form submission failed", { error: message });
    return Response.json({ status: "error", message });
  }
};

export const ALL: APIRoute = ({ request }) => {
  return Response.json(
    { status: "error", message: `${request.method} not allowed` },
    { status: 405 },
  );
};
