import { RequestError } from "./request-error";

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

export async function request<T>(...args: Parameters<typeof fetch>): Promise<T> {
  return fetch(...args)
    .then((r) => {
      if (!r.ok) throw RequestError.unavailable("Request failed due to network issues");
      return r;
    })
    .then((response) => {
      const content_type = response.headers.get("content-type") ?? "text/plain";
      const handler = handlers.get(content_type) ?? handleText;
      return handler(response) as T;
    })
    .catch((e) => Promise.reject(e));
}
