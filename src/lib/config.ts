/**
 * Application configuration, loaded once from environment variables.
 *
 * This is the ONLY file in the app that should read `process.env`.
 * Everywhere else, import `config` and use its fields. This keeps env
 * access in one place, makes missing/misconfigured values fail loudly at
 * startup instead of silently at some random call site, and means we can
 * swap how config is loaded (e.g. add a secrets manager) without touching
 * business logic.
 */

function readRequiredEnvVar(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Check your .env.local file.`,
    );
  }
  return value;
}

export const config = {
  apiBaseUrl: readRequiredEnvVar(
    "NEXT_PUBLIC_API_BASE_URL",
    process.env.NEXT_PUBLIC_API_BASE_URL,
  ),  
};
