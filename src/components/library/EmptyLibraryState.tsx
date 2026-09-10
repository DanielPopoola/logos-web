import Link from "next/link";

/** Shown in place of the sermon grid when a user has zero sermons saved yet. */
export function EmptyLibraryState() {
  return (
    <div className="flex flex-col items-center text-center py-24 px-6">
      <div className="w-16 h-16 rounded-2xl bg-primary-container/15 text-primary flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-[32px]">local_library</span>
      </div>
      <h2 className="text-2xl font-extrabold tracking-tight mb-2">
        Your library is empty
      </h2>
      <p className="text-on-surface-variant max-w-sm mb-8">
        Paste your first sermon link and Logos will turn it into a summary,
        key teachings, and searchable notes.
      </p>
      <Link
        href="/sermons/new"
        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-container text-on-primary font-bold shadow-[0_4px_24px_-2px_rgba(255,90,54,0.35)] hover:-translate-y-0.5 transition-all"
      >
        <span className="material-symbols-outlined text-[20px]">add</span>
        Add your first sermon
      </Link>
    </div>
  );
}