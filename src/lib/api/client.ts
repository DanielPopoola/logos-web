import { config } from "@/lib/config";
import { getCsrfToken } from "@/lib/api/csrf";

const UNSAFE_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

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
  /** Extra headers to merge in on top of the defaults. Used by the
   * server-side variant to forward the session cookie explicitly, since
   * server-side fetch has no browser cookie jar to rely on. */
  headers?: Record<string, string>;
}

/** Parsed JSON body plus the HTTP status it came with. Use this instead of
 * apiRequest() when a caller needs to distinguish between two different
 * "successful" (2xx) response shapes - e.g. GET /v1/sermons/{id} returns
 * 200 with full analysis OR 202 while still processing, and the caller
 * needs to know which one it got. */
export interface ApiResult<TBody> {
  status: number;
  body: TBody;
}

export async function sendRequest(
  path: string,
  options: RequestOptions,
): Promise<Response> {
  const method = options.method ?? "GET";

  // Double-submit CSRF check on the backend requires this header on any
  // state-changing request that carries the session cookie. Read fresh
  // each call rather than caching, since the cookie's value is the
  // source of truth and this costs nothing meaningful to re-parse.
  const csrfHeaders: Record<string, string> = {};
  if (UNSAFE_METHODS.has(method)) {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      csrfHeaders["X-CSRF-Token"] = csrfToken;
    }
  }

  const response = await fetch(`${config.apiBaseUrl}${path}`, {
    method,
    // Only meaningful for browser-issued fetches - see server-client.ts
    // for why server-side calls can't rely on this and forward the
    // session cookie manually instead.
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...csrfHeaders,
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const message = await extractErrorMessage(response);
    throw new ApiError(response.status, message);
  }

  return response;
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
  const response = await sendRequest(path, options);

  // 204 No Content has no body to parse.
  if (response.status === 204) {
    return undefined as TResponse;
  }

  return response.json() as Promise<TResponse>;
}

/**
 * Like apiRequest, but returns the HTTP status alongside the body instead
 * of assuming a single success shape. Use this when an endpoint documents
 * more than one 2xx response (see GET /v1/sermons/{id} in design-doc.md).
 */
export async function apiRequestWithStatus<TBody>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiResult<TBody>> {
  const response = await sendRequest(path, options);
  const body =
    response.status === 204
      ? (undefined as TBody)
      : ((await response.json()) as TBody);
  return { status: response.status, body };
}

async function extractErrorMessage(response: Response): Promise<string> {
  try {
    const body = await response.json();
    return body.detail ?? response.statusText;
  } catch {
    return response.statusText;
  }
}