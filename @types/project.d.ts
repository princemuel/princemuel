interface ParseMdxProps {
  data: string;
  slug: string;
}
type ResourceType = 'articles' | 'projects' | 'snippets' | 'resources';
type Callback = (data: ResourceMeta) => void;
interface RepoFiletree {
  tree: Tree[];
}
interface Tree {
  path: string;
}
