type CallbackAction<T> = (request: Request) => Promise<T>;
type ActionReturnType<T> = Promise<{ response?: Response; result?: T }>;

export const action = async <T>(request: Request, callback: CallbackAction<T>): ActionReturnType<T> => {
  if (request.method === "POST") {
    const isClientRequest = request.headers.get("accept") === "application/json";

    const result = await callback(request);
    if (!isClientRequest) return { result };

    return { response: Response.json(result), result };
  }

  return { result: undefined };
};
