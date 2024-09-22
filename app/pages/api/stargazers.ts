import { octokit } from "@/config/clients";
import { handler } from "@/helpers/api-handler";
import { get_code_from_status, RequestError } from "@/helpers/errors";
import { RequestError as GHRequestError } from "octokit";

export const GET = handler(async () => {
  try {
    const response = await octokit.rest.repos.get({
      owner: import.meta.env.OCTOKIT_USERNAME,
      repo: "princemuel.com",
    });
    const payload = response.data.stargazers_count;
    return Response.json({ payload }, { status: 200 });
  } catch (error) {
    if (!(error instanceof GHRequestError)) throw error;
    throw new RequestError(
      get_code_from_status(error.status),
      error.message,
      new Error(error.message, { cause: error.cause }),
    );
  }
});
