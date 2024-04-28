import { reference, z } from "astro:content";
import { ResourceDateTime, ResourceStatus } from "./constraints";

export const baseSchema = z.object({
  title: z.string().min(2),
  summary: z.string().min(2),
  description: z.string().min(2),
  featured: z.boolean().default(false),
  author: reference("authors"),
  publication: reference("publications").optional(),
  authors: z.array(z.string()).optional(),
  tags: z.array(z.string()),
  footnote: z.string().optional(),
  status: ResourceStatus,
  publishedAt: ResourceDateTime,
  updatedAt: ResourceDateTime.optional(),
  duration: z.string().default("1 min read"),
  permalink: z.string().url().optional(),
});
