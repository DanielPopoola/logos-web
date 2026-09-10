import { notFound } from "next/navigation";
import { AppSidebar } from "@/components/shell/AppSidebar";
import { SermonHeader } from "@/components/sermon/SermonHeader";
import { SermonAnalysisSection } from "@/components/sermon/SermonAnalysisSection";
import { SermonNotesSection } from "@/components/sermon/SermonNotesSection";
import { SermonProcessingState } from "@/components/sermon/SermonProcessingState";
import { getSermonDetail } from "@/lib/api/sermons";

export const dynamic = "force-dynamic";

interface SermonDetailPageProps {
  params: Promise<{ sermonId: string }>;
}

export default async function SermonDetailPage({ params }: SermonDetailPageProps) {
  const { sermonId } = await params;
  const result = await getSermonDetail(sermonId);

  if (result.kind === "not_found") {
    notFound();
  }

  return (
    <>
      <AppSidebar activePath="/library" />
      <main className="ml-[260px] min-h-screen px-10 py-10 max-w-[760px]">
        {result.kind === "processing" ? (
          <SermonProcessingState />
        ) : (
          <>
            <SermonHeader sermon={result.sermon} />
            {result.sermon.analysis && (
              <SermonAnalysisSection
                analysis={result.sermon.analysis}
                themes={result.sermon.themes}
                bibleReferences={result.sermon.bible_references}
              />
            )}
            <SermonNotesSection notes={result.sermon.notes} />
          </>
        )}
      </main>
    </>
  );
}