/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  getCollection,
  type CollectionEntry,
  type CollectionKey,
} from "astro:content";

type ResourceOptions = { sort?: boolean; select?: number };

export async function fetchResource<K extends CollectionKey>(
  key: K,
  options?: ResourceOptions,
): Promise<CollectionEntry<K>[]> {
  try {
    const status = ["draft", "preview", "published"] as const;
    // @ts-expect-error ignored collection type "any"
    const resource = await getCollection<K>(key, ({ data }) => {
      return import.meta.env.PROD
        ? JSON.parse(import.meta.env.ENABLE_RESOURCE_PREVIEW) &&
          data.status !== "draft"
          ? status.includes(data.status)
          : data.status === "published"
        : true;
    });

    const result = options?.sort
      ? resource.sort((a, b) => {
          return (
            // @ts-expect-error ignored collection type "any"
            Number(b.data.updatedAt ?? b.data.publishedAt) -
            // @ts-expect-error ignored collection type "any"
            Number(a.data.updatedAt ?? a.data.publishedAt)
          );
        })
      : resource;

    return result.slice(0, options?.select);
  } catch (error) {
    return [];
  }
}
