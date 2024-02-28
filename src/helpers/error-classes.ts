class ProjectError extends Error {
  status: number;
  statusText: string;

  constructor(message: string, status: number, statusText: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.statusText = statusText;

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * An error thrown when a timeout occurs
 * @example
 * try {
 *   let result = await timeout(fetch("https://example.com"), { ms: 100 });
 * } catch (error) {
 *   if (error instanceof TimeoutError) {
 *    // Handle timeout
 *   }
 * }
 */
export class TimeoutError extends ProjectError {
  constructor(message?: string, status = 408) {
    super(message || "Request Timeout", status || 408, "Request Timeout");
  }
}

export class NetworkError extends ProjectError {
  constructor(message?: string, status = 503) {
    super(message || "Service Unavailable", status, "Service Unavailable");
  }
}

export class UnsupportedContentTypeError extends ProjectError {
  constructor(contentType: string) {
    super(
      `Unsupported content type: ${contentType}`,
      415,
      "Unsupported Media Type",
    );
  }
}
