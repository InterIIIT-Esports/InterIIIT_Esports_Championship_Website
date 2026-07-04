import React from "react";

const themes = {
  amber: {
    border: "border-amber-400/50",
    label: "text-amber-300",
    card: "hover:border-amber-400/40 hover:bg-amber-400/[0.05]",
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    number: "text-amber-300",
  },
  red: {
    border: "border-red-500/50",
    label: "text-red-300",
    card: "hover:border-red-500/40 hover:bg-red-500/[0.05]",
    badge: "border-red-500/30 bg-red-500/10 text-red-200",
    number: "text-red-300",
  },
  blue: {
    border: "border-sky-400/50",
    label: "text-sky-300",
    card: "hover:border-sky-400/40 hover:bg-sky-400/[0.05]",
    badge: "border-sky-400/30 bg-sky-400/10 text-sky-200",
    number: "text-sky-300",
  },
};

export default function EventStructure({ theme = "red" }) {
  const colors = themes[theme] || themes.red;
  const stages = [
    {
      title: "Intra-IIIT",
      desc: "Internal college qualifiers",
      qualify: "Top 2 Teams",
      details:
        "The first stage where registered squads compete within their institute for two qualification spots.",
    },
    {
      title: "Group Stage",
      desc: "3-4 Groups | 4-5 Matches",
      qualify: "Top 2 / Group",
      details:
        "Qualified teams are split into groups and accumulate points across several round-based matches.",
    },
    {
      title: "Grand Finals",
      desc: "6-8 Teams | 3 Matches",
      qualify: "Highest Points",
      details:
        "The surviving teams battle through the final matches, with standings decided by total points.",
    },
    {
      title: "Champion",
      desc: "IEC Championship 2026",
      qualify: "Winner",
      details:
        "The team with the strongest aggregate score is crowned the champion of the event.",
    },
  ];

  return (
    <section className="bg-black py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`max-w-2xl border-l pl-4 ${colors.border}`}>
          <p className={`text-[10px] font-semibold uppercase tracking-[0.45em] ${colors.label}`}>
            Format Overview
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            Tournament Structure
          </h2>
          <p className="mt-3 text-sm leading-7 text-white/55 sm:text-base">
            A simple progression from qualifiers to finals, styled to match each game identity.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-4">
          {stages.map((stage, i) => (
            <article
              key={stage.title}
              className={`border border-white/10 bg-white/[0.03] p-5 transition duration-300 ${colors.card}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-2 text-base font-semibold uppercase tracking-wide text-white">
                    {stage.title}
                  </h3>
                </div>
                <span className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${colors.number}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-3 text-sm leading-7 text-white/60">
                {stage.desc}
              </p>

              <div className={`mt-4 inline-flex border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${colors.badge}`}>
                {stage.qualify}
              </div>

              <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-7 text-white/55">
                {stage.details}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
