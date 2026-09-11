import "server-only";
import { cookies } from "next/headers";
import { sendRequest, type ApiResult } from "@/lib/api/client";

/**
 * Server Component equivalent of apiRequest/apiRequestWithStatus.
 *
 * Server-side fetch calls have no browser cookie jar - `credentials:
 * "include"` only works for requests the *browser* issues directly (i.e.
 * from Client Components). A Server Component's fetch runs on Node/Next's
 * server, a completely separate HTTP client with no cookies attached, so
 * without this the backend sees no session_token and returns 401 even
 * though the user is signed in.
 *
 * The fix: read the session cookie the browser already sent to *this*
 * Next.js server (via next/headers), and manually forward it as a Cookie
 * header on the outgoing request to the backend.
 *
 * Use this (not apiRequest) in any `async function Page()` / Server
 * Component that needs an authenticated request. Client Components
 * ("use client") should keep using apiRequest from client.ts instead,
 * since there the browser's cookie jar works correctly on its own.
 */
async function withSessionCookie(): Promise<Record<string, string>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
  return token ? { Cookie: `session_token=${token}` } : {};
}

interface ServerRequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
}

/** Server Component variant of apiRequest - forwards the session cookie. */
export async function serverApiRequest<TResponse>(
  path: string,
  options: ServerRequestOptions = {},
): Promise<TResponse> {
  const headers = await withSessionCookie();
  const response = await sendRequest(path, { ...options, headers });

  if (response.status === 204) {
    return undefined as TResponse;
  }
  return response.json() as Promise<TResponse>;
}

/** Server Component variant of apiRequestWithStatus - forwards the session cookie. */
export async function serverApiRequestWithStatus<TBody>(
  path: string,
  options: ServerRequestOptions = {},
): Promise<ApiResult<TBody>> {
  const headers = await withSessionCookie();
  const response = await sendRequest(path, { ...options, headers });
  const body =
    response.status === 204
      ? (undefined as TBody)
      : ((await response.json()) as TBody);
  return { status: response.status, body };
}