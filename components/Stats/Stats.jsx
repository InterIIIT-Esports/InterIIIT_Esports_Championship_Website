import StatCard from "./StatCard";

function StatsSection() {
  const stats = [
    { number: "21", label: "Participating Colleges" },
    { number: "3", label: "Game Titles" },
    { number: "1200+", label: "Teams" },
    { number: "Rs 50K+", label: "Prize Pool" },
  ];

  return (
    <section className="bg-black py-12 text-white lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-400">Scale</p>
            <h2 className="mt-2 text-4xl font-[family-name:var(--font-display)] leading-none tracking-wide text-white sm:text-5xl">
              Participating Colleges
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base lg:ml-auto">
            A fast, college-only esports league with multiple titles, verified squads, and a clean road from qualifiers to finals.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} number={stat.number} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;