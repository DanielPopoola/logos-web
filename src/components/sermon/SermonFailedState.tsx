"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { retrySermon } from "@/lib/api/sermons-client";
import { ApiError } from "@/lib/api/client";

interface SermonFailedStateProps {
  sermonId: string;
  failureReason: string | null;
}

/**
 * Shown when a sermon's status is "failed". Displays the real
 * failure_reason from the backend rather than a generic message here
 * (unlike the library card, which can't - LibraryItemOut doesn't include
 * this field, only SermonDetailOut does).
 */
export function SermonFailedState({ sermonId, failureReason }: SermonFailedStateProps) {
  const router = useRouter();
  const [isRetrying, setIsRetrying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRetry() {
    setIsRetrying(true);
    setError(null);
    try {
      await retrySermon(sermonId);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Couldn't retry this sermon. Please try again.",
      );
      setIsRetrying(false);
    }
  }

  return (
    <div className="flex flex-col items-center text-center py-24 px-6">
      <div className="w-16 h-16 rounded-2xl bg-error-container text-on-error-container flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-[32px]">error</span>
      </div>
      <h2 className="text-2xl font-extrabold tracking-tight mb-2">
        Couldn&apos;t process this sermon
      </h2>
      <p className="text-on-surface-variant max-w-sm mb-2">
        {failureReason ?? "Something went wrong during processing."}
      </p>
      {error && (
        <p className="text-sm text-on-error-container bg-error-container rounded-xl px-4 py-2.5 mt-4 max-w-sm">
          {error}
        </p>
      )}
      <button
        onClick={handleRetry}
        disabled={isRetrying}
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-container text-on-primary font-bold text-sm hover:-translate-y-px transition-all disabled:opacity-50 disabled:pointer-events-none"
      >
        <span className="material-symbols-outlined text-[18px]">refresh</span>
        {isRetrying ? "Retrying..." : "Retry"}
      </button>
    </div>
  );
}