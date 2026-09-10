interface Step {
  number: number;
  icon: string;
  iconColorClass: string;
  badgeColorClass: string;
  title: string;
  description: string;
  footnoteIcon: string;
  footnote: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    icon: "play_circle",
    iconColorClass: "text-primary-container",
    badgeColorClass: "bg-surface-container-high text-on-surface",
    title: "Paste a link",
    description: "Drop in a sermon link from YouTube to start processing in seconds.",
    footnoteIcon: "link",
    footnote: "YouTube links only, for now",
  },
  {
    number: 2,
    icon: "auto_awesome",
    iconColorClass: "text-tertiary",
    badgeColorClass: "bg-tertiary-container/20 text-tertiary",
    title: "Logos listens and extracts",
    description:
      "The transcript is read and organized into a summary, key teachings, and Scripture references.",
    footnoteIcon: "check_circle",
    footnote: "Pinpoints clear references & quotes",
  },
  {
    number: 3,
    icon: "manage_search",
    iconColorClass: "text-secondary",
    badgeColorClass: "bg-secondary-container/30 text-on-secondary-container",
    title: "Search and revisit anytime",
    description:
      "Find exact moments by meaning, review what you learned, and add your own reflections.",
    footnoteIcon: "history_edu",
    footnote: "Available anywhere you sign in",
  },
];

export function HowItWorksSection() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-6">
        <div className="mb-16 text-center md:text-left">
          <span className="block mb-2 text-xs font-extrabold uppercase tracking-widest text-primary-container">
            Simple 3-step flow
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight">How it works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step }: { step: Step }) {
  return (
    <div className="bg-surface-container-lowest rounded-3xl p-8 flex flex-col justify-between shadow-[0_4px_20px_-2px_rgba(43,36,32,0.04)] hover:-translate-y-1 transition-all">
      <div>
        <div className="flex items-center justify-between mb-6">
          <span
            className={`w-10 h-10 rounded-full text-lg font-bold flex items-center justify-center ${step.badgeColorClass}`}
          >
            {step.number}
          </span>
          <span className={`material-symbols-outlined text-[28px] ${step.iconColorClass}`}>
            {step.icon}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
        <p className="text-on-surface-variant">{step.description}</p>
      </div>
      <div className={`mt-8 pt-4 flex items-center gap-2 text-sm font-semibold ${step.iconColorClass}`}>
        <span className="material-symbols-outlined text-base">{step.footnoteIcon}</span>
        <span>{step.footnote}</span>
      </div>
    </div>
  );
}