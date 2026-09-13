/**
 * Reads the backend-issued `csrf_token` cookie so it can be echoed back
 * as the `X-CSRF-Token` header on unsafe requests (double-submit cookie
 * pattern - see app/middleware/security.py on the backend).
 *
 * This cookie is deliberately not httpOnly (the backend sets it that way
 * on purpose), so reading it from JS here is expected and required.
 *
 * Only meaningful in the browser - the server-side client forwards the
 * session cookie manually and never issues mutating requests, so it has
 * no need for this.
 */
const CSRF_COOKIE_NAME = "csrf_token";

export function getCsrfToken(): string | null {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [name, ...rest] = cookie.trim().split("=");
    if (name === CSRF_COOKIE_NAME) {
      return decodeURIComponent(rest.join("="));
    }
  }

  return null;
}