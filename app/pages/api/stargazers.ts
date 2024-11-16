import { OCTOKIT_USERNAME } from "astro:env/server";
import { octokit } from "@/config/clients";
import { handler } from "@/helpers/api-handler";
import { RequestError, get_code_from_status } from "@/helpers/request-error";
import { RequestError as GithubError } from "octokit";

export const GET = handler(async () => {
  try {
    const response = await octokit.rest.repos.get({
      owner: OCTOKIT_USERNAME,
      repo: "princemuel.com",
    });
    return Response.json({ payload: response.data.stargazers_count }, { status: 200 });
  } catch (e) {
    if (!(e instanceof GithubError)) throw e;
    throw new RequestError(
      get_code_from_status(e.status),
      e.message,
      new Error(e.message, { cause: e.cause }),
    );
  }
});
