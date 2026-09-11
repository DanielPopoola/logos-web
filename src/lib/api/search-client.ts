import { apiRequest } from "@/lib/api/client";
import type { ApiEnvelope, SearchResponse } from "@/lib/api/types";

/**
 * Runs a semantic search over the current user's sermon library
 * (GET /v1/search). Client Component use only - triggered by the user
 * typing a query and submitting, not a page-load read.
 */
export async function search(query: string, limit = 10): Promise<SearchResponse> {
  const params = new URLSearchParams({ q: query, limit: String(limit) });
  const response = await apiRequest<ApiEnvelope<SearchResponse>>(
    `/v1/search?${params.toString()}`,
  );
  return response.data;
}