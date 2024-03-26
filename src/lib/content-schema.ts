import { z, type SchemaContext } from "astro:content";
const ResourceLink = z.object({ href: z.string().url(), text: z.string() });
const ResourceStatus = z
  .enum(["draft", "preview", "published"])
  .default("draft");
const ResourceType = (type: "project" | "article") =>
  z.enum(["project", "article"]).default(type);

const AuthorSchema = z.object({
  name: z.string(),
  contact: z.string().url().or(z.string().email()).optional(),
  avatar: z.string().url().optional(),
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

export const MetaSchema = () =>
  z
    .array(
      z.object({
        /** Name of the HTML tag to add to `<head>`, e.g. `'meta'`, `'link'`, or `'script'`. */
        tag: z.enum([
          "title",
          "base",
          "link",
          "style",
          "meta",
          "script",
          "noscript",
          "template",
        ]),
        /** Attributes to set on the tag, e.g. `{ rel: 'stylesheet', href: '/custom.css' }`. */
        attrs: z
          .record(z.union([z.string(), z.boolean(), z.undefined()]))
          .default({}),
        /** Content to place inside the tag (optional). */
        content: z.string().default(""),
      }),
    )
    .default([]);

const ContactFormSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(2),
  email: z.string({ required_error: "Email is required" }).email(),
  message: z.string({ required_error: "Message is required" }).min(15),
});

const BaseSchema = z.object({
  title: z.string().min(2).describe("The resource's Name or Title"),
  alternate: z.string().min(2).optional(),
  summary: z
    .string()
    .min(2)
    .describe("The resource's short summary. For SEO purposes"),
  description: z
    .string()
    .min(2)
    .describe("The resource's description. For SEO purposes"),
  featured: z.boolean().default(false),
  order: z.number().min(0).default(0),
  author: AuthorSchema,
  contributors: z.array(AuthorSchema).optional(),
  tags: z.array(z.string().describe("Tag/Keyword for this resource")),
  footnote: z.string().optional(),
  status: ResourceStatus.describe("The resource's publication status"),
  publishedAt: ResourceDateTime.describe("The creation time of the resource"),
  updatedAt: ResourceDateTime.optional().describe(
    "The last update time of the resource",
  ),
  duration: z.string().optional(),
  permalink: z.string().optional(),
});

export {
  AuthorSchema,
  BaseSchema,
  ContactFormSchema,
  MediaObject,
  ResourceDateTime,
  ResourceLink,
  ResourceStatus,
  ResourceType,
};
