import { AppSidebar } from "@/components/shell/AppSidebar";
import { SearchPanel } from "@/components/search/SearchPanel";

export default function SearchPage() {
  return (
    <>
      <AppSidebar activePath="/search" />
      <main className="ml-[260px] min-h-screen px-10 py-10 max-w-[740px]">
        <h1 className="text-3xl font-extrabold tracking-tight mb-8">
          Search your library
        </h1>
        <SearchPanel />
      </main>
    </>
  );
}