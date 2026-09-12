"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/api/auth";
import type { User } from "@/lib/api/types";

/**
 * Shows the signed-in user's name/email and a logout action. A Client
 * Component since logout is a user-triggered mutation (POST /v1/auth/
 * logout) followed by a redirect - the user data itself is fetched
 * server-side by the parent layout and passed in as a prop.
 */
export function SidebarUserMenu({ user }: { user: User }) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    try {
      await signOut();
    } finally {
      // Redirect regardless of whether the request succeeded - if it
      // failed, the session cookie may still be stale/invalid locally,
      // and sending the user to sign-in is the safer default either way.
      router.push("/sign-in");
      router.refresh();
    }
  }

  const displayName = user.full_name ?? user.email;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-2.5 px-2 py-2 rounded-xl">
      {user.avatar_url ? (
        // eslint-disable-next-line @next/next/no-img-element -- external
        // Google avatar URLs aren't in next.config's image domains list
        <img
          src={user.avatar_url}
          alt=""
          className="w-9 h-9 rounded-full flex-shrink-0"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-tertiary-container/30 text-tertiary font-bold flex items-center justify-center flex-shrink-0">
          {initial}
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold truncate">{displayName}</p>
        <p className="text-xs text-on-surface-variant truncate">{user.email}</p>
      </div>

      <button
        onClick={handleSignOut}
        disabled={isSigningOut}
        title="Sign out"
        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors disabled:opacity-50"
      >
        <span className="material-symbols-outlined text-[20px]">logout</span>
      </button>
    </div>
  );
}