import { redirect } from "next/navigation";
import { getCurrentUserServer } from "@/lib/api/server-auth";
import { AppSidebar } from "@/components/shell/AppSidebar";

/**
 * Layout for every authenticated screen (Library, Search, Ask, Sermon
 * Detail/New - anything under the (app) route group). Fetches the current
 * user exactly once per navigation and:
 *   - redirects to /sign-in if there's no valid session, which none of
 *     these pages previously checked for on their own (they'd throw an
 *     uncaught 401 ApiError instead)
 *   - renders the sidebar with the real signed-in user, replacing the
 *     placeholder that used to be hardcoded/absent
 *
 * Individual pages no longer render <AppSidebar> themselves - this layout
 * does it once, and pages only render their own main content.
 */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUserServer();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <>
      <AppSidebar user={user} />
      {children}
    </>
  );
}