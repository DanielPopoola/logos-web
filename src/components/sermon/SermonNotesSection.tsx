"use client";

import { useState } from "react";
import type { SermonNote } from "@/lib/api/types";
import { formatShortDate } from "@/lib/format";
import { SermonSectionCard } from "@/components/sermon/SermonSectionCard";
import { AddNoteForm } from "@/components/sermon/AddNoteForm";

interface SermonNotesSectionProps {
  sermonId: string;
  initialNotes: SermonNote[];
}

/**
 * The user's own notes on this sermon - the only place notes live (there's
 * no standalone notes list page/endpoint). Kept visually distinct from
 * SermonAnalysisSection: amber/secondary + edit_note icon here, vs.
 * indigo/tertiary + auto_awesome there, per the design system's signifier
 * convention.
 *
 * This is a Client Component (holds notes-list state so a newly-created
 * note appears immediately without a full page refetch), seeded from the
 * server-rendered initialNotes prop.
 */
export function SermonNotesSection({ sermonId, initialNotes }: SermonNotesSectionProps) {
  const [notes, setNotes] = useState(initialNotes);

  function handleNoteCreated(note: SermonNote) {
    setNotes((current) => [note, ...current]);
  }

  return (
    <SermonSectionCard>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Your notes</h2>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container text-[11px] font-extrabold uppercase tracking-wider">
          <span className="material-symbols-outlined text-sm">edit_note</span>
          Personal
        </span>
      </div>

      {notes.length > 0 && (
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
      )}

      <AddNoteForm sermonId={sermonId} onNoteCreated={handleNoteCreated} />
    </SermonSectionCard>
  );
}