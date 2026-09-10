import type { SermonStatus } from "@/lib/api/types";

const STATUS_STYLES: Record<Exclude<SermonStatus, "completed">, string> = {
  pending: "bg-surface-container-high text-on-surface-variant",
  processing: "bg-secondary-container/40 text-on-secondary-container",
  failed: "bg-error-container text-on-error-container",
};

const STATUS_LABELS: Record<Exclude<SermonStatus, "completed">, string> = {
  pending: "Queued",
  processing: "Processing",
  failed: "Couldn't process",
};

/**
 * Small pill showing a sermon's non-completed status. Renders nothing for
 * "completed" sermons, since those show their real content instead.
 */
export function SermonStatusPill({ status }: { status: SermonStatus }) {
  if (status === "completed") return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-bold rounded-full px-3 py-1 ${STATUS_STYLES[status]}`}
    >
      {status === "processing" && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      )}
      {STATUS_LABELS[status]}
    </span>
  );
}