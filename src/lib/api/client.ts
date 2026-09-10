import { config } from "@/lib/config";

/**
 * Thrown when the backend returns a non-2xx response.
 * Callers can check `status` to branch on specific error cases
 * (e.g. 401 -> redirect to sign-in) without parsing strings.
 */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
}

/**
 * Makes a request to the Logos backend and returns the parsed JSON body.
 *
 * This is the ONLY function in the app that should call `fetch` against
 * the backend. Every other API module (auth, sermons, search, ...) calls
 * this instead of touching `fetch` directly - so retry logic, auth
 * headers, or error handling only ever need to change in one place.
 *
 * Session auth is via an httpOnly cookie (see design-doc.md), so we pass
 * `credentials: "include"` on every request rather than attaching a
 * bearer token ourselves.
 *
 * @param path - API path starting with `/`, e.g. `/v1/auth/me`
 * @throws {ApiError} if the response status is not 2xx
 */
export async function apiRequest<TResponse>(
  path: string,
  options: RequestOptions = {},
): Promise<TResponse> {
  const response = await fetch(`${config.apiBaseUrl}${path}`, {
    method: options.method ?? "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const message = await extractErrorMessage(response);
    throw new ApiError(response.status, message);
  }

  // 204 No Content has no body to parse.
  if (response.status === 204) {
    return undefined as TResponse;
  }

  return response.json() as Promise<TResponse>;
}

async function extractErrorMessage(response: Response): Promise<string> {
  try {
    const body = await response.json();
    return body.detail ?? response.statusText;
  } catch {
    return response.statusText;
  }
}
