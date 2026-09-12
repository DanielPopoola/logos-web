"use client";

import Link from "next/link";
import type { User } from "@/lib/api/types";
import { SidebarNav } from "@/components/shell/SidebarNav";
import { SidebarUserMenu } from "@/components/shell/SidebarUserMenu";
import { useSidebar } from "@/components/shell/SidebarContext";

/**
 * Sidebar shown on every authenticated screen (Library, Search, Ask,
 * Sermon Detail, ...). Rendered once by the (app) route group's layout,
 * which fetches `user` server-side.
 *
 * Responsive behavior: fixed and always visible on desktop (md: and up).
 * Below that, it's an off-canvas drawer - translated fully off-screen by
 * default, slid in via useSidebar()'s isOpen state, with a backdrop to
 * dismiss. This is a Client Component (needs the shared open/close state
 * and touch/click handling for the backdrop), unlike the original
 * Server Component version - the two pieces that specifically need
 * client behavior (nav active-state, logout) stay factored into their
 * own small components regardless.
 */
export function AppSidebar({ user }: { user: User }) {
  const { isOpen, close } = useSidebar();

  return (
    <>
      {isOpen && (
        <button
          aria-label="Close menu"
          onClick={close}
          className="md:hidden fixed inset-0 bg-on-surface/40 z-40"
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen w-[260px] bg-surface-container-lowest z-50 flex flex-col justify-between p-4 shadow-[0_4px_20px_-2px_rgba(43,36,32,0.04)] transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 px-2 pt-2">
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center flex-shrink-0">
              <svg className="w-4.5 h-4.5 text-on-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">Logos</span>
            <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container text-[11px] font-extrabold uppercase tracking-wider">
              Personal
            </span>
          </div>

          <Link
            href="/sermons/new"
            onClick={close}
            className="w-full flex items-center justify-center gap-2 bg-primary-container text-on-primary py-3 px-4 rounded-full font-bold text-sm shadow-[0_4px_20px_-2px_rgba(255,90,54,0.35)] hover:-translate-y-px transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Add Sermon
          </Link>

          <SidebarNav onNavigate={close} />
        </div>

        <SidebarUserMenu user={user} />
      </aside>
    </>
  );
}