"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/library", label: "Library", icon: "local_library" },
  { href: "/search", label: "Semantic Search", icon: "search" },
  { href: "/ask", label: "Ask", icon: "auto_awesome", badge: "AI" },
];

/**
 * Nav links with active-state highlighting. Isolated as its own Client
 * Component (usePathname() requires one) so AppSidebar itself can stay a
 * Server Component and fetch the real user - only this small piece needs
 * to know about client-side routing state.
 */
export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => (
        <NavLink key={item.href} item={item} isActive={pathname === item.href} />
      ))}
    </nav>
  );
}

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-colors text-sm ${
        isActive
          ? "bg-surface-container text-primary font-bold"
          : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-semibold"
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`material-symbols-outlined text-[22px] ${
            item.icon === "auto_awesome" ? "text-tertiary" : ""
          }`}
        >
          {item.icon}
        </span>
        {item.label}
      </span>
      {item.badge && (
        <span className="px-2 py-0.5 rounded-full bg-tertiary-container/30 text-tertiary text-[10px] font-extrabold">
          {item.badge}
        </span>
      )}
    </Link>
  );
}