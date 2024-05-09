// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  getCollection,
  type CollectionEntry,
  type CollectionKey,
} from "astro:content";
import { envVars } from "./env.server";

type ResourceOptions = { sort?: boolean; select?: number };

export async function fetchResource<K extends CollectionKey>(
  key: K,
  options?: ResourceOptions,
): Promise<CollectionEntry<K>[]> {
  try {
    const status = ["draft", "preview", "published"] as const;

    const resource = await getCollection(key, ({ data }) => {
      return import.meta.env.MODE === "production"
        ? envVars.ENABLE_PREVIEW && data.status !== "draft"
          ? status.includes(data.status)
          : data.status === "published"
        : true;
    });

    const result = options?.sort
      ? resource.sort((a, b) => {
          return (
            Number(b.data.updatedAt ?? b.data.publishedAt) -
            Number(a.data.updatedAt ?? a.data.publishedAt)
          );
        })
      : resource;
    return result.slice(0, options?.select);
  } catch (error) {
    import.meta.env.MODE !== "production" && console.log(error);
    return [];
  }
}
