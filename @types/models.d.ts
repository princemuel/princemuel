interface IProjectMeta {
  id: string;
  title: string;
  date: string;
  tags: string[];
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
