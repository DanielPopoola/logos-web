/**
 * Types describing shapes returned by the Logos backend API.
 * These should mirror design-doc.md's documented response bodies.
 * Keeping them in one file means every API function and every component
 * that consumes a response agrees on the same shape.
 */

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
}

/**
 * Envelope every Logos endpoint wraps its payload in
 * (see app.schemas.response.APIResponse on the backend).
 */
export interface ApiEnvelope<TData> {
  data: TData;
}
