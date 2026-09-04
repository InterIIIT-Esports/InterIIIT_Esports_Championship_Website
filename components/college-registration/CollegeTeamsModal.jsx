"use client";

import { useState, useEffect } from "react";
import { X, Trophy, Loader2, Users, Shield, ArrowRight, Swords } from "lucide-react";

const GAME_THEMES = {
  FREEFIRE: {
    badge: "bg-sky-500/20 text-sky-400 border-sky-500/40",
    hoverBorder: "hover:border-sky-500/40",
    hoverText: "group-hover:text-sky-400",
    ptsText: "text-sky-400",
  },
  BGMI: {
    badge: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    hoverBorder: "hover:border-amber-500/40",
    hoverText: "group-hover:text-amber-400",
    ptsText: "text-amber-400",
  },
  VALORANT: {
    badge: "bg-red-600/20 text-red-400 border-red-500/40",
    hoverBorder: "hover:border-red-500/40",
    hoverText: "group-hover:text-red-400",
    ptsText: "text-red-400",
  },
};

export default function CollegeTeamsModal({ isOpen, onClose, college, onSelectTeam }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && college) {
      fetchCollegeTeams();
    }
  }, [isOpen, college]);

  const fetchCollegeTeams = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/public/teams?college=${encodeURIComponent(college.college_name)}`);
      const data = await res.json();
      if (data.success) {
        setTeams(data.teams);
      }
    } catch (err) {
      console.error("Failed to fetch college teams:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !college) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-black border border-white/15 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="relative border-b border-white/10 bg-black p-5 sm:p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-black border border-white/20 overflow-hidden">
              {college.college_logo ? (
                <img
                  src={college.college_logo}
                  alt={college.college_name}
                  className="h-full w-full object-contain"
                />
              ) : (
                <Trophy size={28} className="text-yellow-500" />
              )}
            </div>

            <div className="space-y-0.5 pr-6">
              <span className="inline-flex items-center gap-1 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                <Trophy size={10} /> Qualified Squads
              </span>
              <h3 className="text-xl font-bold font-display text-white tracking-wide">
                {college.college_name}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {college.club_name}
              </p>
            </div>
          </div>
        </div>

        {/* Content List */}
        <div className="p-5 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3 bg-black">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Loader2 className="animate-spin text-red-500 mb-2" size={28} />
              <p className="text-xs">Loading qualified teams...</p>
            </div>
          ) : teams.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-slate-400 bg-white/[0.02]">
              <Trophy size={32} className="mx-auto text-slate-600 mb-2 opacity-50" />
              <p className="text-sm font-semibold text-white">No Qualified Teams Yet</p>
              <p className="text-xs text-slate-500 mt-1">Teams for {college.college_name} will appear here once registered & qualified.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Registered Squads ({teams.length})
              </p>
              {teams.map((team) => {
                const leader = team.leaderName || team.leaderId?.name || "N/A";
                const theme = GAME_THEMES[team.game?.toUpperCase()] || GAME_THEMES.VALORANT;
                
                return (
                  <div
                    key={team._id}
                    onClick={() => {
                      onClose();
                      if (onSelectTeam) onSelectTeam(team);
                    }}
                    className={`flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3.5 hover:bg-white/[0.08] ${theme.hoverBorder} transition-all cursor-pointer group`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black border border-white/20 font-bold text-white text-xs">
                        {team.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={`font-bold text-white text-sm ${theme.hoverText} transition-colors truncate`}>
                            {team.name}
                          </p>
                          <span className={`rounded border px-1.5 py-0.5 text-[9px] font-extrabold uppercase ${theme.badge}`}>
                            {team.game}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          Leader: <span className="text-slate-300 font-medium">{leader}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right hidden sm:block">
                        <p className={`text-xs font-bold ${theme.ptsText}`}>{team.points || 0} Pts</p>
                        <p className="text-[10px] text-slate-400">{team.matchesPlayed || 0} matches</p>
                      </div>
                      <ArrowRight size={16} className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
