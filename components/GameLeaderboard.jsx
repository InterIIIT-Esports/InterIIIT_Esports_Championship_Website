const themes = {
  amber: {
    label: "text-amber-300",
    line: "border-amber-400/50",
    rank: "text-amber-300",
    row: "hover:bg-amber-400/[0.04]",
  },
  red: {
    label: "text-red-300",
    line: "border-red-500/50",
    rank: "text-red-300",
    row: "hover:bg-red-500/[0.04]",
  },
  blue: {
    label: "text-sky-300",
    line: "border-sky-400/50",
    rank: "text-sky-300",
    row: "hover:bg-sky-400/[0.04]",
  },
};

export default function GameLeaderboard({ title = "Leaderboard", rows = [], theme = "red" }) {
  const colors = themes[theme] || themes.red;
  const fallbackRows = [
    { rank: "01", team: "To be announced", played: "-", points: "-" },
    { rank: "02", team: "To be announced", played: "-", points: "-" },
    { rank: "03", team: "To be announced", played: "-", points: "-" },
    { rank: "04", team: "To be announced", played: "-", points: "-" },
  ];

  const items = rows.length ? rows : fallbackRows;

  return (
    <section className="bg-black py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`mb-8 flex items-end justify-between gap-4 border-b pb-4 ${colors.line}`}>
          <div>
            <p className={`text-[10px] font-semibold uppercase tracking-[0.45em] ${colors.label}`}>
              Standings
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h2>
          </div>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-white/30 sm:block">
            Updates after matches
          </span>
        </div>

        <div className="overflow-hidden border border-white/10 bg-white/[0.03]">
          <div className="grid grid-cols-[72px_1fr_92px_92px] border-b border-white/10 px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/35">
            <span>Rank</span>
            <span>Team</span>
            <span className="text-right">Played</span>
            <span className="text-right">Points</span>
          </div>

          {items.map((row) => (
            <div
              key={`${row.rank}-${row.team}`}
              className={`grid grid-cols-[72px_1fr_92px_92px] border-b border-white/10 px-4 py-4 text-sm text-white/70 transition last:border-b-0 ${colors.row}`}
            >
              <span className={`font-semibold ${colors.rank}`}>{row.rank}</span>
              <span>{row.team}</span>
              <span className="text-right">{row.played}</span>
              <span className="text-right font-semibold text-white">{row.points}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
