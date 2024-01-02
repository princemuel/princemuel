import { metadata } from "./metadata";

export const filterAndSortResource = <T extends any>(resources: T[]) => {
  return (resources || [])
    .filter((resource) => {
      // @ts-expect-error // function not typed properly
      const status = resource.data.status;
      if (import.meta.env.PROD) return status === "published";

      return (
        (metadata.showDrafts && status === "draft") ||
        status === "published" ||
        status === "preview"
      );
    })
    .sort(function (a, b) {
      // @ts-expect-error // function not typed properly
      const dateA = a.data.publishedAt.getTime();
      // @ts-expect-error // function not typed properly
      const dateB = b.data.publishedAt.getTime();
      return (
        dateA < dateB ? -1
        : dateA > dateB ? 1
        : 0
      );
    });
};
