import Link from "next/link";
import type { SearchResult } from "@/lib/api/types";
import { formatDurationMinutes } from "@/lib/format";

/**
 * A single search hit. Sermon-level, not chunk-level: search now returns
 * which sermon discusses a topic rather than a specific excerpt/moment
 * (cheaper - avoids paying for exact-timestamp precision when several
 * sermons cover the same topic; see backend SearchService). Links to the
 * sermon detail page, where the reader can read the actual content.
 */
export function SearchResultCard({ result }: { result: SearchResult }) {
  const duration = formatDurationMinutes(result.duration_seconds);

  return (
    <Link
      href={`/sermons/${result.sermon_id}`}
      className="block bg-surface-container-lowest rounded-3xl p-6 shadow-[0_2px_16px_-4px_rgba(43,36,32,0.05)] hover:-translate-y-0.5 transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <h3 className="text-lg font-bold leading-snug">
            {result.sermon_title ?? "Untitled sermon"}
          </h3>
          <p className="text-xs text-on-surface-variant font-medium mt-0.5">
            {[result.speaker, duration].filter(Boolean).join(" · ")}
          </p>
        </div>
        <span className="flex-shrink-0 text-[11px] font-bold rounded-full px-2.5 py-1 bg-tertiary-container/20 text-tertiary">
          {Math.round(result.relevance_score * 100)}% match
        </span>
      </div>

      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary mt-2">
        <span className="material-symbols-outlined text-lg">play_circle</span>
        Open sermon
      </span>
    </Link>
  );
}