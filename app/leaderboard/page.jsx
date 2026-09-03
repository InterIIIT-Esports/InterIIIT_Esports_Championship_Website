"use client";

import { useState, useEffect } from "react";
import { Loader2, Trophy, Medal } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PublicLeaderboardPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState("BGMI");

  useEffect(() => {
    fetchLeaderboard();
  }, [game]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/public/teams?game=${game}`);
      const data = await res.json();
      if (data.success) {
        // Sort alphabetically by team name
        setTeams(data.teams.sort((a, b) => a.name.localeCompare(b.name)));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
              Track the top performing teams in the Inter-IIIT Esports Championship.
            </p>
          </div>

          <div className="flex justify-center mb-6 sm:mb-12">
            <Tabs value={game} onValueChange={setGame} className="w-full max-w-xs sm:w-auto">
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
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 border-b border-white/10">
                      <tr>
                        <th className="px-2 py-3 sm:px-6 sm:py-5 font-semibold text-center w-12 sm:w-24">Rank</th>
                        <th className="px-3 py-3 sm:px-6 sm:py-5 font-semibold">Team Name</th>
                        <th className="px-4 py-3 sm:px-6 sm:py-5 font-semibold hidden sm:table-cell">College</th>
                        <th className="px-2 py-3 sm:px-6 sm:py-5 font-semibold text-center">Matches</th>
                        <th className="px-3 py-3 sm:px-6 sm:py-5 font-semibold text-right">Points</th>
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
                            className={`transition-all hover:bg-white/[0.04] ${showPodiumIcon ? 'bg-gradient-to-r from-red-900/10 to-transparent' : ''}`}
                          >
                            <td className="px-2 py-3 sm:px-6 sm:py-5 text-center">
                              <div className={`mx-auto w-7 h-7 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs sm:text-base ${getRankStyle(index, team.points || 0)}`}>
                                {showPodiumIcon ? (
                                  index === 0 ? <Trophy size={14} className="sm:w-4 sm:h-4" /> : <Medal size={14} className="sm:w-4 sm:h-4" />
                                ) : (
                                  index + 1
                                )}
                              </div>
                            </td>
                            <td className="px-3 py-3 sm:px-6 sm:py-5">
                              <p className="font-bold text-white text-xs sm:text-lg tracking-wide">{team.name}</p>
                              {leader && (
                                <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">
                                  Leader: <span className="text-slate-300 font-medium">{leader}</span>
                                </p>
                              )}
                              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 sm:hidden mt-1">
                                {team.collegeLogo && (
                                  <img src={team.collegeLogo} alt={team.college} className="w-3.5 h-3.5 object-contain rounded-full bg-white p-0.5 shrink-0" />
                                )}
                                <span className="truncate">{team.college}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 sm:px-6 sm:py-5 text-slate-400 text-xs sm:text-base hidden sm:table-cell">
                              <div className="flex items-center gap-2">
                                {team.collegeLogo && (
                                  <img src={team.collegeLogo} alt={team.college} className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded-full bg-white p-0.5 shrink-0" />
                                )}
                                <span>{team.college}</span>
                              </div>
                            </td>
                            <td className="px-2 py-3 sm:px-6 sm:py-5 text-center font-medium text-slate-300 text-xs sm:text-base">
                              {team.matchesPlayed || 0}
                            </td>
                            <td className="px-3 py-3 sm:px-6 sm:py-5 text-right font-display text-sm sm:text-2xl font-bold text-red-500">
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
      <Footer />
    </>
  );
}
