import { z, type SchemaContext } from "astro:content";

const ResourceStatus = z.enum(["draft", "preview", "published"]).default("draft");
const ResourceType = (type: "project" | "article") => z.enum(["project", "article"]).default(type);
const AuthorSchema = z.object({
  name: z.string(),
  contact: z.string().url().or(z.string().email()).optional(),
  avatar: z.string().url().optional(),
});

const ResourceLinks = z.object({
  repo: z.string().url().optional(),
  url: z.string().url().optional(),
  video: z.string().or(z.string().url()).optional(),
});

const ResourceDateTime = z
  .string()
  .or(z.date())
  .transform((val) => new Date(val));

const MediaObject = (image: SchemaContext["image"]) =>
  z.object({
    cover: image()
      .refine((value) => value.width >= 1080, {
        message: "Cover picture must be at least 1080 pixels wide!",
      })
      .optional(),
    coverAlt: z.string().optional(),
    image: z.string().optional(),
    thumbnail: z.string().optional(),
    video: z.string().optional(),
  });

const BaseSchema = z.object({
  title: z.string().min(2),
  alternate: z.string().min(2).optional(),
  headline: z.string().min(2),
  description: z.string().min(2),
  featured: z.boolean().default(false),
  order: z.number().min(0).default(0),
  author: AuthorSchema,
  contributors: z.array(AuthorSchema).optional(),
  tags: z.array(z.string()),
  footnote: z.string().optional(),
  status: ResourceStatus,
  publishedAt: ResourceDateTime,
  permalink: z.string().optional(),
});

export {
  AuthorSchema,
  BaseSchema,
  MediaObject,
  ResourceDateTime,
  ResourceLinks,
  ResourceStatus,
  ResourceType,
};
