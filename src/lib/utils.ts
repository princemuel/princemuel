/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { getCollection, type CollectionEntry, type CollectionKey } from "astro:content";

type RequestOptions = { sort?: boolean };

export async function fetchResource<K extends CollectionKey>(
  key: K,
  options?: RequestOptions,
): Promise<CollectionEntry<K>[]> {
  const status = ["draft", "preview", "published"] as const;
  // @ts-ignore ignored collection type
  const resource = await getCollection(key, ({ data }) => {
    if (import.meta.env.PROD) return data.status === "published";
    return status.includes(data.status);
  });

  return options?.sort
    ? resource.sort((a, b) => {
        return (
          // @ts-ignore ignored collection type "any"
          Number(b.data.updatedAt ?? b.data.publishedAt) -
          // @ts-ignore ignored collection type
          Number(a.data.updatedAt ?? a.data.publishedAt)
        );
      })
    : resource;
}
