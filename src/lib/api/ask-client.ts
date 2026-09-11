import { apiRequest } from "@/lib/api/client";
import type { AskResponse, ApiEnvelope } from "@/lib/api/types";

/**
 * Asks a question answered from the current user's sermon library
 * (POST /v1/ask). Client Component use only - triggered by the user
 * submitting a question, not a page-load read.
 *
 * Unlike search(), there's no separate empty-library signal to check -
 * the backend always returns a normal AskResponse, with a friendly
 * `answer` and empty `sources` when the library is empty. Just render it.
 */
export async function askQuestion(question: string): Promise<AskResponse> {
  const response = await apiRequest<ApiEnvelope<AskResponse>>("/v1/ask", {
    method: "POST",
    body: { question },
  });
  return response.data;
}