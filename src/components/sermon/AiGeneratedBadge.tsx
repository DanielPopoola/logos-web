/**
 * Small badge marking a block of content as AI-generated (summary, key
 * teachings, themes, etc.), as opposed to something the user wrote
 * themselves. design-doc.md calls this distinction out as a product
 * requirement, not a style choice - keep this component's look consistent
 * everywhere it's used rather than reimplementing similar badges inline.
 */
export function AiGeneratedBadge({ label = "AI-generated" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-tertiary-container/20 text-tertiary text-[11px] font-extrabold uppercase tracking-wider">
      <span className="material-symbols-outlined text-sm">auto_awesome</span>
      {label}
    </span>
  );
}