import { z, type SchemaContext } from "astro:content";

const AuthorSchema = z.object({
  name: z.string(),
  contact: z.string().url().or(z.string().email()).optional(),
  avatar: z.string().url().optional(),
});

const ResourceLink = z.object({
  href: z.string().or(z.string().url()),
  text: z.string(),
});
const Publication = z.object({
  image: z.string().or(z.string().url()).optional(),
  name: z.string(),
});
const ResourceStatus = z
  .enum(["draft", "preview", "published"])
  .default("draft");

const ResourceBasePath = (type: IResource) =>
  z.enum(["projects", "articles", "blog"]).default(type);

const ResourceDateTime = z
  .string()
  .or(z.date())
  .transform((val) => new Date(val || Date.now()));

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
    audio: z.string().optional(),
    video: z.string().optional(),
  });

const ContactFormSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(2),
  email: z.string({ required_error: "Email is required" }).email(),
  message: z.string({ required_error: "Message is required" }).min(15),
});

const BaseSchema = z.object({
  title: z.string().min(2).describe("The resource's Name or Title"),
  summary: z
    .string()
    .min(2)
    .describe("The resource's short summary. For SEO purposes"),
  description: z
    .string()
    .min(2)
    .describe("The resource's description. For SEO purposes"),
  featured: z.boolean().default(false),
  author: z.string(),
  publication: Publication.optional(),
  contributors: z.array(z.string()).optional(),
  tags: z.array(z.string().describe("Tag/Keyword for this resource")),
  footnote: z.string().optional(),
  status: ResourceStatus.describe("The resource's publication status"),
  publishedAt: ResourceDateTime.describe("The creation time of the resource"),
  updatedAt: ResourceDateTime.optional().describe(
    "The last update time of the resource",
  ),
  duration: z.string().default("1 min read"),
  permalink: z.string().url().optional(),
});

export {
  AuthorSchema,
  BaseSchema,
  ContactFormSchema,
  MediaObject,
  ResourceBasePath,
  ResourceDateTime,
  ResourceLink,
  ResourceStatus,
};
