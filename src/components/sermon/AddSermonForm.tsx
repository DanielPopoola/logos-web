"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { submitSermon } from "@/lib/api/sermons-client";
import { ApiError } from "@/lib/api/client";

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string };

/**
 * Handles all 3 outcomes app/api/sermons.py's create_sermon can return:
 * a brand new sermon (pending), one that's already in this user's library
 * (any status), or one that's processing elsewhere and just got linked in.
 * In every case the sermon now exists in the user's library, so the
 * simplest correct behavior is the same: go to its detail page and let
 * that page's own pending/processing/completed handling take over from
 * there, rather than duplicating status logic here.
 */
export function AddSermonForm() {
  const router = useRouter();
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [state, setState] = useState<SubmitState>({ kind: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ kind: "submitting" });

    try {
      const sermon = await submitSermon(youtubeUrl.trim());
      router.push(`/sermons/${sermon.id}`);
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Something went wrong submitting that link. Please try again.";
      setState({ kind: "error", message });
    }
  }

  const isSubmitting = state.kind === "submitting";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <label htmlFor="youtube-url" className="block text-sm font-bold mb-2">
        YouTube link
      </label>
      <input
        id="youtube-url"
        type="url"
        required
        placeholder="https://youtube.com/watch?v=..."
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        disabled={isSubmitting}
        className="w-full bg-surface-container-low rounded-2xl px-4 py-3.5 text-base outline-none border-2 border-transparent focus:border-primary-container disabled:opacity-60"
      />

      {state.kind === "error" && (
        <p className="mt-3 text-sm text-on-error-container bg-error-container rounded-xl px-4 py-2.5">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || youtubeUrl.trim().length === 0}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary-container text-on-primary font-bold text-sm shadow-[0_4px_20px_-2px_rgba(255,90,54,0.35)] hover:-translate-y-px transition-all disabled:opacity-50 disabled:pointer-events-none"
      >
        {isSubmitting ? "Submitting..." : "Add sermon"}
      </button>

      <p className="mt-4 text-sm text-on-surface-variant">
        Logos will transcribe and analyze it in the background — usually a
        couple of minutes. You can keep browsing while it processes.
      </p>
    </form>
  );
}