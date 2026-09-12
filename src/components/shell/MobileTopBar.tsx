"use client";

import { useSidebar } from "@/components/shell/SidebarContext";

/**
 * Shown only below the md breakpoint, where the sidebar is collapsed into
 * an off-canvas drawer instead of being permanently visible. Gives the
 * brand a presence and a way to open the drawer when it's hidden.
 */
export function MobileTopBar() {
  const { open } = useSidebar();

  return (
    <header className="md:hidden sticky top-0 z-30 flex items-center gap-3 bg-surface-container-lowest px-4 py-3 shadow-[0_2px_12px_-2px_rgba(43,36,32,0.06)]">
      <button
        onClick={open}
        aria-label="Open menu"
        className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
      >
        <span className="material-symbols-outlined text-[24px]">menu</span>
      </button>
      <div className="w-7 h-7 rounded-lg bg-primary-container flex items-center justify-center flex-shrink-0">
        <svg className="w-3.5 h-3.5 text-on-primary" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" />
        </svg>
      </div>
      <span className="text-lg font-bold tracking-tight">Logos</span>
    </header>
  );
}