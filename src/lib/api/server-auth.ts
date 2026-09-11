import "server-only";
import { ApiError } from "@/lib/api/client";
import { serverApiRequest } from "@/lib/api/server-client";
import type { ApiEnvelope, User } from "@/lib/api/types";

/**
 * Server Component variant of getCurrentUser (auth.ts). Forwards the
 * session cookie manually since server-side fetch has no browser cookie
 * jar - see server-client.ts for the full explanation.
 *
 * Returns null instead of throwing on 401, since "not signed in" is an
 * expected, common case for a Server Component to check (e.g. an
 * authenticated layout deciding whether to redirect to /sign-in), not an
 * exceptional one.
 */
export async function getCurrentUserServer(): Promise<User | null> {
  try {
    const response = await serverApiRequest<ApiEnvelope<User>>("/v1/auth/me");
    return response.data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      return null;
    }
    throw error;
  }
}