import {
  baseSchema,
  MediaObject,
  ResourceBasePath,
  ResourceDateTime,
  ResourceLink,
} from "@/schema";
import { defineCollection, reference, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: ({ image }) =>
    baseSchema.extend({
      base: ResourceBasePath("projects"),
      tools: z.array(z.string()).default([]),
      media: MediaObject(image).optional(),
      links: z.array(ResourceLink).default([]),
    }),
});

const posts = defineCollection({
  type: "content",
  schema: ({ image }) =>
    baseSchema.extend({
      base: ResourceBasePath("blog"),
      media: MediaObject(image).optional(),
      language: z.enum(["en", "es", "fr"]).default("en"),
      others: z.array(reference("blog")).optional(),
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

const stacks = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string().min(1),
    href: z.string().url(),
  }),
});

const changelog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(2),
    description: z.string().min(2),
    author: reference("authors"),
    version: z.string().min(1),
    publishedAt: ResourceDateTime,
    updatedAt: ResourceDateTime.optional(),
  }),
});

const social = defineCollection({
  type: "data",
  schema: z.object({
    platform: z.string().min(1),
    href: z.string().min(1),
    text: z.string().min(1),
    icon: z.string().min(1),
  }),
});

const authors = defineCollection({
  type: "data",
  schema: z.object({
    alternate: z.string().min(1).max(255).optional(),
    name: z.string().min(1).max(255).optional(),
    links: z.object({
      url: z.string().url().optional(),
      email: z.string().email().optional(),
      avatar: z.string().optional(),
    }),
  }),
});

const publications = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string().min(1),
    image: z.string().optional(),
    url: z.string().url(),
  }),
});

export const collections = {
  posts,
  routes,
  projects,
  social,
  stacks,
  changelog,
  authors,
  publications,
};
