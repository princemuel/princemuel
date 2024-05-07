import type { SchemaContext } from "astro:content";
import { z } from "zod";

export const ResourceLink = z.object({
  href: z.string(),
  text: z.string(),
});
export const Publication = z.object({
  image: z.string().optional(),
  name: z.string(),
});
export const ResourceStatus = z.enum(["draft", "preview", "published"]).default("draft");

export const ResourceBasePath = (type: IResource) => z.enum(["projects", "articles", "blog"]).default(type);

// export const ResourceDateTime = z.string().transform((val) => new Date(val));
export const ResourceDateTime = z.coerce.date();

export const MediaObject = (image: SchemaContext["image"]) =>
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
