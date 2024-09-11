import { z } from "astro:schema";

export const AuthorSchema = z.object({
  name: z.string(),
  url: z.string().url().optional(),
  email: z.string().email().optional(),
  avatar: z.string().url().optional(),
});
