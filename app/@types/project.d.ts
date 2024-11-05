type ImageProps = import("astro:assets").LocalImageProps | import("astro:assets").RemoteImageProps;
type ImageSrc = ImageProps["src"];

type Directives = {
  noindex?: boolean;
  nofollow?: boolean;
  nosnippet?: boolean;
};

type Meta = {
  title: [value: string, absolute?: boolean];
  description: string;
  keywords?: string[];
  image?: string;
  canonical?: string | URL | null;
  type?: OpenGraph["type"];
  publishedAt?: ConstructorParameters<typeof Date>[0] | null;
  updatedAt?: ConstructorParameters<typeof Date>[0] | null;
  directives?: Directives;
};
type OpenGraph = {
  type?: "website" | "article" | "book" | "profile";
};
type Twitter = {
  handle?: string;
  card?: "summary" | "summary_large_image";
};

type IResource = "projects" | "articles" | "blog";
