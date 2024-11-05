import { MediaObject, baseSchema } from "@/lib/collections";
import { file, glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";
import path from "node:path";
import type { Icon } from "virtual:astro-icon";

const slugify = ((options) => {
  if (options.data.slug) return options.data.slug as string;
  return path.basename(options.entry, ".mdx");
}) satisfies Parameters<typeof glob>[0]["generateId"];

// pattern: "**/[^_]*.{md,mdoc}"
const posts = defineCollection({
  loader: glob({
    base: "app/content/posts",
    pattern: "**/[^_]*.{md,mdx}",
  }),
  schema: ({ image }) =>
    baseSchema.extend({
      media: MediaObject(image).optional(),
      others: z.array(reference("posts")).default([]),
    }),
});

const projects = defineCollection({
  loader: glob({
    base: "app/content/projects",
    pattern: "**/[^_]*.{md,mdx}",
  }),
  schema: ({ image }) =>
    baseSchema.extend({
      tools: z.array(z.string()).default([]),
      media: MediaObject(image).optional(),
      link: z
        .object({
          site: z.string().url().optional(),
          repo: z.string().url().optional(),
        })
        .default({}),
    }),
});

const changelog = defineCollection({
  loader: glob({
    base: "app/content/changelog",
    pattern: "**/[^_]*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string().min(2),
    description: z.string().min(2),
    author: reference("authors"),
    version: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
  }),
});

const authors = defineCollection({
  loader: file("app/content/resources/authors.json"),
  schema: z.object({
    alternate: z.string().min(1).max(255).optional(),
    name: z.string().min(1).max(255).optional(),
    links: z.object({
      url: z.string().url().optional(),
      email: z.string().email().optional(),
      avatar: z.string().optional(),
      social: z.record(z.string().min(1), z.string().url()).optional(),
    }),
  }),
});

const categories = defineCollection({
  loader: file("app/content/resources/categories.json"),
  schema: z.object({ name: z.string().min(1) }),
});

const publications = defineCollection({
  loader: file("app/content/resources/publications.json"),
  schema: z.object({
    name: z.string().min(1),
    image: z.string().optional(),
    url: z.string().url(),
  }),
});

const routes = defineCollection({
  loader: file("app/content/resources/routes.json"),
  schema: z.object({
    href: z.string().min(1),
    text: z.string().min(1),
    icon: z.custom<Icon>((value) => value && typeof value === "string"),
  }),
});

const socials = defineCollection({
  loader: file("app/content/resources/socials.json"),
  schema: z.object({
    href: z.string().min(1),
    text: z.string().min(1),
    icon: z.custom<Icon>((value) => value && typeof value === "string"),
  }),
});

export const collections = {
  routes,
  authors,
  publications,
  categories,
  socials,
  posts,
  projects,
  changelog,
};
