import { getCollection, type CollectionEntry, type CollectionKey } from "astro:content";

const status = ["draft", "preview", "published"] as const;

export async function getSortedResource<K extends CollectionKey>(
  key: K,
): Promise<CollectionEntry<K>[]> {
  const resource = await getCollection(key, ({ data }) => {
    if (import.meta.env.PROD) return data.status === "published";
    return status.includes(data.status);
  });

  return resource.sort((a, b) => {
    const A = Number(a.data.updatedAt) || Number(a.data.publishedAt);
    const B = Number(b.data.updatedAt) || Number(b.data.publishedAt);

    return A < B ? -1 : A > B ? 1 : 0;
  });
}
