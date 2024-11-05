import type { APIContext } from "astro";
import { RequestError, get_status_from_code } from "./errors";
import { log_in_dev } from "./log-in-dev";

export const handler = <
  Props extends Record<string, unknown> = Record<string, unknown>,
  Params extends Record<string, string | undefined> = Record<string, string | undefined>,
>(
  callback: (context: APIContext<Props, Params>) => Promise<Response>,
) => {
  return async (context: APIContext<Props, Params>) => {
    try {
      return callback(context);
    } catch (e) {
      log_in_dev(e);
      const { code, payload } = createErrorResponse(e);
      return Response.json({ ok: false, code, payload }, { status: get_status_from_code(code) });
    }
  };
};

type ErrorCode = ConstructorParameters<typeof RequestError>[0];
function createErrorResponse(e: unknown) {
  if (e instanceof RequestError) {
    return { code: e.code, payload: e.message };
  }

  if (e instanceof DOMException) {
    const error =
      e.name === "TimeoutError"
        ? RequestError.deadlineExceeded(e.message)
        : e.name === "AbortError"
          ? RequestError.canceled(e.message)
          : e.name === "TypeError"
            ? RequestError.failedPrecondition(e.message)
            : RequestError.unknown(e.message);
    return { code: error.code, payload: error.message };
  }

  return {
    code: "unknown" as ErrorCode,
    payload: "Internal Server Error. Please try again later.",
  };
}
