import {
  NetworkError,
  TimeoutError,
  UnsupportedContentTypeError,
} from "./errors";

const handleJson = (response: Response) => response.json();
const handleText = (response: Response) => response.text();
const handleArrayBuffer = (response: Response) => response.arrayBuffer();
const handleBlob = (response: Response) => response.blob();
const handleFormData = (response: Response) => response.formData();

const handlers = new Map<string, (response: Response) => Promise<unknown>>([
  ["blob", handleBlob],
  ["text/plain", handleText],
  ["text/html", handleText],
  ["application/json", handleJson],
  ["image/jpeg", handleArrayBuffer],
  ["image/png", handleArrayBuffer],
  ["application/pdf", handleArrayBuffer],
  ["application/octet-stream", handleArrayBuffer],
  ["multipart/form-data", handleFormData],
  // Add more content types and handlers as needed
]);

export async function request<T>(
  ...args: Parameters<typeof fetch>
): Promise<T> {
  try {
    const response = await fetch(...args);

    if (!response.ok) {
      const body = await response.text();
      throw new NetworkError(
        `Request failed due to network issues: ${body}`,
        response.status,
      );
    }
    const contentType = response.headers.get("content-type") ?? "";
    const handler = handlers.get(contentType);

    if (!handler)
      return Promise.reject(new UnsupportedContentTypeError(contentType));

    return handler(response) as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return Promise.reject(new TimeoutError("Request Aborted"));
    }
    return Promise.reject(error);
  }
}
