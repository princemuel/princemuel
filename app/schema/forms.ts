import { z } from "astro:schema";

export const contactSchema = z.object({
  firstName: z.string().min(1, { message: "First name required" }).max(255),
  lastName: z.string().min(1, { message: "Last name required" }).max(255),
  email: z.string().email(),
  message: z.string().min(15, { message: "Message required" }).max(1000),
  type: z
    .enum(["general", "contract", "advisory", "agency"])
    .default("general"),
});

export const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }).max(255),
  email: z.string().email(),
});
