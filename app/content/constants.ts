export const CONTENT_REPO_PATH = process.env.CONTENT_REPO_PATH;

export interface ParseMdxProps {
  data: string;
  slug: string;
}
export type ResourceType = 'articles' | 'projects' | 'snippets' | 'resources';
export type Callback = (data: ResourceMeta) => void;
export interface RepoFiletree {
  tree: Tree[];
}
interface Tree {
  path: string;
}
