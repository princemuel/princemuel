import { REPO_PATH } from './constants';

interface RepoFiletree {
  tree: {
    path: string;
  }[];
}
export async function getRepoFiletree() {
  const res = await fetch(
    `https://api.github.com/repos/${REPO_PATH}/git/trees/main?recursive=1`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
  );

  if (!res.ok) return undefined;

  return (await res.json()) as RepoFiletree;
}
