const themes = {
  amber: {
    label: "text-amber-300",
    border: "border-amber-400/50",
    soft: "bg-amber-400/10 border-amber-400/25",
    fill: "bg-amber-300",
    text: "text-amber-200",
    shadow: "shadow-[0_0_45px_rgba(251,191,36,0.12)]",
  },
  red: {
    label: "text-red-300",
    border: "border-red-500/50",
    soft: "bg-red-500/10 border-red-500/25",
    fill: "bg-red-400",
    text: "text-red-200",
    shadow: "shadow-[0_0_45px_rgba(239,68,68,0.12)]",
  },
  blue: {
    label: "text-sky-300",
    border: "border-sky-400/50",
    soft: "bg-sky-400/10 border-sky-400/25",
    fill: "bg-sky-300",
    text: "text-sky-200",
    shadow: "shadow-[0_0_45px_rgba(56,189,248,0.12)]",
  },
};

export default function GameOverview({ game, theme = "red", stats = [], prize = [], schedule = [] }) {
  const colors = themes[theme] || themes.red;
  const statItems = stats.length
    ? stats
    : [
        { label: "Registered", value: "Open", percent: 72 },
        { label: "Slots", value: "32 Teams", percent: 58 },
        { label: "Matches", value: "Qualifiers", percent: 45 },
      ];
  const prizeItems = prize.length
    ? prize
    : [
        { label: "Winner", value: "50%", percent: 50 },
        { label: "Runner Up", value: "30%", percent: 30 },
        { label: "MVP", value: "20%", percent: 20 },
      ];
  const scheduleItems = schedule.length
    ? schedule
    : ["Registration", "Verification", "Qualifiers", "Finals"];

  return (
    <section className="bg-black py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid gap-5 border-l pl-4 ${colors.border}`}>
          <p className={`text-[10px] font-semibold uppercase tracking-[0.45em] ${colors.label}`}>
            Event Control Room
          </p>
          <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {game} tournament dashboard
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
                Quick view of registration status, match flow, prize split, and event readiness for participating teams.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {statItems.map((item) => (
                <article key={item.label} className={`border p-4 ${colors.soft} ${colors.shadow}`}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
                    {item.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
                  <div className="mt-4 h-1.5 bg-white/10">
                    <div className={`h-full ${colors.fill}`} style={{ width: `${item.percent}%` }} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <div className="border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.35em] ${colors.label}`}>
                  Prize Split
                </p>
                <h3 className="mt-2 text-xl font-semibold">Rewards Breakdown</h3>
              </div>
              <span className={`border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${colors.soft} ${colors.text}`}>
                Live Pool
              </span>
            </div>

            <div className="mt-5 space-y-4">
              {prizeItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/70">{item.label}</span>
                    <span className={colors.text}>{item.value}</span>
                  </div>
                  <div className="mt-2 h-2 bg-white/10">
                    <div className={`h-full ${colors.fill}`} style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-white/10 bg-white/[0.03] p-5">
            <p className={`text-[10px] font-semibold uppercase tracking-[0.35em] ${colors.label}`}>
              Event Flow
            </p>
            <h3 className="mt-2 text-xl font-semibold">Team Journey</h3>
            <div className="mt-6 grid gap-3">
              {scheduleItems.map((item, index) => (
                <div key={item} className="grid grid-cols-[40px_1fr] items-center gap-3">
                  <div className={`grid h-9 w-9 place-items-center border text-xs font-semibold ${colors.soft} ${colors.text}`}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="border border-white/10 bg-black/30 px-4 py-3 text-sm text-white/70">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
