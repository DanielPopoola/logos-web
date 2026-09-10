import type { SermonAnalysis } from "@/lib/api/types";
import { AiGeneratedBadge } from "@/components/sermon/AiGeneratedBadge";
import { SermonSectionCard } from "@/components/sermon/SermonSectionCard";

interface SermonAnalysisSectionProps {
  analysis: SermonAnalysis;
  themes: string[];
  bibleReferences: string[];
}

/**
 * Everything Logos generated from the transcript. All of this is
 * AI-generated interpretation, not the preacher's exact words - kept
 * visually distinct from the user's own notes (see SermonNotesSection)
 * per design-doc.md's stated goal of not blurring the two.
 */
export function SermonAnalysisSection({
  analysis,
  themes,
  bibleReferences,
}: SermonAnalysisSectionProps) {
  return (
    <>
      <SermonSectionCard>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Summary</h2>
          <AiGeneratedBadge />
        </div>
        <p className="text-base leading-relaxed text-on-surface-variant">
          {analysis.summary}
        </p>
      </SermonSectionCard>

      <SermonSectionCard>
        <h2 className="text-lg font-bold mb-4">Key teachings</h2>
        <ol className="flex flex-col gap-4">
          {analysis.key_teachings.map((teaching, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-tertiary-container/20 text-tertiary text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-base leading-relaxed pt-0.5">{teaching}</span>
            </li>
          ))}
        </ol>
      </SermonSectionCard>

      {(themes.length > 0 || bibleReferences.length > 0) && (
        <SermonSectionCard>
          <h2 className="text-lg font-bold mb-4">Themes & references</h2>
          <div className="flex flex-wrap gap-2">
            {themes.map((theme) => (
              <span
                key={theme}
                className="text-xs font-bold rounded-full px-3 py-1.5 bg-primary-container/15 text-primary"
              >
                {theme}
              </span>
            ))}
            {bibleReferences.map((ref) => (
              <span
                key={ref}
                className="text-xs font-bold rounded-full px-3 py-1.5 bg-secondary-container/30 text-on-secondary-container"
              >
                {ref}
              </span>
            ))}
          </div>
        </SermonSectionCard>
      )}

      {analysis.reflection_questions.length > 0 && (
        <SermonSectionCard>
          <h2 className="text-lg font-bold mb-4">Reflection</h2>
          <div className="flex flex-col gap-3">
            {analysis.reflection_questions.map((question, i) => (
              <p
                key={i}
                className="text-base italic text-on-surface-variant bg-surface-container-low rounded-2xl px-4 py-3"
              >
                {question}
              </p>
            ))}
          </div>
        </SermonSectionCard>
      )}
    </>
  );
}