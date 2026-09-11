import Link from "next/link";
import type { AskSource } from "@/lib/api/types";
import { formatDurationMinutes } from "@/lib/format";

/**
 * A single source the Ask answer drew from. Sermon-level, not
 * chunk-level - same reasoning as SearchResultCard: cheaper than always
 * returning an exact-second match, especially when multiple sermons in
 * the library discuss the same topic. Sources stay visually prominent
 * (a real card, not a footnote) since they're the trust mechanism for
 * Ask - the reader needs to be able to tell "this is something my
 * sermons actually taught" from "the LLM generated something plausible".
 */
export function AskSourceCard({ source }: { source: AskSource }) {
  const duration = formatDurationMinutes(source.duration_seconds);

  return (
    <Link
      href={`/sermons/${source.sermon_id}`}
      className="block bg-surface-container-lowest rounded-2xl p-5 shadow-[0_2px_12px_-2px_rgba(43,36,32,0.05)] hover:-translate-y-0.5 transition-all"
    >
      <h4 className="text-base font-bold mb-1">
        {source.sermon_title ?? "Untitled sermon"}
      </h4>
      {duration && (
        <p className="text-xs text-on-surface-variant font-medium mb-2">{duration}</p>
      )}
      <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
        <span className="material-symbols-outlined text-base">play_circle</span>
        Open sermon
      </span>
    </Link>
  );
}