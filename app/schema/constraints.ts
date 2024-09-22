import type { SchemaContext } from "astro:content";
import { z } from "astro:schema";

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

// cover: image()
//   .refine((img) => img.width >= 768, {
//     message: "Cover image must be at least 768 pixels wide!",
//   })
//   .optional(),
export const MediaObject = (image: SchemaContext["image"]) =>
  z.object({
    cover: z
      .string()
      .regex(/^https:.*/)
      .transform(
        (url) =>
          ({
            src: url,
            width: 1200,
            height: 630,
            format: "jpeg",
          }) satisfies ImageMetadata,
      )
      .or(image())
      .optional(),
    image: z
      .string()
      .regex(/^https:.*/)
      .transform(
        (url) =>
          ({
            src: url,
            width: 1200,
            height: 630,
            format: "jpeg",
          }) satisfies ImageMetadata,
      )
      .or(image())
      .optional(),
    alt: z.string(),
    thumbnail: z.string().optional(),
    audio: z.string().optional(),
    video: z.string().optional(),
  });
