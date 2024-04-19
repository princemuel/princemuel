type ImageProps =
  | import("astro:assets").LocalImageProps
  | import("astro:assets").RemoteImageProps;
type ImageSrc = ImageProps["src"];

type Meta = {
  title: string;
  description: string;
  tags?: string[];
  image?: {
    src: string;
    alt: string;
  };
  canonical?: string | URL | null;
  type?: "website" | "article";
  publishedAt?: ConstructorParameters<typeof Date>[0];
  updatedAt?: ConstructorParameters<typeof Date>[0];
};
type OpenGraph = {
  type?: "website" | "article";
};
type Twitter = {
  handle?: string;
  card?: "summary" | "summary_large_image";
};

type IResource = "projects" | "articles" | "blog";
