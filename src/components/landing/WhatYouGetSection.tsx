interface Pillar {
  icon: string;
  iconWrapperClass: string;
  iconColorClass: string;
  title: string;
  description: string;
  detail: React.ReactNode;
}

const PILLARS: Pillar[] = [
  {
    icon: "format_list_bulleted",
    iconWrapperClass: "bg-primary-container/15",
    iconColorClass: "text-primary",
    title: "Structured takeaways",
    description:
      "A clear summary, key teachings in order, recurring themes, and referenced Bible passages — ready to read in two minutes.",
    detail: (
      <DetailList
        dotColorClass="bg-primary"
        items={["Core thesis in one sentence", "Ordered key teachings", "Scripture cross-references"]}
      />
    ),
  },
  {
    icon: "auto_awesome",
    iconWrapperClass: "bg-tertiary-container/20",
    iconColorClass: "text-tertiary",
    title: "Search by meaning, not just keywords",
    description:
      "Ask questions or describe an idea in your own words. Logos pulls the matching passage and a jump-to timestamp from your saved sermons.",
    detail: (
      <div className="mt-8 p-4 bg-surface-container-low rounded-2xl flex flex-col gap-2">
        <div className="text-xs font-bold uppercase text-tertiary tracking-wider">
          Query example
        </div>
        <p className="text-sm italic">
          &quot;Where did they discuss anxiety about career decisions?&quot;
        </p>
        <div className="inline-flex items-center gap-1 text-xs text-on-surface-variant font-medium">
          <span className="material-symbols-outlined text-base text-tertiary">timer</span>
          Returns the moment it was mentioned
        </div>
      </div>
    ),
  },
  {
    icon: "edit_note",
    iconWrapperClass: "bg-secondary-container/30",
    iconColorClass: "text-on-secondary-container",
    title: "Your own notes kept alongside",
    description:
      "Write personal thoughts and reflections on any sermon in your library. Your notes stay private to you.",
    detail: (
      <DetailList
        dotColorClass="bg-secondary"
        items={["Private to your account", "Kept separate from AI-generated content"]}
      />
    ),
  },
];

export function WhatYouGetSection() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-6">
        <div className="mb-16 text-center md:text-left">
          <span className="block mb-2 text-xs font-extrabold uppercase tracking-widest text-primary-container">
            Designed for focus
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight">What you get</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-surface-container-lowest rounded-3xl p-8 flex flex-col justify-between shadow-[0_4px_20px_-2px_rgba(43,36,32,0.04)]"
            >
              <div>
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${pillar.iconWrapperClass} ${pillar.iconColorClass}`}
                >
                  <span className="material-symbols-outlined text-[26px]">{pillar.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                <p className="text-on-surface-variant">{pillar.description}</p>
              </div>
              {pillar.detail}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DetailList({ items, dotColorClass }: { items: string[]; dotColorClass: string }) {
  return (
    <div className="mt-8 p-4 bg-surface-container-low rounded-2xl flex flex-col gap-2">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${dotColorClass}`} />
          <span className="text-sm font-semibold">{item}</span>
        </div>
      ))}
    </div>
  );
}