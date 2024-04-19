import {
  BaseSchema,
  MediaObject,
  ResourceBasePath,
  ResourceLink,
} from "@/lib/content-schema";
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    BaseSchema.extend({
      base: ResourceBasePath("projects"),
      tools: z.array(z.string()).default([]),
      media: MediaObject(image).optional(),
      links: z.array(ResourceLink).default([]),
    }),
});

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    BaseSchema.extend({
      base: ResourceBasePath("blog"),
      media: MediaObject(image).optional(),
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
