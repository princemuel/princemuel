import {
  BaseSchema,
  MediaObject,
  ResourceLink,
  ResourceType,
} from "@/lib/content-schema";
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    BaseSchema.extend({
      type: ResourceType("project"),
      media: MediaObject(image).optional(),
      tools: z.array(z.string()).optional(),
      stars: z.number().int().nonnegative().safe().default(0),
      links: z.array(ResourceLink).optional().default([]),
    }),
});

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    BaseSchema.extend({
      type: ResourceType("article"),
      media: MediaObject(image).optional(),
      likes: z.number().int().nonnegative().safe().default(0),
      canonical: z.string().url().optional(),
      language: z.enum(["en", "es", "fr"]).default("en"),
    }),
});

const routes = defineCollection({
  type: "data",
  schema: z.object({
    text: z.string().min(1),
    href: z.string().min(1),
    icon: z.string().min(1),
    order: z.number().int().nonnegative().safe().default(0),
  }),
});

const social = defineCollection({
  type: "data",
  schema: z.object({
    platform: z.string(),
    href: z.string(),
    text: z.string(),
    icon: z.string(),
  }),
});

const stacks = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    href: z.string().url(),
  }),
});

export const collections = { posts, routes, projects, social, stacks };
