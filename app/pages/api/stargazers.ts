import { octokit } from "@/config/clients";
import { handler } from "@/helpers/api-handler";
import { RequestError, get_code_from_status } from "@/helpers/errors";
import { RequestError as GHRequestError } from "octokit";

export const GET = handler(async () => {
  try {
    const response = await octokit.rest.repos.get({
      owner: import.meta.env.OCTOKIT_USERNAME,
      repo: "princemuel.com",
    });
    return Response.json({ payload: response.data.stargazers_count }, { status: 200 });
  } catch (error) {
    if (!(error instanceof GHRequestError)) throw error;
    throw new RequestError(
      get_code_from_status(error.status),
      error.message,
      new Error(error.message, { cause: error.cause }),
    );
  }
});
