"use client";

import { useState, type FormEvent } from "react";
import { createNote } from "@/lib/api/sermons-client";
import { ApiError } from "@/lib/api/client";
import type { SermonNote } from "@/lib/api/types";

interface AddNoteFormProps {
  sermonId: string;
  onNoteCreated: (note: SermonNote) => void;
}

/**
 * Isolated as its own component (rather than inline in SermonNotesSection)
 * so only this small piece needs "use client" - the notes list itself can
 * stay simple, and the parent server component tree isn't forced client-
 * side just because one textarea needs local state.
 */
export function AddNoteForm({ sermonId, onNoteCreated }: AddNoteFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const note = await createNote(sermonId, trimmed);
      onNoteCreated(note);
      setContent("");
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Couldn't save that note. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a personal reflection..."
        rows={3}
        disabled={isSubmitting}
        className="w-full bg-surface-container-low rounded-2xl px-4 py-3 text-base outline-none border-2 border-transparent focus:border-secondary-container resize-none placeholder:text-on-surface-variant/60 disabled:opacity-60"
      />
      {error && (
        <p className="mt-2 text-sm text-on-error-container bg-error-container rounded-xl px-3 py-2">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={isSubmitting || content.trim().length === 0}
        className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-bold text-sm hover:bg-secondary-container/55 transition-all disabled:opacity-50 disabled:pointer-events-none"
      >
        {isSubmitting ? "Saving..." : "Save note"}
      </button>
    </form>
  );
}