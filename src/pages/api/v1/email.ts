import { EmailTemplate } from "@/components/react/EmailTemplate";
import type { APIRoute } from "astro";
import { z } from "astro:content";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(2),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = schema.parse(await request.json());

    const data = await resend.emails.send({
      from: `${body.name} <onboarding@resend.dev>`,
      to: ["delivered@resend.dev"],
      subject: body.message,
      react: EmailTemplate({ ...body }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
};

export const ALL: APIRoute = ({ request }) => {
  return Response.json({ error: `${request.method} not allowed` }, { status: 405 });
};
