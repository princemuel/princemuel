import { CONTENT_REPO_PATH } from './constants';

interface RepoFiletree {
  tree: {
    path: string;
  }[];
}
const url = `https://api.github.com/repos/${CONTENT_REPO_PATH}/git/trees/main?recursive=1`;

export async function getRepoFiletree() {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!response.ok) return null;

  return (await response.json()) as RepoFiletree;
}
