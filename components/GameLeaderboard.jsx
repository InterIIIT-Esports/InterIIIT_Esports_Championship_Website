import { Trophy, Medal, Award, Clock } from "lucide-react";

const themes = {
  amber: {
    accent: "text-amber-400",
    accentBg: "bg-amber-400",
    glow: "shadow-amber-500/20",
    headerBg: "bg-amber-500/10",
    headerBorder: "border-amber-500/20",
    rankGlow1: "bg-gradient-to-br from-yellow-400 to-amber-600 shadow-[0_0_20px_rgba(251,191,36,0.4)]",
    rankGlow2: "bg-gradient-to-br from-slate-300 to-slate-500 shadow-[0_0_15px_rgba(148,163,184,0.3)]",
    rankGlow3: "bg-gradient-to-br from-amber-600 to-orange-800 shadow-[0_0_15px_rgba(217,119,6,0.3)]",
    rowHover: "hover:bg-amber-500/5",
    bar: "from-amber-500 to-amber-600",
  },
  red: {
    accent: "text-red-400",
    accentBg: "bg-red-500",
    glow: "shadow-red-500/20",
    headerBg: "bg-red-500/10",
    headerBorder: "border-red-500/20",
    rankGlow1: "bg-gradient-to-br from-yellow-400 to-amber-600 shadow-[0_0_20px_rgba(251,191,36,0.4)]",
    rankGlow2: "bg-gradient-to-br from-slate-300 to-slate-500 shadow-[0_0_15px_rgba(148,163,184,0.3)]",
    rankGlow3: "bg-gradient-to-br from-amber-600 to-orange-800 shadow-[0_0_15px_rgba(217,119,6,0.3)]",
    rowHover: "hover:bg-red-500/5",
    bar: "from-red-500 to-red-600",
  },
  blue: {
    accent: "text-sky-400",
    accentBg: "bg-sky-500",
    glow: "shadow-sky-500/20",
    headerBg: "bg-sky-500/10",
    headerBorder: "border-sky-500/20",
    rankGlow1: "bg-gradient-to-br from-yellow-400 to-amber-600 shadow-[0_0_20px_rgba(251,191,36,0.4)]",
    rankGlow2: "bg-gradient-to-br from-slate-300 to-slate-500 shadow-[0_0_15px_rgba(148,163,184,0.3)]",
    rankGlow3: "bg-gradient-to-br from-amber-600 to-orange-800 shadow-[0_0_15px_rgba(217,119,6,0.3)]",
    rowHover: "hover:bg-sky-500/5",
    bar: "from-sky-500 to-sky-600",
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
  ];

  const items = rows.length ? rows : fallbackRows;

  const getRankStyle = (rank) => {
    if (rank === "01") return colors.rankGlow1;
    if (rank === "02") return colors.rankGlow2;
    if (rank === "03") return colors.rankGlow3;
    return "bg-white/10";
  };

  return (
    <section className="relative overflow-hidden bg-[#0a0a0f] py-12 text-white sm:py-16">
      {/* Background glow */}
      <div className="absolute left-1/2 top-0 h-64 w-[60vw] -translate-x-1/2 bg-white/[0.02] blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={`text-[10px] font-semibold uppercase tracking-[0.45em] ${colors.accent}`}>
              Standings
            </p>
            <h2 className="mt-2 text-2xl font-[family-name:var(--font-display)] leading-none tracking-wide sm:text-4xl">
              {title}
            </h2>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">
            <Clock size={12} className="opacity-50" />
            Updates after matches
          </span>
        </div>

        {/* Table */}
        <div className={`overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm ${colors.glow} shadow-lg`}>
          {/* Table header */}
          <div className={`grid grid-cols-[44px_1fr_52px_56px] border-b border-white/10 px-3 py-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white/40 sm:grid-cols-[64px_1fr_80px_80px] sm:px-5 sm:text-[10px] ${colors.headerBg}`}>
            <span className="text-center">#</span>
            <span>Team</span>
            <span className="text-center">MP</span>
            <span className="text-center">Pts</span>
          </div>

          {/* Rows */}
          {items.map((row, i) => (
            <div
              key={`${row.rank}-${row.team}`}
              className={`grid grid-cols-[44px_1fr_52px_56px] items-center border-b border-white/[0.06] px-3 py-3 text-sm transition-colors duration-200 last:border-b-0 sm:grid-cols-[64px_1fr_80px_80px] sm:px-5 sm:py-4 ${colors.rowHover}`}
            >
              {/* Rank badge */}
              <div className="flex justify-center">
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-black sm:h-8 sm:w-8 sm:text-xs ${getRankStyle(row.rank)} ${row.rank <= "03" ? "text-white" : "text-white/60"}`}>
                  {RankIcon({ rank: row.rank }) || row.rank}
                </div>
              </div>

              {/* Team name */}
              <span className={`min-w-0 truncate pl-2 text-xs font-semibold sm:pl-3 sm:text-sm ${row.team === "To be announced" ? "text-white/30 italic" : "text-white"}`}>
                {row.team}
              </span>

              {/* Played */}
              <span className="text-center text-xs text-white/40 sm:text-sm">
                {row.played}
              </span>

              {/* Points */}
              <span className={`text-center text-xs font-black sm:text-sm ${row.points !== "-" ? "text-white" : "text-white/30"}`}>
                {row.points}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom accent bar */}
        <div className="mt-4 h-0.5 overflow-hidden rounded-full bg-white/5">
          <div className={`h-full w-2/5 rounded-full bg-gradient-to-r ${colors.bar}`} />
        </div>
      </div>
    </section>
  );
}
