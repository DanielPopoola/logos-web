import { SermonCard } from "@/components/library/SermonCard";
import { EmptyLibraryState } from "@/components/library/EmptyLibraryState";
import { getLibrary } from "@/lib/api/sermons";

// Always fetch fresh - a user's library changes on every submit/delete and
// there's no caching strategy defined yet. Revisit if the read-heavy NFR
// in design-doc.md calls for a smarter caching layer later.
export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  const library = await getLibrary();

  return (
    <main className="px-6 md:px-10 py-6 md:py-10 max-w-[1100px]">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight mb-1">
          Your library
        </h1>
        <p className="text-on-surface-variant">
          {library.total} {library.total === 1 ? "sermon" : "sermons"} saved
        </p>
      </header>

      {library.items.length === 0 ? (
        <EmptyLibraryState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {library.items.map((sermon) => (
            <SermonCard key={sermon.id} sermon={sermon} />
          ))}
        </div>
      )}
    </main>
  );
}