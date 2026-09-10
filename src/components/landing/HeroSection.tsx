import Link from "next/link";

/**
 * Hero section: headline, CTA, and a static visual mockup showing what a
 * processed sermon looks like (AI takeaway card + personal note card).
 * The mockup content is illustrative placeholder data, not live.
 */
export function HeroSection() {
  return (
    <section className="w-full pt-8 md:pt-12 pb-16 md:pb-24">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-6 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-container-high shadow-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-on-surface-variant">
            Thoughtful listening companion
          </span>
        </div>

        <h1 className="max-w-4xl text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Turn every sermon you hear into a personal, searchable library.
        </h1>

        <p className="max-w-2xl text-lg text-on-surface-variant mb-8">
          Paste a YouTube link to get a structured breakdown of teachings and
          themes, then search or revisit what you heard anytime — with your
          own private notes right alongside.
        </p>

        <div className="flex flex-col items-center gap-2 mb-20">
          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-container text-on-primary font-bold shadow-[0_4px_24px_-2px_rgba(255,90,54,0.35)] hover:shadow-[0_8px_32px_-2px_rgba(255,90,54,0.5)] hover:-translate-y-0.5 transition-all"
          >
            Get started
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
          <span className="text-sm text-on-surface-variant/80 mt-1">
            Sign in with Google
          </span>
        </div>

        <SermonBreakdownPreview />
      </div>
    </section>
  );
}

/** Static illustration of a processed sermon: AI takeaway + a personal note. */
function SermonBreakdownPreview() {
  return (
    <div className="w-full max-w-4xl bg-surface-container-lowest rounded-3xl p-4 md:p-8 shadow-[0_16px_40px_-8px_rgba(43,36,32,0.06),0_4px_12px_-2px_rgba(43,36,32,0.03)] text-left">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-2 bg-surface-container-low rounded-2xl sm:rounded-full gap-2 mb-8">
        <div className="flex items-center gap-3 px-4 py-1 text-on-surface-variant min-w-0 flex-1">
          <span className="material-symbols-outlined text-[#ff0000] text-2xl">smart_display</span>
          <span className="text-sm truncate text-on-surface font-medium">
            https://youtube.com/watch?v=example
          </span>
        </div>
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary-container text-on-primary text-xs font-bold">
          <span className="material-symbols-outlined text-base">bolt</span>
          Extracting takeaways
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-4 bg-surface-container rounded-2xl p-4 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container text-[11px] font-extrabold uppercase">
                Romans 8:28
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[15px]">schedule</span> 38m
              </span>
            </div>
            <h3 className="text-lg font-bold mb-1">The Architecture of Hope</h3>
            <p className="text-sm text-on-surface-variant">Grace City Community</p>
          </div>
          <div className="mt-8 pt-4">
            <div className="flex justify-between text-xs text-on-surface-variant mb-1">
              <span>14:20</span>
              <span className="text-primary font-semibold">Active point</span>
            </div>
            <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-primary-container rounded-full w-2/5" />
            </div>
          </div>
        </div>

        <div className="md:col-span-8 flex flex-col gap-4">
          <div className="bg-tertiary-container/10 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary text-[11px] font-extrabold uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                Structured takeaway
              </div>
              <span className="text-xs text-tertiary font-semibold">14:20</span>
            </div>
            <p className="text-lg font-bold mb-1">
              Hope as an anchor rather than wishful thinking
            </p>
            <p className="text-sm text-on-surface-variant">
              Biblical hope operates not as passive optimism, but as an active
              conviction rooted in past faithfulness.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {["Endurance", "Suffering & Purpose", "Hebrews 6:19"].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-surface-container-lowest text-on-surface-variant text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-secondary-container/15 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container/30 text-on-secondary-container text-[11px] font-extrabold uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">edit_note</span>
                My reflection
              </div>
            </div>
            <p className="text-base italic text-on-surface">
              &quot;Remember this contrast during stressful sprint reviews.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}