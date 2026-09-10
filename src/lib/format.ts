/** Formats a duration in seconds as "42 min". Returns null if unknown. */
export function formatDurationMinutes(seconds: number | null): string | null {
  if (seconds === null) return null;
  return `${Math.round(seconds / 60)} min`;
}

/** Formats an ISO date string as "Aug 30, 2026". */
export function formatShortDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}