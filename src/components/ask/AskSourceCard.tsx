import Link from "next/link";
import type { AskSource } from "@/lib/api/types";

function formatTimestamp(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

/**
 * A single source the Ask answer drew from. Sources are the trust
 * mechanism for Ask - the reader needs to be able to tell "this is
 * something my sermons actually taught" from "the LLM generated
 * something plausible", so this stays visually prominent (a real card
 * with the excerpt), not a small footnote-style link.
 */
export function AskSourceCard({ source }: { source: AskSource }) {
  return (
    <Link
      href={`/sermons/${source.sermon_id}`}
      className="block bg-surface-container-lowest rounded-2xl p-5 shadow-[0_2px_12px_-2px_rgba(43,36,32,0.05)] hover:-translate-y-0.5 transition-all"
    >
      <h4 className="text-base font-bold mb-2">
        {source.sermon_title ?? "Untitled sermon"}
      </h4>
      <p className="text-sm italic text-on-surface-variant bg-surface-container-low rounded-xl px-3.5 py-2.5 mb-2">
        &quot;{source.matched_excerpt}&quot;
      </p>
      <span className="inline-flex items-center gap-1 text-xs font-bold text-primary">
        <span className="material-symbols-outlined text-base">play_circle</span>
        {source.timestamp_seconds !== null
          ? `At ${formatTimestamp(source.timestamp_seconds)}`
          : "Open sermon"}
      </span>
    </Link>
  );
}