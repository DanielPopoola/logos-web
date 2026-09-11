import { apiRequest } from "@/lib/api/client";
import type { ApiEnvelope, CreatedNote, SermonSubmission } from "@/lib/api/types";

/**
 * Submits a YouTube URL for ingestion (POST /v1/sermons).
 *
 * Per app/api/sermons.py, the backend varies the status code by outcome
 * (201 new sermon, 200 already-in-library, 409 processing elsewhere) but
 * always returns the same SermonSubmissionOut shape - so unlike
 * getSermonDetail, there's no need for a tagged union here. The caller
 * can branch on `status` (pending/processing/completed) if it needs to,
 * but doesn't need to distinguish "new" from "already had it".
 *
 * Client Component use only - this is a user-triggered mutation
 * (form submit), not a page-load read.
 */
export async function submitSermon(youtubeUrl: string): Promise<SermonSubmission> {
  const response = await apiRequest<ApiEnvelope<SermonSubmission>>("/v1/sermons", {
    method: "POST",
    body: { youtube_url: youtubeUrl },
  });
  return response.data;
}

/** Retries a failed sermon's ingestion (POST /v1/sermons/{id}/retry). */
export async function retrySermon(sermonId: string): Promise<SermonSubmission> {
  const response = await apiRequest<ApiEnvelope<SermonSubmission>>(
    `/v1/sermons/${sermonId}/retry`,
    { method: "POST" },
  );
  return response.data;
}

/** Adds a personal note to a sermon (POST /v1/sermons/{id}/notes). */
export async function createNote(
  sermonId: string,
  content: string,
): Promise<CreatedNote> {
  const response = await apiRequest<ApiEnvelope<CreatedNote>>(
    `/v1/sermons/${sermonId}/notes`,
    { method: "POST", body: { content } },
  );
  return response.data;
}