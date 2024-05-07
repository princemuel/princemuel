import { z } from "zod";

export const AuthorSchema = z.object({
  name: z.string(),
  url: z.string().url().optional(),
  email: z.string().email().optional(),
  avatar: z.string().url().optional(),
});
