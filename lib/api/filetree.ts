import { REPO_PATH } from './constants';

interface RepoFiletree {
  tree: {
    path: string;
  }[];
}
export async function getRepoFiletree() {
  const url = `https://api.github.com/repos/${REPO_PATH}/git/trees/main?recursive=1`;
  console.log('GITHUB_TOKEN', process.env.GITHUB_TOKEN);
  console.log(url);

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
