import { baseSchema } from "@/lib/schema/base";
import { MediaObject } from "@/lib/schema/constraints";
import { defineCollection, reference } from "astro:content";
import type { Icon } from "virtual:astro-icon";
import { z } from "zod";

const projectCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    baseSchema.extend({
      tools: z.array(z.string()).default([]),
      media: MediaObject(image).optional(),
      language: z.enum(["en", "es", "fr"]).default("en"),
      link: z
        .object({
          site: z.string().url().optional(),
          repo: z.string().url().optional(),
        })
        .default({}),
    }),
});

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    baseSchema.extend({
      media: MediaObject(image).optional(),
      language: z.enum(["en", "es", "fr"]).default("en"),
      others: z.array(reference("blog")).optional(),
    }),
});

const categoryCollection = defineCollection({
  type: "data",
  schema: z.object({ name: z.string().min(1) }),
});

const keywordCollection = defineCollection({
  type: "data",
  schema: z.object({ title: z.string().min(1) }),
});

const routeCollection = defineCollection({
  type: "data",
  schema: z.object({
    text: z.string().min(1),
    href: z.string().min(1),
    icon: z.custom<Icon>((value) => value && typeof value === "string"),
    order: z.number().finite().int().nonnegative().safe().lte(255).default(0),
  }),
});


const changelogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(2),
    description: z.string().min(2),
    author: reference("authors"),
    version: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
  }),
});

const socialCollection = defineCollection({
  type: "data",
  schema: z.object({
    order: z.number().finite().int().nonnegative().safe().default(0),
    href: z.string().min(1),
    text: z.string().min(1),
    icon: z.custom<Icon>((value) => value && typeof value === "string"),
  }),
});

const authorCollection = defineCollection({
  type: "data",
  schema: z.object({
    alternate: z.string().min(1).max(255).optional(),
    name: z.string().min(1).max(255).optional(),
    links: z.object({
      url: z.string().url().optional(),
      email: z.string().email().optional(),
      avatar: z.string().optional(),
      social: z.record(z.string(), z.string().url()).optional(),
    }),
  }),
});

const publicationCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string().min(1),
    image: z.string().optional(),
    url: z.string().url(),
  }),
});

export const collections = {
  authors: authorCollection,
  categories: categoryCollection,
  changelog: changelogCollection,
  keywords: keywordCollection,
  posts: blogCollection,
  projects: projectCollection,
  publications: publicationCollection,
  routes: routeCollection,
  social: socialCollection,

};
