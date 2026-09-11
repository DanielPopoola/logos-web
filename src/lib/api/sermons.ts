import "server-only";
import { ApiError } from "@/lib/api/client";
import { serverApiRequest, serverApiRequestWithStatus } from "@/lib/api/server-client";
import type { ApiEnvelope, SermonDetail, SermonLibraryPage } from "@/lib/api/types";

interface GetLibraryOptions {
  theme?: string;
  page?: number;
  pageSize?: number;
}

/** Fetches the current user's sermon library (GET /v1/sermons). */
export async function getLibrary(
  options: GetLibraryOptions = {},
): Promise<SermonLibraryPage> {
  const params = new URLSearchParams();
  if (options.theme) params.set("theme", options.theme);
  if (options.page) params.set("page", String(options.page));
  if (options.pageSize) params.set("page_size", String(options.pageSize));

  const query = params.toString();
  const path = query ? `/v1/sermons?${query}` : "/v1/sermons";

  const response = await serverApiRequest<ApiEnvelope<SermonLibraryPage>>(path);
  return response.data;
}

/** Result of fetching a single sermon: either fully ready, still
 * processing, or not found in the current user's library. Modeled as a
 * tagged union so callers must handle every case explicitly rather than
 * checking a status string and hoping they got the branches right. */
export type SermonDetailResult =
  | { kind: "ready"; sermon: SermonDetail }
  | { kind: "processing"; id: string; status: SermonDetail["status"] }
  | { kind: "not_found" };

/** Fetches a single sermon's detail (GET /v1/sermons/{id}). */
export async function getSermonDetail(
  sermonId: string,
): Promise<SermonDetailResult> {
  try {
    const result = await serverApiRequestWithStatus<ApiEnvelope<SermonDetail>>(
      `/v1/sermons/${sermonId}`,
    );

    if (result.status === 202) {
      return {
        kind: "processing",
        id: result.body.data.id,
        status: result.body.data.status,
      };
    }

    return { kind: "ready", sermon: result.body.data };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { kind: "not_found" };
    }
    throw error;
  }
}