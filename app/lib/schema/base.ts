import { reference, z } from "astro:content";
import { ResourceStatus } from "./constraints";

export const baseSchema = z.object({
	title: z.string().min(2),
	summary: z.string().min(2),
	description: z.string().min(2),
	featured: z.boolean().default(false),
	author: reference("authors"),
	// publication: reference("publications").optional(),
	contributors: z.array(reference("authors")).default([]),
	tags: z.array(z.string()).default([]),
	keywords: z.array(z.string()).default([]),
	categories: z.array(reference("categories")).default([]),
	status: ResourceStatus,
	publishedAt: z.coerce.date(),
	updatedAt: z.coerce.date().optional(),
	duration: z.string().default("1 min read"),
	words: z.number().finite().int().nonnegative().lte(65535).default(200),
	permalink: z.string().url().optional(),
});
