import { z } from "astro:content";

export const contactSchema = z.object({
  firstName: z.string().min(1, { message: "First name required" }).max(255),
  lastName: z.string().min(1, { message: "Last name required" }).max(255),
  email: z.string().email(),
  message: z.string().min(15, { message: "Message required" }).max(1000),
  type: z
    .enum(["general", "contract", "advisory", "agency"])
    .default("general"),
});

export const subscribeSchema = z.object({
  firstName: z
    .string({ required_error: "FirstName is required" })
    .min(1)
    .max(255),
  lastName: z
    .string({ required_error: "LastName is required" })
    .min(1)
    .max(255),
  email: z.string({ required_error: "Email is required" }).email(),
});
