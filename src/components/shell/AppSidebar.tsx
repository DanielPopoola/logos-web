import Link from "next/link";

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

interface AppSidebarProps {
  /** Path of the currently active screen, used to highlight the matching nav item. */
  activePath: string;
}

/**
 * Fixed left sidebar shown on every authenticated screen (Library, Search,
 * Ask, Sermon Detail, ...). Matches the nav shell from the approved Stitch
 * mockups. User info here is a placeholder until a user-context/profile
 * fetch is wired up.
 */
export function AppSidebar({ activePath }: AppSidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-surface-container-lowest z-50 flex flex-col justify-between p-4 shadow-[0_4px_20px_-2px_rgba(43,36,32,0.04)]">
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
          className="w-full flex items-center justify-center gap-2 bg-primary-container text-on-primary py-3 px-4 rounded-full font-bold text-sm shadow-[0_4px_20px_-2px_rgba(255,90,54,0.35)] hover:-translate-y-px transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Sermon
        </Link>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} item={item} isActive={activePath === item.href} />
          ))}
        </nav>
      </div>
    </aside>
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