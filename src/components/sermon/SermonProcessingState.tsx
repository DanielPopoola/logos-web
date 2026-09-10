import Link from "next/link";

/**
 * Shown when GET /v1/sermons/{id} returns 202 - the sermon exists but
 * analysis isn't ready yet. Deliberately has no fake progress bar or
 * percentage: the backend only ever reports pending/processing/completed/
 * failed, so the UI stays honest to that instead of inventing granularity
 * that doesn't exist.
 */
export function SermonProcessingState() {
  return (
    <div className="flex flex-col items-center text-center py-24 px-6">
      <div className="w-16 h-16 rounded-2xl bg-secondary-container/30 text-on-secondary-container flex items-center justify-center mb-6">
        <span className="w-3 h-3 rounded-full bg-current animate-pulse" />
      </div>
      <h2 className="text-2xl font-extrabold tracking-tight mb-2">
        Still processing
      </h2>
      <p className="text-on-surface-variant max-w-sm mb-8">
        This usually takes a couple of minutes. Feel free to navigate away —
        it&apos;ll be ready next time you check your library.
      </p>
      <Link
        href="/library"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface-container-low text-on-surface font-bold text-sm hover:bg-surface-container transition-all"
      >
        Back to library
      </Link>
    </div>
  );
}