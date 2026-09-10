import Link from "next/link";
import { GoogleIcon } from "@/components/icons/GoogleIcon";

export function ClosingCtaSection() {
  return (
    <section className="w-full py-24 mb-8">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-6">
        <div className="relative overflow-hidden bg-gradient-to-b from-surface-container-low to-surface-container rounded-3xl p-8 md:p-20 text-center flex flex-col items-center shadow-sm">
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl -z-10" />

          <span className="w-12 h-12 rounded-2xl bg-surface-container-lowest text-primary-container shadow-sm flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-[28px]">local_library</span>
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight max-w-2xl mb-2">
            Start building your personal sermon library
          </h2>
          <p className="text-lg text-on-surface-variant max-w-xl mb-8">
            Paste your first sermon and see your takeaways in a few minutes.
          </p>

          <Link
            href="/sign-in"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary-container text-on-primary font-bold shadow-[0_4px_24px_-2px_rgba(255,90,54,0.35)] hover:shadow-[0_8px_32px_-2px_rgba(255,90,54,0.5)] hover:-translate-y-0.5 transition-all mb-4"
          >
            <GoogleIcon className="w-5 h-5" />
            Get started with Google
          </Link>

          <p className="text-sm text-on-surface-variant/70">
            Logos — a personal project for remembering what you hear.
          </p>
        </div>
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer className="w-full py-6">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-on-surface-variant text-sm opacity-80">
        <p>Logos</p>
      </div>
    </footer>
  );
}