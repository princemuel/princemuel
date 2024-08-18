import { defineAction, z } from "astro:actions";

const contactAction = defineAction({
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
  handler(input, _) {
    console.log(input);

    return { success: true };
  },
});

const subscribeAction = defineAction({
  accept: "form",
  input: z.object({
    honeypot: z.string().max(0, "Invalid submission detected.").optional(),
    email: z
      .string({ message: "This field is required" })
      .min(1, { message: "This field is required" })
      .email({ message: "Please enter a valid email address" }),
  }),
  handler(_foo, _) {
    return { success: true, message: "Subscribed!" };
  },
});

export const server = {
  contact: contactAction,
  subscribe: subscribeAction,
};
