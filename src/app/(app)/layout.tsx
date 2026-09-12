import { redirect } from "next/navigation";
import { getCurrentUserServer } from "@/lib/api/server-auth";
import { AppSidebar } from "@/components/shell/AppSidebar";
import { MobileTopBar } from "@/components/shell/MobileTopBar";
import { SidebarProvider } from "@/components/shell/SidebarContext";

/**
 * Layout for every authenticated screen (Library, Search, Ask, Sermon
 * Detail/New - anything under the (app) route group). Fetches the current
 * user exactly once per navigation and:
 *   - redirects to /sign-in if there's no valid session
 *   - renders the sidebar with the real signed-in user
 *   - owns the responsive content offset (ml-0 on mobile, md:ml-[260px]
 *     on desktop) so individual pages don't each hardcode the sidebar
 *     width - previously every page repeated `ml-[260px]` itself with no
 *     mobile fallback, which is what made everything except the
 *     sidebar-free landing/sign-in pages non-responsive.
 *
 * Below md, the sidebar becomes an off-canvas drawer (see AppSidebar +
 * SidebarContext) triggered by MobileTopBar's hamburger button.
 */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUserServer();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <div className="md:ml-[260px] min-h-screen flex flex-col">
        <MobileTopBar />
        <div className="flex-1">{children}</div>
      </div>
    </SidebarProvider>
  );
}