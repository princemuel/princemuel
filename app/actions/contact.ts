import { resend } from "@/config/clients";
import { checkIfRateLimited } from "@/helpers/rate-limit";
import { capitalize } from "@/utilities/strings";

import { ActionError, defineAction } from "astro:actions";
import { RESEND_ADDRESS } from "astro:env/server";
import { z } from "astro:schema";

import { experimental_AstroContainer as AstroContainer } from "astro/container";

export const contactAction = defineAction({
  accept: "form",
  input: z.object({
    firstName: z
      .string({ message: "This field is required" })
      .min(1, { message: "This field is required" })
      .max(64),
    lastName: z
      .string({ message: "This field is required" })
      .min(1, { message: "This field is required" })
      .max(64),
    email: z
      .string({ message: "This field is required" })
      .min(1, { message: "This field is required" })
      .email({ message: "Please enter a valid email address" }),
    message: z
      .string({ message: "This field is required" })
      .min(1, { message: "This field is required" })
      .min(20, { message: "Message must be up to 20 chars" })
      .max(256),
    queryType: z.enum(["general", "contract", "support", "issues"], {
      message: "Please select a query type",
    }),
    consent: z
      .string({
        message: "To submit this form, please consent to being contacted",
      })
      .refine((value) => value === "on", {
        message: "To submit this form, please consent to being contacted",
      }),
  }),
  handler: async (body, ctx) => {
    const { isRateLimited } = await checkIfRateLimited(ctx);

    if (isRateLimited)
      throw new ActionError({
        code: "TOO_MANY_REQUESTS",
        message: "You have reached your request limit for today",
      });

    await AstroContainer.create();

    const response = await resend.emails.send({
      from: `${body.firstName} <${body.email}>`,
      to: RESEND_ADDRESS,
      subject: `${capitalize(body.queryType)} email from ${body.firstName} ${body.lastName}`,
      replyTo: body.email,
      text: body.message,
    });

    return response.data
      ? {
          ok: true,
          payload: `Email #${response.data.id.slice(0, 5)} sent`,
        }
      : response.error
        ? { ok: false, payload: response.error.message }
        : { ok: false, payload: "Request failed" };
  },
});
