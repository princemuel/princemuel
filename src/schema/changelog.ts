import { z } from "astro:content";

export const ChangelogSchema = z.object({
  version: z.string().optional(),
});
