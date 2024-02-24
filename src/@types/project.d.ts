type Meta = {
  title: string;
  description: string;
  tags?: string[];
  image?: { src?: string; alt?: string };
  canonical?: string | URL | null;
  type?: "website" | "article";
  publishedAt?: string;
  updatedAt?: string;
};
type OpenGraph = {
  type?: "website" | "article";
};
type Twitter = {
  handle?: string;
  card?: "summary" | "summary_large_image";
};
