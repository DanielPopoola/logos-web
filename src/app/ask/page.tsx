import { AppSidebar } from "@/components/shell/AppSidebar";
import { AskPanel } from "@/components/ask/AskPanel";

export default function AskPage() {
  return (
    <>
      <AppSidebar activePath="/ask" />
      <main className="ml-[260px] min-h-screen px-10 py-10 max-w-[740px]">
        <h1 className="text-3xl font-extrabold tracking-tight mb-8">Ask</h1>
        <AskPanel />
      </main>
    </>
  );
}