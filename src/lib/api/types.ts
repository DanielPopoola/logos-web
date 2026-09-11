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
 * <300ms library SLO). Confirmed against app/schemas/sermon.py's
 * LibraryItemOut - notably, no failure_reason here (only on SermonDetail);
 * a failed card shows a generic message rather than the real reason. */
export interface SermonListItem {
  id: string;
  title: string | null;
  speaker: string | null;
  status: SermonStatus;
  duration_seconds: number | null;
  summary_excerpt: string | null;
  themes: string[];
  saved_at: string;
}

export interface SermonLibraryPage {
  items: SermonListItem[];
  page: number;
  page_size: number;
  total: number;
}

/** Response from POST /v1/sermons and POST /v1/sermons/{id}/retry. */
export interface SermonSubmission {
  id: string;
  status: SermonStatus;
  youtube_url: string;
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

/** Response from POST /v1/sermons/{id}/notes - identical shape to
 * SermonNote, kept as a separate alias since it's a distinct response
 * contract (NoteCreateOut) that happens to match today. */
export type CreatedNote = SermonNote;

export interface SearchResult {
  sermon_id: string;
  sermon_title: string | null;
  speaker: string | null;
  matched_excerpt: string;
  timestamp_seconds: number | null;
  relevance_score: number;
}

/** Response from GET /v1/search. `message` is set instead of results
 * being empty-but-unexplained when the user's library has zero sermons
 * (see SearchService.EMPTY_LIBRARY_MESSAGE on the backend) - surface it
 * exactly rather than inventing generic "no results" copy. */
export interface SearchResponse {
  results: SearchResult[];
  message: string | null;
}

/** A source cited in an Ask (RAG) answer. Deliberately a narrower shape
 * than SearchResult (no speaker, no relevance_score) - matches SourceOut
 * on the backend exactly. */
export interface AskSource {
  sermon_id: string;
  sermon_title: string | null;
  matched_excerpt: string;
  timestamp_seconds: number | null;
}

/** Response from POST /v1/ask. Note: unlike search, the empty-library
 * case is NOT a separate signal here - the backend just returns a normal
 * 200 with a friendly `answer` and `sources: []` (see
 * SearchService.EMPTY_LIBRARY_ANSWER), so the frontend doesn't need a
 * special branch for it - just render whatever `answer` says. */
export interface AskResponse {
  answer: string;
  sources: AskSource[];
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