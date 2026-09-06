"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trophy, Medal } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeamDetailsModal from "@/components/TeamDetailsModal";

const SLUG_TO_GAME = {
  bgmi: "BGMI",
  valo: "VALORANT",
  valorant: "VALORANT",
  ff: "FREEFIRE",
  freefire: "FREEFIRE",
};

const GAME_DISPLAY_NAME = {
  BGMI: "BGMI",
  VALORANT: "Valorant",
  FREEFIRE: "Free Fire",
};

const GAME_TO_SLUG = {
  BGMI: "bgmi",
  VALORANT: "valo",
  FREEFIRE: "ff",
};

export default function GameLeaderboardPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const router = useRouter();

  const rawSlug = (params.game || "bgmi").toLowerCase();
  const initialGame = SLUG_TO_GAME[rawSlug] || "BGMI";

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(initialGame);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const targetGame = SLUG_TO_GAME[rawSlug] || "BGMI";
    setGame(targetGame);
  }, [rawSlug]);

  useEffect(() => {
    fetchLeaderboard(game);
  }, [game]);

  const getStagePriority = (team) => {
    const tag = (team.tag || "").toLowerCase().trim();
    const isEliminated = team.isEliminated;

    let priority = 100;
    if (tag.includes("champion") || tag.includes("winner") || tag === "top 1" || tag === "1st") priority = 1;
    else if (tag.includes("finalist") || tag.includes("runner") || tag === "top 2" || tag === "2nd") priority = 2;
    else if (tag.includes("semi") || tag === "top 4") priority = 3;
    else if (tag === "top 8") priority = 4;
    else if (tag === "top 16") priority = 5;
    else if (tag === "top 32") priority = 6;
    else if (tag) priority = 10;

    if (!isEliminated) {
      if (priority === 100) priority = 20;
    } else {
      priority += 50;
    }
    return priority;
  };

  const sortLeaderboardTeams = (teamList, currentGame) => {
    const isValorant = currentGame === "VALORANT";
    return [...teamList].sort((a, b) => {
      const priorityA = getStagePriority(a);
      const priorityB = getStagePriority(b);
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      if (isValorant) {
        if ((b.kills || 0) !== (a.kills || 0)) return (b.kills || 0) - (a.kills || 0);
        if ((b.wins || 0) !== (a.wins || 0)) return (b.wins || 0) - (a.wins || 0);
        return (a.matchesPlayed || 0) - (b.matchesPlayed || 0);
      }

      if ((b.points || 0) !== (a.points || 0)) return (b.points || 0) - (a.points || 0);
      if ((b.kills || 0) !== (a.kills || 0)) return (b.kills || 0) - (a.kills || 0);
      return (b.wins || 0) - (a.wins || 0);
    });
  };

  const fetchLeaderboard = async (currentGame) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/public/teams?game=${currentGame}`);
      const data = await res.json();
      if (data.success) {
        setTeams(sortLeaderboardTeams(data.teams, currentGame));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (newGame) => {
    setGame(newGame);
    const slug = GAME_TO_SLUG[newGame] || "bgmi";
    router.push(`/leaderboard/${slug}`);
  };

  const getRankStyle = (index, points) => {
    if (points > 0) {
      if (index === 0) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/50";
      if (index === 1) return "text-slate-300 bg-slate-300/10 border-slate-300/50";
      if (index === 2) return "text-amber-600 bg-amber-600/10 border-amber-600/50";
    }
    return "text-slate-500 bg-white/5 border-white/10";
  };

  const getKD = (team) => {
    if (team.kdRatio !== undefined && team.kdRatio !== null && team.kdRatio > 0) {
      return Number(team.kdRatio).toFixed(2);
    }
    const k = team.kills || 0;
    const d = team.deaths || 0;
    if (d === 0) return k > 0 ? k.toFixed(1) : "—";
    return (k / d).toFixed(2);
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-black pt-16 pb-16 sm:pt-32 sm:pb-24">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(220,38,38,0.1),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none mix-blend-overlay" />

        <div className="relative mx-auto max-w-5xl px-3 sm:px-6">
          <div className="text-center mb-6 sm:mb-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-[family-name:var(--font-display)] font-bold text-white tracking-wide uppercase italic mb-2 sm:mb-4">
              <span className="text-red-600">{GAME_DISPLAY_NAME[game] || game}</span> Standings
            </h1>
            <p className="text-slate-400 text-xs sm:text-lg max-w-2xl mx-auto px-2">
              Track the top performing teams in the Inter-IIIT Esports Championship. Click any team to view roster.
            </p>
          </div>

          <div className="flex justify-center mb-6 sm:mb-12">
            <Tabs value={game} onValueChange={handleTabChange} className="w-full max-w-xs sm:w-auto">
              <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10 p-1">
                <TabsTrigger value="BGMI" className="text-xs sm:text-sm py-1.5 sm:py-2">BGMI</TabsTrigger>
                <TabsTrigger value="VALORANT" className="text-xs sm:text-sm py-1.5 sm:py-2">Valorant</TabsTrigger>
                <TabsTrigger value="FREEFIRE" className="text-xs sm:text-sm py-1.5 sm:py-2">Free Fire</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {loading ? (
            <div className="flex justify-center p-12 sm:p-24">
              <Loader2 className="animate-spin text-red-600 w-8 h-8 sm:w-12 sm:h-12" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white/[0.02] border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-sm">
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left" style={{ minWidth: '600px' }}>
                    <thead className="bg-white/5 text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 border-b border-white/10">
                      <tr>
                        <th className="w-10 sm:w-16 px-1 sm:px-4 py-2.5 sm:py-4 font-semibold text-center">Rank</th>
                        <th className="px-2 sm:px-4 py-2.5 sm:py-4 font-semibold">Team</th>
                        <th className="w-24 sm:w-32 px-2 sm:px-3 py-2.5 sm:py-4 font-semibold text-center">Status</th>
                        {game !== "VALORANT" && (
                          <>
                            <th className="w-12 sm:w-20 px-1 sm:px-3 py-2.5 sm:py-4 font-semibold text-center">MP</th>
                            <th className="w-12 sm:w-20 px-1 sm:px-3 py-2.5 sm:py-4 font-semibold text-center">W</th>
                            <th className="w-14 sm:w-20 px-1 sm:px-3 py-2.5 sm:py-4 font-semibold text-center">Kills</th>
                            <th className="w-14 sm:w-24 px-2 sm:px-4 py-2.5 sm:py-4 font-semibold text-right">Pts</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {teams.map((team, index) => {
                        const isValorant = game === "VALORANT";
                        const hasPoints = (team.points || 0) > 0;
                        const showPodiumIcon = !isValorant && hasPoints && index < 3;
                        const leader = team.leaderName || team.leaderId?.name;

                        return (
                          <tr 
                            key={team._id} 
                            onClick={() => { setSelectedTeam(team); setIsModalOpen(true); }}
                            className={`transition-all hover:bg-white/[0.06] cursor-pointer group ${team.isEliminated ? 'bg-red-950/20' : showPodiumIcon ? 'bg-gradient-to-r from-red-900/10 to-transparent' : ''}`}
                          >
                            <td className="px-1 sm:px-4 py-2.5 sm:py-3.5 text-center">
                              {showPodiumIcon ? (
                                <div className={`mx-auto w-5 h-5 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center font-bold text-[10px] sm:text-sm ${getRankStyle(index, team.points || 0)}`}>
                                  {index === 0 ? <Trophy size={10} className="sm:w-3.5 sm:h-3.5" /> : <Medal size={10} className="sm:w-3.5 sm:h-3.5" />}
                                </div>
                              ) : (
                                <span className="font-bold text-slate-300 text-xs sm:text-base">{index + 1}</span>
                              )}
                            </td>
                            <td className="px-2 sm:px-4 py-2.5 sm:py-3.5 min-w-0 overflow-hidden">
                              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                                <div 
                                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden shrink-0 border border-white/20 bg-slate-900 flex items-center justify-center"
                                  style={{ borderRadius: '50%', WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
                                >
                                  {team.collegeLogo ? (
                                    <img
                                      src={team.collegeLogo}
                                      alt={team.college}
                                      className="w-full h-full object-cover rounded-full"
                                      style={{ borderRadius: '50%', clipPath: 'circle(50% at 50% 50%)', WebkitClipPath: 'circle(50% at 50% 50%)' }}
                                    />
                                  ) : (
                                    <span className="text-slate-300 font-bold text-[10px] sm:text-xs">
                                      {team.college?.charAt(0) || "T"}
                                    </span>
                                  )}
                                </div>
                                <div className="min-w-0 flex-1 overflow-hidden">
                                  <p className="font-bold text-white text-xs sm:text-base tracking-wide group-hover:text-red-400 transition-colors truncate">
                                    {team.name}
                                  </p>
                                  {leader && (
                                    <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 truncate">
                                      Leader: <span className="text-slate-300 font-medium">{leader}</span>
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Status Column */}
                            <td className="px-2 sm:px-3 py-2.5 sm:py-3.5 text-center">
                              {team.isEliminated ? (
                                <div className="flex flex-col items-center gap-0.5">
                                  <span className="inline-block px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-bold bg-red-950/90 text-red-400 border border-red-800/80 uppercase tracking-wider">
                                    Eliminated
                                  </span>
                                  {team.eliminationNote && (
                                    <span className="text-[9px] sm:text-[10px] text-red-400/80 font-medium italic">
                                      {team.eliminationNote}
                                    </span>
                                  )}
                                </div>
                              ) : team.tag ? (
                                <span className="inline-block px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-extrabold uppercase bg-red-600/20 text-red-400 border border-red-500/30 tracking-wider">
                                  {team.tag}
                                </span>
                              ) : (
                                <span className="text-slate-600 text-xs">—</span>
                              )}
                            </td>

                            {game !== "VALORANT" && (
                              <>
                                <td className="px-1 sm:px-3 py-2.5 sm:py-3.5 text-center font-semibold text-slate-300 text-xs sm:text-base">
                                  {team.matchesPlayed || 0}
                                </td>
                                <td className="px-1 sm:px-3 py-2.5 sm:py-3.5 text-center font-semibold text-emerald-400 text-xs sm:text-base">
                                  {team.wins || 0}
                                </td>
                                <td className="px-1 sm:px-3 py-2.5 sm:py-3.5 text-center font-semibold text-sky-400 text-xs sm:text-base">
                                  {team.kills || 0}
                                </td>
                                <td className="px-2 sm:px-4 py-2.5 sm:py-3.5 text-right font-display text-sm sm:text-xl font-bold text-red-500">
                                  {team.points || 0}
                                </td>
                              </>
                            )}
                          </tr>
                        );
                      })}
                      {teams.length === 0 && (
                        <tr>
                          <td colSpan={game === "VALORANT" ? "3" : "7"} className="px-4 py-12 sm:px-6 sm:py-16 text-center text-xs sm:text-sm text-slate-500">
                            No teams registered or ranked for this game yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <TeamDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} team={selectedTeam} />
      <Footer />
    </>
  );
}

