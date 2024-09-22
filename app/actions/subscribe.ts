import { resend } from "@/config/clients";
import { envVars } from "@/config/environment";
import { checkIfRateLimited } from "@/helpers/rate-limit";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

export const subscribeAction = defineAction({
  accept: "form",
  input: z.object({
    honeypot: z.string().max(0, "Invalid submission detected.").optional(),
    email: z
      .string({ message: "This field is required" })
      .min(1, { message: "This field is required" })
      .email({ message: "Please enter a valid email address" }),
  }),
  handler: async (body, { request }) => {
    const { isRateLimited } = await checkIfRateLimited(request);

    if (isRateLimited)
      throw new ActionError({
        code: "TOO_MANY_REQUESTS",
        message: "You have reached your request limit",
      });

    const response = await resend.contacts.create({
      email: body.email,
      unsubscribed: false,
      audienceId: envVars.RESEND_AUDIENCE,
    });

    return response.data
      ? {
          success: true,
          payload: `Contact #${response.data.id.slice(0, 5)} created`,
        }
      : response.error
        ? { success: false, payload: response.error.message }
        : { success: false, payload: "Request failed" };
  },
});
