import type { APIContext } from "astro";
import { get_status_from_code, RequestError } from "./errors";
import { log_in_dev } from "./log-in-dev";

export const handler = <
  Props extends Record<string, unknown> = Record<string, unknown>,
  Params extends Record<string, string | undefined> = Record<
    string,
    string | undefined
  >,
>(
  callback: (
    context: APIContext<Props, Params>,
  ) => Response | Promise<Response>,
) => {
  return async (context: APIContext<Props, Params>) => {
    try {
      return await callback(context);
    } catch (error) {
      log_in_dev(error);
      if (error instanceof RequestError) {
        return Response.json(
          { success: false, code: error.code, payload: error.message },
          { status: get_status_from_code(error.code) },
        );
      }
      return Response.json(
        {
          code: 500,
          success: false,
          payload: "Internal Server Error. Please try again later.",
        },
        { status: 500 },
      );
    }
  };
};
