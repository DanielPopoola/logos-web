import type { SermonNote } from "@/lib/api/types";
import { formatShortDate } from "@/lib/format";
import { SermonSectionCard } from "@/components/sermon/SermonSectionCard";

/**
 * The user's own notes on this sermon - the only place notes live (there's
 * no standalone notes list page/endpoint). Kept visually distinct from
 * SermonAnalysisSection: amber/secondary + edit_note icon here, vs.
 * indigo/tertiary + auto_awesome there, per the design system's signifier
 * convention.
 *
 * The add-note input is not yet wired to POST /v1/sermons/{id}/notes -
 * that requires client-side state and a server action, left as a
 * follow-up rather than guessing at the submit/error UX here.
 */
export function SermonNotesSection({ notes }: { notes: SermonNote[] }) {
  return (
    <SermonSectionCard>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Your notes</h2>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container text-[11px] font-extrabold uppercase tracking-wider">
          <span className="material-symbols-outlined text-sm">edit_note</span>
          Personal
        </span>
      </div>

      <div className="flex flex-col gap-3 mb-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-secondary-container/10 rounded-2xl px-4 py-3.5"
          >
            <p className="text-base italic">&quot;{note.content}&quot;</p>
            <p className="text-xs text-on-surface-variant font-medium mt-2">
              {formatShortDate(note.created_at)}
            </p>
          </div>
        ))}
      </div>

      <textarea
        placeholder="Add a personal reflection..."
        rows={3}
        className="w-full bg-surface-container-low rounded-2xl px-4 py-3 text-base outline-none border-2 border-transparent focus:border-secondary-container resize-none placeholder:text-on-surface-variant/60"
      />
    </SermonSectionCard>
  );
}