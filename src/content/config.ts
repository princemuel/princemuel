import {
  BaseSchema,
  MediaObject,
  ResourceDateTime,
  ResourceLinks,
  ResourceType,
} from "@/lib/schema";
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    BaseSchema.extend({
      type: ResourceType("project"),
      media: MediaObject(image).optional(),
      tools: z.array(z.string()).optional(),
      updatedAt: ResourceDateTime.optional(),
      stars: z.number().min(0).default(0),
      links: ResourceLinks.optional(),
    }),
});

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    BaseSchema.extend({
      type: ResourceType("article"),
      media: MediaObject(image).optional(),
      updatedAt: ResourceDateTime.optional(),
      likes: z.number().min(0).default(0),
      canonical: z.string().url().optional(),
      language: z.enum(["en", "es", "fr"]).default("en"),
    }),
});

const routes = defineCollection({
  type: "data",
  schema: z.object({
    id: z.string().min(1),
    text: z.string().min(1),
    href: z.string().min(1),
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

export const collections = {
  projects: projects,
  articles: posts,
  routes: routes,
  social: social,
};
