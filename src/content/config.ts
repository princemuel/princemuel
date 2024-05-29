import { baseSchema, MediaObject } from "@/schema";
import { defineCollection, reference, z } from "astro:content";

// const projectCollection = defineCollection({
//   type: "content",
//   schema: ({ image }) =>
//     baseSchema.extend({
//       base: ResourceBasePath("projects"),
//       tools: z.array(z.string()).default([]),
//       media: MediaObject(image).optional(),
//       links: z.array(ResourceLink).default([]),
//     }),
// });

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    baseSchema.extend({
      keywords: z.array(reference("keywords")).default([]),
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
    icon: z.string().min(1),
    order: z.number().int().nonnegative().safe().finite().default(0),
  }),
});

const stackCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string().min(1),
    href: z.string().url(),
  }),
});

const toolCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string().min(1),
    url: z.string().url(),
    icon: z.string().optional(),
    className: z.string().default(""),
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
    order: z.number().default(0),
    href: z.string().min(1),
    text: z.string().min(1),
    icon: z.string().min(1),
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
  posts: blogCollection,
  // projects: projectCollection,
  authors: authorCollection,
  social: socialCollection,
  routes: routeCollection,
  stacks: stackCollection,
  tools: toolCollection,
  keywords: keywordCollection,
  changelog: changelogCollection,
  publications: publicationCollection,
  categories: categoryCollection,
};
