export const withBaseUrl = (path: string) =>
  new URL(path, import.meta.env.SITE);
