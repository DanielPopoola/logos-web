"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface SidebarState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const SidebarContext = createContext<SidebarState | null>(null);

/**
 * Provides open/close state for the mobile sidebar drawer, shared between
 * the hamburger trigger (in MobileTopBar) and the sidebar itself
 * (AppSidebar), which live in different parts of the tree. Desktop
 * ignores this entirely - the sidebar is always visible there via CSS
 * (md:translate-x-0), regardless of isOpen.
 */
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SidebarContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarState {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}