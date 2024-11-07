/** Helper for throwing errors in expression positions */
export function raise(error: unknown): never {
  throw typeof error === "string" ? new Error(error) : error;
}

export const parseError = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unknown error occurred";
};
