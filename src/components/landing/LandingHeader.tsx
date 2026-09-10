import Link from "next/link";

/** Minimal header for the unauthenticated landing page: wordmark + sign-in. */
export function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/85 backdrop-blur-md shadow-[0_2px_16px_rgba(43,36,32,0.04)]">
      <div className="h-20 max-w-[1240px] mx-auto px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
            <svg className="w-4.5 h-4.5 text-on-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">Logos</span>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-extrabold uppercase tracking-wider">
            Personal
          </span>
        </div>
        <Link
          href="/sign-in"
          className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-primary-container text-on-primary text-sm font-bold shadow-[0_4px_20px_-2px_rgba(43,36,32,0.08)] hover:shadow-[0_8px_24px_-2px_rgba(255,90,54,0.3)] hover:-translate-y-0.5 transition-all"
        >
          Sign in
        </Link>
      </div>
    </header>
  );
}