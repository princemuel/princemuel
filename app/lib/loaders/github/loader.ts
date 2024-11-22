import { octokit } from "@/config/clients.ts";
import { md_processor } from "./processor";

import { RequestError as GithubError } from "octokit";

import { log_in_dev } from "@/helpers/log-in-dev.ts";
import type { Loader } from "astro/loaders";

type LoaderOptions =
  `owner:${string};repo:${string};branch:${string};directory:${string}`;

type GitConfig = {
  owner: string;
  repo: string;
  branch: string;
  directory: string;
};

export function loader(options: LoaderOptions): Loader {
  return {
    name: "astro-loader-github",
    load: async (ctx) => {
      const git = Object.fromEntries(
        options.split(";").map((pair) => pair.split(":")),
      ) as GitConfig;

      const request = await octokit.request(
        "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
        {
          owner: git.owner,
          repo: git.repo,
          tree_sha: git.branch,
          recursive: "true",
        },
      );

      const files = request.data.tree
        .map((file) => file.path)
        .filter(
          (p) =>
            p?.includes(git.directory) && (p.endsWith(".md") || p.endsWith(".mdx")),
        )
        .filter(Boolean);

      log_in_dev("FILES", files);

      const requests = files.map(async (fileName) => {
        try {
          const response = await octokit.request(
            "GET /repos/{owner}/{repo}/contents/{path}",
            {
              path: fileName,
              owner: git.owner,
              repo: git.repo,
              ref: git.branch,
              headers: { accept: "application/vnd.github.v3.raw" },
            },
          );

          const id =
            fileName.split(`${git.directory}/`)[1]?.replace(/\.mdx?$/, "") ?? "";

          return { id, body: response.data as unknown as string };
        } catch (e) {
          if (!(e instanceof GithubError)) return null;
          log_in_dev(`Error fetching ${fileName}:`, e);
          return null;
        }
      });

      const response = await Promise.all(requests);

      const entries = response.filter(Boolean);

      ctx.logger.info(`Processing ${entries.length} entries`);
      ctx.store.clear();

      const processor = await md_processor(ctx.config);

      for (const item of entries) {
        const { entry, metadata, body } = await processor.process(item);
        const data = await ctx.parseData({ id: item.id, data: entry });
        const digest = ctx.generateDigest(data);

        ctx.store.set({
          id: entry.id,
          data,
          digest,
          body,
          rendered: { html: entry.body, metadata },
        });
      }

      console.log(JSON.stringify(ctx.store.entries()));
    },
  };
}
