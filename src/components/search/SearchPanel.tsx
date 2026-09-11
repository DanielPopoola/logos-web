"use client";

import { useState, type FormEvent } from "react";
import { search } from "@/lib/api/search-client";
import { ApiError } from "@/lib/api/client";
import type { SearchResult } from "@/lib/api/types";
import { SearchResultCard } from "@/components/search/SearchResultCard";

type SearchState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "results"; results: SearchResult[] }
  | { kind: "empty_library"; message: string }
  | { kind: "no_matches" }
  | { kind: "error"; message: string };

export function SearchPanel() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState<SearchState>({ kind: "idle" });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setState({ kind: "loading" });

    try {
      const response = await search(trimmed);

      if (response.message) {
        // The backend only sets `message` for the empty-library guard
        // (see SearchService.EMPTY_LIBRARY_MESSAGE) - it doesn't make an
        // embedding call in that case, so results is always [] alongside it.
        setState({ kind: "empty_library", message: response.message });
      } else if (response.results.length === 0) {
        setState({ kind: "no_matches" });
      } else {
        setState({ kind: "results", results: response.results });
      }
    } catch (error) {
      setState({
        kind: "error",
        message:
          error instanceof ApiError
            ? error.message
            : "Something went wrong searching. Please try again.",
      });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-3 mb-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your sermons..."
          className="flex-1 bg-surface-container-lowest rounded-2xl px-5 py-3.5 text-base outline-none border-2 border-transparent focus:border-primary-container shadow-[0_2px_12px_-2px_rgba(43,36,32,0.05)]"
        />
        <button
          type="submit"
          disabled={state.kind === "loading" || query.trim().length === 0}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary-container text-on-primary font-bold text-sm shadow-[0_4px_16px_-2px_rgba(255,90,54,0.35)] hover:-translate-y-px transition-all disabled:opacity-50 disabled:pointer-events-none"
        >
          {state.kind === "loading" ? "Searching..." : "Search"}
        </button>
      </form>
      <p className="text-xs text-on-surface-variant mb-8">
        Matches are found by meaning, not just keywords — no exact phrase required.
      </p>

      {state.kind === "results" && (
        <div className="flex flex-col gap-4">
          {state.results.map((result, i) => (
            <SearchResultCard key={`${result.sermon_id}-${i}`} result={result} />
          ))}
        </div>
      )}

      {state.kind === "no_matches" && (
        <p className="text-on-surface-variant py-8 text-center">
          No matches found for that search.
        </p>
      )}

      {state.kind === "empty_library" && (
        <div className="text-center py-16 px-6">
          <p className="text-on-surface-variant max-w-sm mx-auto">{state.message}</p>
        </div>
      )}

      {state.kind === "error" && (
        <p className="text-sm text-on-error-container bg-error-container rounded-xl px-4 py-3">
          {state.message}
        </p>
      )}
    </div>
  );
}