export function SermonSectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-surface-container-lowest rounded-3xl p-6 md:p-8 mb-5 shadow-[0_2px_16px_-4px_rgba(43,36,32,0.05)] ${className}`}
    >
      {children}
    </div>
  );
}