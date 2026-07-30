import { Trophy, Medal, Award, Clock } from "lucide-react";

const themes = {
  amber: {
    accent: "text-amber-400",
    headerBg: "bg-amber-500/10",
    rankGlow1: "bg-gradient-to-br from-yellow-400 to-amber-600 shadow-[0_0_20px_rgba(251,191,36,0.4)]",
    rankGlow2: "bg-gradient-to-br from-slate-300 to-slate-500 shadow-[0_0_15px_rgba(148,163,184,0.3)]",
    rankGlow3: "bg-gradient-to-br from-amber-600 to-orange-800 shadow-[0_0_15px_rgba(217,119,6,0.3)]",
    rowHover: "hover:bg-amber-500/5",
  },
  red: {
    accent: "text-red-400",
    headerBg: "bg-red-500/10",
    rankGlow1: "bg-gradient-to-br from-yellow-400 to-amber-600 shadow-[0_0_20px_rgba(251,191,36,0.4)]",
    rankGlow2: "bg-gradient-to-br from-slate-300 to-slate-500 shadow-[0_0_15px_rgba(148,163,184,0.3)]",
    rankGlow3: "bg-gradient-to-br from-amber-600 to-orange-800 shadow-[0_0_15px_rgba(217,119,6,0.3)]",
    rowHover: "hover:bg-red-500/5",
  },
  blue: {
    accent: "text-sky-400",
    headerBg: "bg-sky-500/10",
    rankGlow1: "bg-gradient-to-br from-yellow-400 to-amber-600 shadow-[0_0_20px_rgba(251,191,36,0.4)]",
    rankGlow2: "bg-gradient-to-br from-slate-300 to-slate-500 shadow-[0_0_15px_rgba(148,163,184,0.3)]",
    rankGlow3: "bg-gradient-to-br from-amber-600 to-orange-800 shadow-[0_0_15px_rgba(217,119,6,0.3)]",
    rowHover: "hover:bg-sky-500/5",
  },
};

const RankIcon = ({ rank }) => {
  if (rank === "01") return <Trophy size={14} />;
  if (rank === "02") return <Medal size={14} />;
  if (rank === "03") return <Award size={14} />;
  return null;
};

export default function GameLeaderboard({ title = "Leaderboard", rows = [], theme = "red" }) {
  const colors = themes[theme] || themes.red;
  const fallbackRows = [
    { rank: "01", team: "To be announced", played: "-", points: "-" },
    { rank: "02", team: "To be announced", played: "-", points: "-" },
    { rank: "03", team: "To be announced", played: "-", points: "-" },
    { rank: "04", team: "To be announced", played: "-", points: "-" },
    { rank: "05", team: "To be announced", played: "-", points: "-" },
    { rank: "06", team: "To be announced", played: "-", points: "-" },
    { rank: "07", team: "To be announced", played: "-", points: "-" },
    { rank: "08", team: "To be announced", played: "-", points: "-" },
    { rank: "09", team: "To be announced", played: "-", points: "-" },
    { rank: "10", team: "To be announced", played: "-", points: "-" },
  ];

  const items = rows.length ? rows : fallbackRows;

  const getRankStyle = (rank) => {
    if (rank === "01") return colors.rankGlow1;
    if (rank === "02") return colors.rankGlow2;
    if (rank === "03") return colors.rankGlow3;
    return "bg-white/10";
  };

  return (
    <section className="relative overflow-hidden bg-[#0a0a0f] py-14 text-white sm:py-20">
      <div className="absolute left-1/2 top-0 h-64 w-[60vw] -translate-x-1/2 bg-white/[0.02] blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:px-10">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={`text-[10px] font-semibold uppercase tracking-[0.45em] ${colors.accent}`}>
              Standings
            </p>
            <h2 className="mt-2 text-3xl font-[family-name:var(--font-display)] leading-none tracking-wide sm:text-5xl uppercase">
              {title.split(" ").slice(0, -1).join(" ")} <span className={colors.accent}>{title.split(" ").slice(-1)[0]}.</span>
            </h2>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">
            <Clock size={12} className="opacity-50" />
            Updates after matches
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          <div className={`grid grid-cols-[64px_1fr_72px_72px] border-b border-white/10 px-4 py-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40 sm:grid-cols-[80px_1fr_110px_110px] sm:px-6 ${colors.headerBg}`}>
            <span className="text-center">#</span>
            <span>Team</span>
            <span className="text-center">MP</span>
            <span className="text-center">Pts</span>
          </div>

          {items.map((row) => (
            <div
              key={`${row.rank}-${row.team}`}
              className={`grid grid-cols-[64px_1fr_72px_72px] items-center border-b border-white/[0.06] px-4 py-4 text-sm transition-colors duration-200 last:border-b-0 sm:grid-cols-[80px_1fr_110px_110px] sm:px-6 sm:py-5 ${colors.rowHover}`}
            >
              <div className="flex justify-center">
                <div className={`flex h-8 w-8 items-center justify-center rounded-xl text-[11px] font-black sm:h-9 sm:w-9 sm:text-xs ${getRankStyle(row.rank)} ${row.rank <= "03" ? "text-white" : "text-white/60"}`}>
                  {RankIcon({ rank: row.rank }) || row.rank}
                </div>
              </div>

              <span className={`min-w-0 truncate pl-2 text-sm font-semibold sm:pl-4 sm:text-base ${row.team === "To be announced" ? "text-white/30 italic" : "text-white"}`}>
                {row.team}
              </span>

              <span className="text-center text-xs text-white/40 sm:text-sm">
                {row.played}
              </span>

              <span className={`text-center text-xs font-black sm:text-sm ${row.points !== "-" ? "text-white" : "text-white/30"}`}>
                {row.points}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 h-0.5 overflow-hidden rounded-full bg-white/5">
          <div className={`h-full w-1/2 rounded-full bg-gradient-to-r ${colors.bar}`} />
        </div>
      </div>
    </section>
  );
}

