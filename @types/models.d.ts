interface IProject extends Resource {
  meta: IProjectMeta;
}
interface IArticle extends Resource {
  meta: IArticleMeta;
}

interface IProjectMeta extends ResourceMeta {
  link?: ResourceLink;
  featured: boolean;
}
interface IArticleMeta extends ResourceMeta, MediaResource {
  author?: Author;
  contributors?: Author[];
  link?: ResourceLink;
  series?: Series;
}

// TODO: Write a function to create og images per post
interface Resource {
  content: React.JSX.Element;
  meta: ResourceMeta;
}
interface ResourceMeta {
  id: string;
  title: string;
  alternate: string;
  type: 'article' | 'project' | 'snippet' | 'resource';
  /////////////////////////////
  headline: string; // alternate description for seo purpose
  description: string;
  media: MediaResource;
  /////////////////////////////
  tags: string[];
  categories?: string[];
  /////////////////////////////
  readtime: number;
  publishedAt: string;
  status: 'published' | 'draft';
  /////////////////////////////
}

// TODO!: Write a function to resolve media path, if string or object
interface MediaResource {
  image?: string | Media;
  audio?: string | Media;
  video?: string | Media;
  thumbnail?: string | Media;
}
interface Media {
  url: string;
  type?: string;
  length?: number;
  title?: string;
  duration?: number;
}
interface Author {
  name?: string;
  designation: string;
  email?: string;
  link?: string;
  avatar: MediaResource['image'];
}

interface Series {
  title: string;
  order: number;
}
interface ResourceLink {
  repo?: string;
  site?: string;
}
