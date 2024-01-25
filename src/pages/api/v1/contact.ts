import { ContactFormSchema } from "@/lib/schema";
import { parse } from "@conform-to/zod";
import type { APIRoute } from "astro";
// import { Resend } from "resend";

// const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const submission = parse(formData, { schema: ContactFormSchema });

    if (submission.intent !== "submit") {
      return Response.json({ status: "idle", submission } as const);
    }
    if (!submission.value) {
      return Response.json({ status: "error", submission } as const, { status: 400 });
    }

    const body = submission.value;

    // const data = await resend.emails.send({
    //   from: `${body.name} <onboarding@resend.dev>`,
    //   to: ["delivered@resend.dev"],
    //   subject: body.message,
    //   react: EmailTemplate({ ...body }),
    // });

    const data = { status: "success", ...body };

    return Response.json(data);
  } catch (error) {
    return Response.json({ status: "error", error });
  }
};

export const ALL: APIRoute = ({ request }) => {
  return Response.json({ error: `${request.method} not allowed` }, { status: 405 });
};
