import { defineCollection, z, type SchemaContext } from "astro:content";

const AuthorSchema = z.object({
  name: z.string(),
  contact: z.string().url().or(z.string().email()).optional(),
  avatar: z.string().url().optional(),
});

const seoSchema = z.object({
  title: z.string().min(5).max(120),
  description: z.string().min(15).max(160),
  image: z
    .object({
      src: z.string().default("/og/social.jpg"),
      alt: z.string().default("Og Image"),
    })
    .default({}),
  pageType: z.enum(["website", "article"]).default("website"),
  robots: z
    .object({
      index: z.boolean().default(true),
      follow: z.boolean().default(true),
    })
    .default({}),
});

const routeCollection = defineCollection({
  type: "data",
  schema: z.object({
    id: z.string().min(1),
    text: z.string().min(1),
    href: z.string().min(1),
  }),
});

const socialCollection = defineCollection({
  type: "data",
  schema: z.object({
    platform: z.string(),
    href: z.string(),
    text: z.string(),
    icon: z.string(),
  }),
});

export const imageSchema = ({ image }: SchemaContext) =>
  z.object({
    image: image(),
    description: z.string().optional(),
  });

const projectCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string().min(2),
      alternate: z.string().min(2).optional(),
      headline: z.string().min(2),
      description: z.string().min(2),
      type: z.enum(["project", "article"]).default("project"),
      featured: z.boolean(),
      order: z.number().min(0).default(0),
      media: z
        .object({
          cover: image()
            .refine((value) => value.width >= 1080, {
              message: "Cover picture must be at least 1080 pixels wide!",
            })
            .optional(),
          coverAlt: z.string().optional(),
          image: z.string().optional(),
          thumbnail: z.string().optional(),
          video: z.string().optional(),
        })
        .optional(),
      author: AuthorSchema,
      contributors: z.array(AuthorSchema).optional(),
      tags: z.array(z.string()),
      tools: z.array(z.string()).optional(),
      footnote: z.string().optional(),
      links: z
        .object({
          repo: z.string().url().optional(),
          url: z.string().url().optional(),
          video: z.string().or(z.string().url()).optional(),
        })
        .optional(),
      permalink: z.string().optional(),
      stars: z.number().min(0).default(0),
      publishedAt: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      status: z.enum(["draft", "preview", "published"]).default("draft"),
    }),
});

const postCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string().min(2),
      alternate: z.string().min(2).optional(),
      headline: z.string().min(2),
      description: z.string().min(2),
      type: z.enum(["project", "article"]).default("article"),
      order: z.number().min(0).default(0),
      language: z.enum(["en", "es", "fr"]).default("en"),
      media: z
        .object({
          cover: image()
            .refine((value) => value.width >= 1080, {
              message: "Cover picture must be at least 1080 pixels wide!",
            })
            .optional(),
          coverAlt: z.string().optional(),
          image: z.string().optional(),
          thumbnail: z.string().optional(),
          video: z.string().optional(),
        })
        .optional(),
      author: AuthorSchema,
      contributors: z.array(AuthorSchema).optional(),
      tags: z.array(z.string()),
      footnote: z.string().optional(),
      publishedAt: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedAt: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val))
        .optional(),
      status: z.enum(["draft", "preview", "published"]).default("draft"),
      permalink: z.string().optional(),
      canonical: z.string().url().optional(),
    }),
});

export const collections = {
  projects: projectCollection,
  articles: postCollection,
  routes: routeCollection,
  social: socialCollection,
};
