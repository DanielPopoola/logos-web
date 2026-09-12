import { AskPanel } from "@/components/ask/AskPanel";

export default function AskPage() {
  return (
    <main className="px-6 md:px-10 py-6 md:py-10 max-w-[740px]">
      <h1 className="text-3xl font-extrabold tracking-tight mb-8">Ask</h1>
      <AskPanel />
    </main>
  );
}