interface IProject extends Resource {
  meta: IProjectMeta;
}
interface IProjectMeta extends ResourceMeta {
  links: SocialMeta;
  featured: boolean;
}

interface IArticle extends Resource {
  meta: IArticleMeta;
}
interface IArticleMeta extends ResourceMeta, MediaResource {
  contributors?: Author[];
  author?: Author;
  links: SocialMeta;
  published: boolean;
}

interface MediaResource {
  image?: string | Media;
  audio?: string | Media;
  video?: string | Media;
}
interface Media {
  url: string;
  type?: string;
  length?: number;
  title?: string;
  duration?: number;
}
interface SocialMeta {
  repo: string;
  site: string;
  thumbnail?: string;
}
interface Author {
  name?: string;
  email?: string;
  link?: string;
}

interface Resource {
  content: React.JSX.Element;
  meta: ResourceMeta;
}
interface ResourceMeta {
  id: string;
  title: string;
  date: string;
  description: string;
  alt: string;
  tags: string[];
}
