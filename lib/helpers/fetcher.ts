export async function request<JSON = any>(
  ...args: Parameters<typeof fetch>
): Promise<JSON> {
  const response = await fetch(...args);

  if (!response.ok) {
    const json = await response.json();

    let error: FetchError;
    if (json?.error) {
      error = new Error(json.error);
      error.status = response.status;
    } else {
      error = new Error('Network response was not ok');
    }

    // doubly make sure error is not undefined
    return Promise.reject(
      error || new Error('An unexpected error occurred. Please try again')
    );
  }

  const type = response.headers.get('content-type');
  if (type !== 'application/json') {
    return Promise.reject(
      new TypeError(`Malformed data! Expected 'JSON', got '${type}'`)
    );
  }

  return response.json();
}

interface FetchError extends Error {
  status?: number;
}
