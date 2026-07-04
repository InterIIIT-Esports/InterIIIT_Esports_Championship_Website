const timeline = [
  {
    date: "10 July 2026",
    title: "Registration Opens",
    description: "Team registrations begin for all esports titles.",
  },
  {
    date: "20 July 2026",
    title: "Registration Closes",
    description: "Last day to register your team before the deadline.",
  },
  {
    date: "25 July 2026",
    title: "Qualifiers",
    description: "Battle through the qualifiers to secure your place.",
  },
  {
    date: "27 July 2026",
    title: "Semi Finals",
    description: "Top teams compete for a spot in the Grand Finals.",
  },
  {
    date: "30 July 2026",
    title: "Grand Finals",
    description: "The ultimate showdown to crown the champions.",
  },
];

export default function Timeline() {
  return (
    <section className="bg-black py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-white/45">
            Format Overview
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Tournament Structure
          </h2>
          <p className="mt-4 text-sm leading-7 text-white/55 sm:text-base">
            A simple progression from registration to finals, presented in a clean and minimal format.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {timeline.slice(0, 4).map((item, index) => (
            <article key={item.title} className="border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                    Phase {index + 1}
                  </p>
                  <h3 className="mt-3 text-base font-semibold uppercase tracking-wide text-white">
                    {item.title}
                  </h3>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-3 text-sm leading-7 text-white/60">
                {item.description}
              </p>

              <div className="mt-5 border-t border-white/10 pt-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
                {item.date}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {timeline.slice(4).map((item, index) => (
            <article key={item.title} className="border border-white/10 bg-white/[0.03] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
                    Phase {index + 5}
                  </p>
                  <h3 className="mt-3 text-base font-semibold uppercase tracking-wide text-white">
                    {item.title}
                  </h3>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/30">
                  {String(index + 5).padStart(2, "0")}
                </span>
              </div>

              <p className="mt-3 text-sm leading-7 text-white/60">
                {item.description}
              </p>

              <div className="mt-5 border-t border-white/10 pt-3 text-[11px] uppercase tracking-[0.22em] text-white/40">
                {item.date}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
