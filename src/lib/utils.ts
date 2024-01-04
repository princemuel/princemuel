import { getCollection, type CollectionEntry } from "astro:content";

export async function getSortedPosts(): Promise<CollectionEntry<"posts">[]> {
  const resource = await getCollection("posts", ({ data }) => {
    if (import.meta.env.PROD) return data.status === "published";
    return data.status === "draft" || data.status === "published" || data.status === "preview";
  });

  return resource.toSorted((a, b) => {
    const dateA = Number(a.data.updatedAt) || Number(a.data.publishedAt);
    const dateB = Number(b.data.updatedAt) || Number(b.data.publishedAt);

    return (
      dateA < dateB ? -1
      : dateA > dateB ? 1
      : 0
    );
  });
}

export async function getSortedProjects(): Promise<CollectionEntry<"projects">[]> {
  const resource = await getCollection("projects", ({ data }) => {
    if (import.meta.env.PROD) return data.status === "published";
    return data.status === "draft" || data.status === "published" || data.status === "preview";
  });

  return resource.toSorted((a, b) => {
    const dateA = Number(a.data.updatedAt) || Number(a.data.publishedAt);
    const dateB = Number(b.data.updatedAt) || Number(b.data.publishedAt);

    return (
      dateA < dateB ? -1
      : dateA > dateB ? 1
      : 0
    );
  });
}
