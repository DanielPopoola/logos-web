import { config } from "@/lib/config";
import { apiRequest } from "@/lib/api/client";
import type { ApiEnvelope, User } from "@/lib/api/types";

/**
 * Full URL that starts the Google OAuth flow.
 *
 * Auth here is entirely backend-driven (see app/api/routes/auth.py):
 * the browser navigates to this URL, the backend redirects to Google,
 * Google redirects back to the backend's /google/callback, and the
 * backend sets the session cookie and redirects to "/". The frontend
 * never sees a Google token - it only ever navigates the browser here
 * and later checks getCurrentUser() to see if a session exists.
 */
export function googleSignInUrl(): string {
  return `${config.apiBaseUrl}/v1/auth/google/login`;
}

/** Returns the currently signed-in user, or throws ApiError(401) if none. */
export async function getCurrentUser(): Promise<User> {
  const response = await apiRequest<ApiEnvelope<User>>("/v1/auth/me");
  return response.data;
}

/** Ends the current session. */
export function signOut(): Promise<void> {
  return apiRequest<void>("/v1/auth/logout", { method: "POST" });
}
