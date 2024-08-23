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
    // cover: image()
    //   .refine((img) => img.width >= 768, {
    //     message: "Cover image must be at least 768 pixels wide!",
    //   })
    //   .optional(),
    cover: image().optional(),
    alt: z.string(),
    image: z.string().optional(),
    thumbnail: z.string().optional(),
    audio: z.string().optional(),
    video: z.string().optional(),
  });
