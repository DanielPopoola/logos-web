import Link from "next/link";
import type { SermonDetail } from "@/lib/api/types";
import { formatDurationMinutes, formatShortDate } from "@/lib/format";

export function SermonHeader({ sermon }: { sermon: SermonDetail }) {
  const meta = [
    sermon.speaker,
    formatShortDate(sermon.saved_at),
    formatDurationMinutes(sermon.duration_seconds),
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <header className="mb-8">
      <Link
        href="/library"
        className="inline-flex items-center gap-1 text-sm font-semibold text-on-surface-variant hover:text-on-surface mb-4"
      >
        <span className="material-symbols-outlined text-lg">arrow_back</span>
        Library
      </Link>

      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
        {sermon.title ?? "Untitled sermon"}
      </h1>
      <p className="text-sm text-on-surface-variant font-medium mb-5">{meta}</p>

      <a
        href={sermon.youtube_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-container text-on-primary text-sm font-bold shadow-[0_4px_16px_-2px_rgba(255,90,54,0.35)] hover:-translate-y-px transition-all"
      >
        <span className="material-symbols-outlined text-[18px]">play_circle</span>
        Watch on YouTube
      </a>
    </header>
  );
}