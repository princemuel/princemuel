import { defineCollection, z } from "astro:content";

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

const pageCollection = defineCollection({
  schema: z.object({
    seo: seoSchema,
    updated_date: z.date().describe("The date this content was last updated."),
    locale: z.enum(["en"]).default("en"),
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

const articleCollection = defineCollection({
  schema: z.object({
    isDraft: z.boolean(),
    title: z.string(),
    sortOrder: z.number(),
    image: z.object({
      social: z.string().optional(),
      cover: z.string().optional(),
    }),
    author: z.string().default("Anonymous"),
    language: z.enum(["en", "es", "fr"]).default("en"),
    tags: z.array(z.string()),
    footnote: z.string().optional(),
    publishDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    authorContact: z.string().email(),
    canonicalURL: z.string().url(),
  }),
});

export const collections = {
  pages: pageCollection,
  articles: articleCollection,
  social: socialCollection,
};
