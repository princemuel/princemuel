interface IProjectMeta {
  id: string;
  title: string;
  date: string;
  description: string;
  alt: string;
  tags: string[];
  links: ILinkMeta;
  published: boolean;
}

interface IProject {
  meta: IProjectMeta;
  content: JSX.Element;
}
interface IPostMeta {
  id: string;
  title: string;
  date: string;
  tags: string[];
}

interface IPost {
  meta: IPostMeta;
  content: JSX.Element;
}

interface ILinkMeta {
  repository: string;
  website: string;
  video?: string;
}

interface IParams {
  [key: string]: string | undefined;
}
