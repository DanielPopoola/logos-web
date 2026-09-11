import Link from "next/link";
import type { SearchResult } from "@/lib/api/types";

function formatTimestamp(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

/**
 * A single search hit. Leads with the matched excerpt (the "evidence"),
 * not the sermon title, since the excerpt is what actually answers "why
 * did this match" - design-doc.md calls this out as required, not
 * optional: a source without "why this matched" isn't useful.
 */
export function SearchResultCard({ result }: { result: SearchResult }) {
  return (
    <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-[0_2px_16px_-4px_rgba(43,36,32,0.05)]">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="text-lg font-bold leading-snug">
            {result.sermon_title ?? "Untitled sermon"}
          </h3>
          {result.speaker && (
            <p className="text-xs text-on-surface-variant font-medium mt-0.5">
              {result.speaker}
            </p>
          )}
        </div>
        <span className="flex-shrink-0 text-[11px] font-bold rounded-full px-2.5 py-1 bg-tertiary-container/20 text-tertiary">
          {Math.round(result.relevance_score * 100)}% match
        </span>
      </div>

      <p className="text-base italic text-on-surface-variant bg-surface-container-low rounded-2xl px-4 py-3 mb-3">
        &quot;{result.matched_excerpt}&quot;
      </p>

      <Link
        href={`/sermons/${result.sermon_id}`}
        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:-translate-y-px transition-all"
      >
        <span className="material-symbols-outlined text-lg">play_circle</span>
        {result.timestamp_seconds !== null
          ? `Open at ${formatTimestamp(result.timestamp_seconds)}`
          : "Open sermon"}
      </Link>
    </div>
  );
}