import Link from "next/link";
import type { SermonListItem } from "@/lib/api/types";
import { formatDurationMinutes, formatShortDate } from "@/lib/format";
import { SermonStatusPill } from "@/components/library/SermonStatusPill";

/** Rotating accent colors so the grid doesn't read as one flat color block. */
const THEME_ACCENTS = [
  "bg-primary-container/15 text-primary",
  "bg-tertiary-container/20 text-tertiary",
  "bg-secondary-container/30 text-on-secondary-container",
];

interface SermonCardProps {
  sermon: SermonListItem;
}

export function SermonCard({ sermon }: SermonCardProps) {
  const isCompleted = sermon.status === "completed";
  const meta = [sermon.speaker, formatShortDate(sermon.saved_at), formatDurationMinutes(sermon.duration_seconds)]
    .filter(Boolean)
    .join(" · ");

  const cardContent = (
    <div className="bg-surface-container-lowest rounded-3xl p-6 h-full flex flex-col gap-3 shadow-[0_2px_16px_-4px_rgba(43,36,32,0.06)] transition-all hover:shadow-[0_8px_24px_-4px_rgba(43,36,32,0.1)] hover:-translate-y-0.5">
      <h3 className="text-lg font-bold leading-snug">
        {sermon.title ?? "Untitled sermon"}
      </h3>
      <p className="text-xs text-on-surface-variant font-medium">{meta}</p>

      {isCompleted ? (
        <>
          {sermon.summary_excerpt && (
            <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2">
              {sermon.summary_excerpt}
            </p>
          )}
          {sermon.themes.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
              {sermon.themes.map((theme, i) => (
                <span
                  key={theme}
                  className={`text-[11px] font-bold rounded-full px-2.5 py-1 ${THEME_ACCENTS[i % THEME_ACCENTS.length]}`}
                >
                  {theme}
                </span>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="mt-auto pt-1 flex flex-col gap-2">
          <SermonStatusPill status={sermon.status} />
          {sermon.status === "failed" && (
            <p className="text-xs text-on-surface-variant">
              Something went wrong processing this sermon.
            </p>
          )}
        </div>
      )}
    </div>
  );

  // Completed and failed sermons both have a detail page (failed shows the
  // failure reason + a retry action there, since only SermonDetail carries
  // failure_reason - the library list schema doesn't). Pending/processing
  // sermons have nothing to show yet, so they stay non-interactive cards.
  const hasDetailPage = sermon.status === "completed" || sermon.status === "failed";
  if (hasDetailPage) {
    return (
      <Link href={`/sermons/${sermon.id}`} className="block">
        {cardContent}
      </Link>
    );
  }

  return <div>{cardContent}</div>;
}