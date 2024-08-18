import type { SchemaContext } from "astro:content";
import { z } from "astro:content";

export const ResourceLink = z.object({
  href: z.string(),
  text: z.string(),
});
export const Publication = z.object({
  image: z.string().optional(),
  name: z.string(),
});
export const ResourceStatus = z
  .enum(["draft", "preview", "published"])
  .default("draft");

export const MediaObject = (image: SchemaContext["image"]) =>
  z.object({
    cover: image()
      .refine((value) => value.width >= 1080, {
        message: "Cover picture must be at least 1080 pixels wide!",
      })
      .optional(),
    alt: z.string(),
    image: z.string().optional(),
    thumbnail: z.string().optional(),
    audio: z.string().optional(),
    video: z.string().optional(),
  });
