import { z } from "zod";

export const formSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1).max(255),
  email: z.string({ required_error: "Email is required" }).email(),
  message: z
    .string({ required_error: "Message is required" })
    .min(15)
    .max(1000),
  type: z.enum(["general", "contract", "advisory", "agency"]),
});
