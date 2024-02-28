import {
  NetworkError,
  TimeoutError,
  UnsupportedContentTypeError,
} from "./error-classes";

const handleJson = async (response: Response) => response.json();
const handleText = async (response: Response) => response.text();
const handleArrayBuffer = async (response: Response) => response.arrayBuffer();
const handleBlob = async (response: Response) => response.blob();

const handlers = new Map<string, (response: Response) => Promise<unknown>>([
  ["blob", handleBlob],
  ["text", handleText],
  ["application/json", handleJson],
  ["image/jpeg", handleArrayBuffer],
  ["image/png", handleArrayBuffer],
  ["application/pdf", handleArrayBuffer],
  ["application/octet-stream", handleArrayBuffer],
  // Add more content types and handlers as needed
]);

export async function request<T>(
  ...args: Parameters<typeof fetch>
): Promise<T> {
  try {
    const response = await fetch(...args);

    if (!response.ok) {
      try {
        const json = (await response.json()) as { error?: string };
        return Promise.reject(new NetworkError(json?.error, response.status));
      } catch (jsonError) {
        return Promise.reject(
          new NetworkError("Failed to parse error response", response.status),
        );
      }
    }

    const contentType = response.headers.get("content-type") ?? "";
    const handler = handlers.get(contentType);

    if (!handler)
      return Promise.reject(new UnsupportedContentTypeError(contentType));

    return handler(response) as T;
  } catch (error) {
    switch (true) {
      case error instanceof DOMException && error.name === "AbortError":
        return Promise.reject(new TimeoutError("Request Failed"));
      default:
        return Promise.reject(error);
    }
  }
}
