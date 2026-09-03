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

  const fetchLeaderboard = async (currentGame) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/public/teams?game=${currentGame}`);
      const data = await res.json();
      if (data.success) {
        setTeams(data.teams.sort((a, b) => a.name.localeCompare(b.name)));
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
              Current <span className="text-red-600">Standings</span>
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
                <div className="w-full overflow-hidden">
                  <table className="w-full text-left table-fixed">
                    <thead className="bg-white/5 text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 border-b border-white/10">
                      <tr>
                        <th className="w-8 sm:w-16 px-1 sm:px-4 py-2.5 sm:py-4 font-semibold text-center">Rank</th>
                        <th className="px-2 sm:px-4 py-2.5 sm:py-4 font-semibold">Team & Roster</th>
                        <th className="hidden sm:table-cell sm:w-24 px-4 py-4 font-semibold text-center">Matches</th>
                        <th className="w-16 sm:w-28 px-3 sm:px-6 py-2.5 sm:py-4 font-semibold text-right">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {teams.map((team, index) => {
                        const hasPoints = (team.points || 0) > 0;
                        const showPodiumIcon = hasPoints && index < 3;
                        const leader = team.leaderName || team.leaderId?.name;

                        return (
                          <tr 
                            key={team._id} 
                            onClick={() => { setSelectedTeam(team); setIsModalOpen(true); }}
                            className={`transition-all hover:bg-white/[0.06] cursor-pointer group ${showPodiumIcon ? 'bg-gradient-to-r from-red-900/10 to-transparent' : ''}`}
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
                            <td className="hidden sm:table-cell sm:w-24 px-4 py-3.5 text-center font-semibold text-slate-300 text-sm sm:text-base">
                              {team.matchesPlayed || 0}
                            </td>
                            <td className="px-3 sm:px-6 py-2.5 sm:py-3.5 text-right font-display text-sm sm:text-xl font-bold text-red-500">
                              {team.points || 0}
                            </td>
                          </tr>
                        );
                      })}
                      {teams.length === 0 && (
                        <tr>
                          <td colSpan="5" className="px-4 py-12 sm:px-6 sm:py-16 text-center text-xs sm:text-sm text-slate-500">
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
