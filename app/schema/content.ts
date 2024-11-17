import { reference, z } from "astro:content";

import type { SchemaContext } from "astro:content";

export const baseSchema = z.object({
  title: z.string().min(2),
  summary: z.string().min(2),
  description: z.string().min(2),
  featured: z.boolean().default(false),
  author: reference("authors"),
  contributors: z.array(reference("authors")).default([]),
  tags: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
  draft: z.boolean().default(true),
  publishedAt: z.date(),
  updatedAt: z.date().optional(),
  duration: z.string().default("1 min read"),
  words: z.number().finite().int().nonnegative().lte(65535).default(200),
  language: z.enum(["en", "es", "fr"]).default("en"),
  permalink: z.string().url().optional(),
});

export const MediaObject = (image: SchemaContext["image"]) =>
  z.object({
    cover: z
      .string()
      .regex(/^https:.*/)
      .transform(
        (url) =>
          ({
            src: url,
            width: 1200,
            height: 630,
            format: "jpeg",
          }) satisfies ImageMetadata,
      )
      .or(image())
      .optional(),
    image: z
      .string()
      .regex(/^https:.*/)
      .transform(
        (url) =>
          ({
            src: url,
            width: 1200,
            height: 630,
            format: "jpeg",
          }) satisfies ImageMetadata,
      )
      .or(image())
      .optional(),
    alt: z.string(),
    thumbnail: z.string().optional(),
    audio: z.string().optional(),
    video: z.string().optional(),
  });
