import Link from "next/link";

/**
 * Rendered automatically by Next.js when notFound() is called inside
 * app/sermons/[sermonId]/page.tsx - e.g. when GET /v1/sermons/{id}
 * returns 404 (sermon exists but isn't in this user's library, or
 * doesn't exist at all - the backend intentionally doesn't distinguish
 * these per design-doc.md, to avoid leaking existence).
 */
export default function SermonNotFound() {
  return (
    <div className="ml-[260px] min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-2xl font-extrabold tracking-tight mb-2">
        Sermon not found
      </h1>
      <p className="text-on-surface-variant max-w-sm mb-8">
        This sermon isn&apos;t in your library, or doesn&apos;t exist.
      </p>
      <Link
        href="/library"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-container text-on-primary font-bold text-sm hover:-translate-y-px transition-all"
      >
        Back to library
      </Link>
    </div>
  );
}