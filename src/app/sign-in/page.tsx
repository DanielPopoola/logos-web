import Link from "next/link";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { googleSignInUrl } from "@/lib/api/auth";

export default function SignInPage() {
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl bg-surface-container-lowest p-8 sm:p-12 shadow-xl shadow-on-surface/[0.04]">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center">
              <svg className="w-6 h-6 text-on-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight">Logos</span>
              <span className="bg-surface-container-high text-on-surface-variant text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full">
                Personal
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-3">Welcome to Logos</h1>
          <p className="text-on-surface-variant">
            Your personal library of everything you&apos;ve heard.
          </p>
        </div>

        <div className="relative my-7 flex items-center justify-center">
          <div className="w-full h-px bg-surface-container-highest" />
          <span className="absolute px-3 bg-surface-container-lowest text-outline text-[11px] font-extrabold uppercase tracking-wider">
            Sign in with
          </span>
        </div>

        {/*
          Plain navigation, not a client-side click handler: the backend
          owns the entire OAuth redirect chain (see auth.py), so this link
          just needs to send the browser there. No JS needed for this step.
        */}
        <Link
          href={googleSignInUrl()}
          className="w-full py-3.5 inline-flex items-center justify-center gap-3 rounded-full bg-surface-container-low text-on-surface font-bold text-sm hover:bg-surface-container transition-all active:scale-[0.98]"
        >
          <GoogleIcon />
          Continue with Google
        </Link>

        <div className="mt-8 rounded-2xl bg-surface-container-low/40 p-4 flex items-start gap-3">
          <span className="material-symbols-outlined text-outline text-lg flex-shrink-0 mt-0.5">
            lock
          </span>
          <p className="text-sm text-outline">
            Logos is private to you. We only access sermons you choose to paste.
          </p>
        </div>
      </div>
    </main>
  );
}
