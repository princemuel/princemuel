import { ProjectError } from "./errors";

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
      throw ProjectError.unavailable(
        `Request failed due to network issues: ${body}`,
      );
    }

    const handler = handlers.get(response.headers.get("content-type") ?? "");
    if (!handler)
      return Promise.reject(
        ProjectError.unimplemented("Unsupported content type"),
      );

    return handler(response) as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return Promise.reject(ProjectError.canceled("Request aborted"));
    }
    return Promise.reject(error);
  }
}
