"use client";

import { X, Trophy, Swords, Shield, User, Users, Building2 } from "lucide-react";

export default function TeamDetailsModal({ isOpen, onClose, team }) {
  if (!isOpen || !team) return null;

  const leaderName = team.leaderName || team.leaderId?.name || "N/A";
  
  // Combine player roster items from admin roster OR members array
  const roster = [];

  if (team.playerRoster && team.playerRoster.length > 0) {
    team.playerRoster.forEach((p, idx) => {
      roster.push({
        id: p._id || idx,
        name: p.name,
        role: idx === 0 ? "Leader" : "Player",
        imageUrl: p.imageUrl,
      });
    });
  } else if (team.members && team.members.length > 0) {
    team.members.forEach((m, idx) => {
      const isLeader = m.role === "LEADER" || team.leaderId?._id === m.userId?._id;
      roster.push({
        id: m._id || idx,
        name: m.userId?.name || "Team Member",
        role: m.role || (isLeader ? "Leader" : "Member"),
        imageUrl: "",
      });
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-slate-950 border border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Glow Header */}
        <div className="relative border-b border-white/10 bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-950 p-5 sm:p-6">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>

          <div className="flex items-start gap-4">
            <div 
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-900 border border-white/20 overflow-hidden shadow-inner"
              style={{ borderRadius: '50%', WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
            >
              {team.collegeLogo ? (
                <img
                  src={team.collegeLogo}
                  alt={team.college}
                  className="h-full w-full object-cover rounded-full"
                  style={{ borderRadius: '50%', clipPath: 'circle(50% at 50% 50%)', WebkitClipPath: 'circle(50% at 50% 50%)' }}
                />
              ) : (
                <Building2 className="h-7 w-7 text-slate-400" />
              )}
            </div>

            <div className="space-y-1 pr-6">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="rounded bg-red-600/20 text-red-400 border border-red-500/30 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">
                  {team.game}
                </span>
                {team.isRegistered && (
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    <Shield size={10} /> Registered Squad
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-wide">
                {team.name}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {team.college}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 divide-x divide-white/10 border-b border-white/10 bg-white/[0.02]">
          <div className="p-3 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1">
              <Trophy size={12} className="text-yellow-400" /> Points
            </p>
            <p className="text-xl font-bold font-display text-red-500 mt-0.5">
              {team.points || 0}
            </p>
          </div>
          <div className="p-3 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-center gap-1">
              <Swords size={12} className="text-slate-400" /> Matches
            </p>
            <p className="text-xl font-bold font-display text-white mt-0.5">
              {team.matchesPlayed || 0}
            </p>
          </div>
        </div>

        {/* Roster Section */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Leader Banner */}
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600/20 text-red-400 font-bold text-xs overflow-hidden border border-white/20 shrink-0">
                {team.leaderImage ? (
                  <img
                    src={team.leaderImage}
                    alt={leaderName}
                    className="h-full w-full object-cover rounded-full"
                    style={{ borderRadius: '50%', clipPath: 'circle(50% at 50% 50%)', WebkitClipPath: 'circle(50% at 50% 50%)' }}
                  />
                ) : (
                  <User size={16} />
                )}
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Team Leader</p>
                <p className="text-sm font-bold text-white">{leaderName}</p>
              </div>
            </div>
            <span className="rounded bg-white/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-300">
              Captain
            </span>
          </div>

          {/* Roster Players */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Users size={13} className="text-red-500" />
              Squad Roster ({roster.length} / {team.maxPlayers || 5})
            </h4>

            {roster.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-slate-500 text-xs">
                No roster members listed for this team yet.
              </div>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2">
                {roster.map((player, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] p-2.5 hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-300 font-bold text-xs border border-white/10 overflow-hidden">
                      {player.imageUrl ? (
                        <img src={player.imageUrl} alt={player.name} className="h-full w-full object-cover" />
                      ) : (
                        player.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-white truncate">{player.name}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">{player.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
