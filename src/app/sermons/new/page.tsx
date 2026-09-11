import Link from "next/link";
import { AppSidebar } from "@/components/shell/AppSidebar";
import { AddSermonForm } from "@/components/sermon/AddSermonForm";

export default function AddSermonPage() {
  return (
    <>
      <AppSidebar activePath="/sermons/new" />
      <main className="ml-[260px] min-h-screen px-10 py-10 max-w-[640px] flex flex-col justify-center">
        <Link
          href="/library"
          className="inline-flex items-center gap-1 text-sm font-semibold text-on-surface-variant hover:text-on-surface mb-8 self-start"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Library
        </Link>

        <h1 className="text-3xl font-extrabold tracking-tight mb-2">
          Add a sermon
        </h1>
        <p className="text-on-surface-variant mb-8">
          Paste a YouTube link to get started.
        </p>

        <AddSermonForm />
      </main>
    </>
  );
}