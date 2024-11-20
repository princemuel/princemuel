import { octokit } from "@/config/clients.ts";
import { md_processor } from "./processor";

import { RequestError as GithubError } from "octokit";

import { log_in_dev } from "@/helpers/log-in-dev.ts";
import type { Loader } from "astro/loaders";

type LoaderOptions = {
  repo: { owner: string; name: string; branch: string; directory: string };
  incremental: boolean;
};

export function loader({ repo, incremental = false }: LoaderOptions): Loader {
  return {
    name: "astro-loader-github",
    load: async ({ store, parseData, generateDigest, meta, config, logger }) => {
      const last_modified = meta.get("last-modified");
      if (incremental) logger.info(`last modified at ${last_modified}`);

      const request = await octokit.request(
        "GET /repos/{owner}/{repo}/git/trees/{tree_sha}",
        {
          owner: repo.owner,
          repo: repo.name,
          tree_sha: repo.branch,
          recursive: "true",
        },
      );

      const files = request.data.tree
        .map((file) => file.path)
        .filter(
          (p) =>
            p?.includes(repo.directory) && (p.endsWith(".md") || p.endsWith(".mdx")),
        )
        .filter(Boolean);

      log_in_dev("FILES", files);

      const requests = files.map(async (fileName) => {
        try {
          const response = await octokit.request(
            "GET /repos/{owner}/{repo}/contents/{path}",
            {
              path: fileName,
              owner: repo.owner,
              repo: repo.name,
              ref: repo.branch,
              headers: { accept: "application/vnd.github.v3.raw" },
            },
          );

          const id =
            fileName.split(`${repo.directory}/`)[1]?.replace(/\.mdx?$/, "") ?? "";

          return { id, body: response.data as unknown as string };
        } catch (e) {
          if (!(e instanceof GithubError)) return null;
          log_in_dev(`Error fetching ${fileName}:`, e);
          return null;
        }
      });

      const response = await Promise.all(requests);

      const entries = response.filter(Boolean);

      logger.info(`Processing ${entries.length} entries`);

      const updatedAt = new Date(last_modified ?? 0);

      if (!incremental) store.clear();

      const processor = await md_processor(config);

      for (const item of entries) {
        const { entry, metadata, body } = await processor.process(item);
        const data = await parseData({ id: item.id, data: entry });
        const digest = generateDigest(data);

        store.set({
          id: entry.id,
          data,
          digest,
          body,
          rendered: { html: entry.body, metadata },
        });

        console.log("ITEM", item);

        // if (item.updatedAt > updatedAt) updatedAt = item.updatedAt;
      }

      if (incremental) {
        meta.set("last-modified", updatedAt.toISOString());
        logger.info(`new-last-modified: ${meta.get("last-modified")}`);
      }

      console.log(JSON.stringify(store.entries()));
    },
  };
}
