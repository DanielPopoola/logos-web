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

export type SermonStatus = "pending" | "processing" | "completed" | "failed";

/** One row in the library list (GET /v1/sermons). Intentionally lighter
 * than SermonDetail - the backend truncates summary_excerpt server-side
 * and omits full analysis to keep this endpoint fast (see design-doc.md's
 * <300ms library SLO). */
export interface SermonListItem {
  id: string;
  title: string | null;
  speaker: string | null;
  status: SermonStatus;
  duration_seconds: number | null;
  summary_excerpt: string | null;
  themes: string[];
  saved_at: string;
  failure_reason: string | null;
}

export interface SermonLibraryPage {
  items: SermonListItem[];
  page: number;
  page_size: number;
  total: number;
}

export interface SermonAnalysis {
  summary: string;
  key_teachings: string[];
  action_points: string[];
  reflection_questions: string[];
}

export interface SermonNote {
  id: string;
  content: string;
  created_at: string;
}

/** Full sermon detail (GET /v1/sermons/{id}), returned only when status is completed. */
export interface SermonDetail {
  id: string;
  youtube_url: string;
  title: string | null;
  speaker: string | null;
  duration_seconds: number | null;
  status: SermonStatus;
  failure_reason: string | null;
  saved_at: string;
  analysis: SermonAnalysis | null;
  themes: string[];
  bible_references: string[];
  notes: SermonNote[];
}