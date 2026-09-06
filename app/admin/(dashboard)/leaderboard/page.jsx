"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Save, Search } from "lucide-react";

export default function AdminLeaderboardPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingMap, setSavingMap] = useState({});
  const [drafts, setDrafts] = useState({});
  const [token, setToken] = useState("");
  const [gameFilter, setGameFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) {
      setToken(t);
      fetchTeams();
    }
  }, []);

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/public/teams?sort=points");
      const data = await res.json();
      if (data.success) {
        setTeams(data.teams);
        // Initialize drafts map
        const initialDrafts = {};
        data.teams.forEach(t => {
          initialDrafts[t._id] = {
            matchesPlayed: t.matchesPlayed ?? 0,
            wins: t.wins ?? 0,
            kills: t.kills ?? 0,
            points: t.points ?? 0,
            tag: t.tag ?? "",
            isEliminated: t.isEliminated ?? false,
            eliminationNote: t.eliminationNote ?? "",
          };
        });
        setDrafts(initialDrafts);
      }
    } catch (err) {
      toast.error("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (teamId, field, value) => {
    setDrafts(prev => ({
      ...prev,
      [teamId]: {
        ...(prev[teamId] || {}),
        [field]: value,
      }
    }));
  };

  const handleSave = async (team) => {
    const teamId = team._id;
    const draft = drafts[teamId] || {
      matchesPlayed: team.matchesPlayed || 0,
      wins: team.wins || 0,
      kills: team.kills || 0,
      points: team.points || 0,
      tag: team.tag || "",
      isEliminated: team.isEliminated || false,
      eliminationNote: team.eliminationNote || "",
    };

    setSavingMap(prev => ({ ...prev, [teamId]: true }));
    try {
      const res = await fetch("/api/admin/teams/points", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          teamId,
          matchesPlayed: Number(draft.matchesPlayed || 0),
          wins: Number(draft.wins || 0),
          kills: Number(draft.kills || 0),
          points: Number(draft.points || 0),
          tag: draft.tag || "",
          isEliminated: Boolean(draft.isEliminated),
          eliminationNote: draft.eliminationNote || "",
        })
      });

      const data = await res.json();
      if (data.success) {
        setTeams(prev => prev.map(t => t._id === teamId ? { ...t, ...data.team } : t));
        toast.success(`Saved stats for ${team.name}`);
      } else {
        toast.error(data.error || "Failed to save");
      }
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setSavingMap(prev => ({ ...prev, [teamId]: false }));
    }
  };

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

  const filteredTeams = teams.filter(t => 
    (gameFilter === "ALL" || t.game === gameFilter) &&
    (t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.college.toLowerCase().includes(searchQuery.toLowerCase()))
  ).sort((a, b) => {
    const priorityA = getStagePriority(a);
    const priorityB = getStagePriority(b);
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    if (a.game === "VALORANT") {
      if ((b.kills || 0) !== (a.kills || 0)) return (b.kills || 0) - (a.kills || 0);
      if ((b.wins || 0) !== (a.wins || 0)) return (b.wins || 0) - (a.wins || 0);
      return (a.matchesPlayed || 0) - (b.matchesPlayed || 0);
    }
    if ((b.points || 0) !== (a.points || 0)) return (b.points || 0) - (a.points || 0);
    return (b.kills || 0) - (a.kills || 0);
  });

  const TAG_OPTIONS = ["", "Top 16", "Top 8", "Top 4", "Top 2", "Semi-Finalist", "Finalist", "Champion"];

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Leaderboard Management</h2>
          <p className="text-xs text-gray-500 mt-0.5">Enter team stats, stage tags, and elimination status, then click Save.</p>
        </div>
        <div className="flex gap-3 items-center flex-wrap">
          <select
            value={gameFilter}
            onChange={e => setGameFilter(e.target.value)}
            className="rounded-md border border-gray-200 bg-white text-slate-900 text-xs px-3 py-1.5 outline-none shadow-sm"
          >
            <option value="ALL">All Games</option>
            <option value="BGMI">BGMI</option>
            <option value="VALORANT">Valorant</option>
            <option value="FREEFIRE">Free Fire</option>
          </select>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-56 rounded-md border border-gray-200 bg-white py-1.5 pl-8 pr-4 text-xs text-slate-900 outline-none focus:border-red-500 placeholder:text-gray-400 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Teams", value: filteredTeams.length, color: "text-slate-900" },
          { label: "Top Points", value: filteredTeams[0]?.points ?? "—", color: "text-red-600" },
          { label: "Matches Played", value: filteredTeams.reduce((s, t) => s + (t.matchesPlayed || 0), 0), color: "text-blue-600" },
        ].map(stat => (
          <div key={stat.label} className="rounded-lg border border-gray-200 bg-white shadow-sm px-4 py-3 flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 min-w-[950px]">
          <thead className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase text-gray-400">
            <tr>
              <th className="px-3 py-2.5 font-semibold tracking-wider w-10">Rank</th>
              <th className="px-3 py-2.5 font-semibold tracking-wider">Team</th>
              <th className="px-3 py-2.5 font-semibold tracking-wider w-20">Game</th>
              <th className="px-3 py-2.5 font-semibold tracking-wider w-28">Stage Tag</th>
              <th className="px-3 py-2.5 font-semibold tracking-wider text-center w-20">Matches</th>
              <th className="px-3 py-2.5 font-semibold tracking-wider text-center w-20">Wins</th>
              <th className="px-3 py-2.5 font-semibold tracking-wider text-center w-20">Kills</th>
              <th className="px-3 py-2.5 font-semibold tracking-wider text-center w-20">Points</th>
              <th className="px-3 py-2.5 font-semibold tracking-wider text-center w-48">Elimination Status</th>
              <th className="px-3 py-2.5 font-semibold tracking-wider text-center w-20">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTeams.map((team, index) => {
              const draft = drafts[team._id] || {
                matchesPlayed: team.matchesPlayed || 0,
                wins: team.wins || 0,
                kills: team.kills || 0,
                points: team.points || 0,
                tag: team.tag || "",
                isEliminated: team.isEliminated || false,
                eliminationNote: team.eliminationNote || "",
              };
              const isSaving = savingMap[team._id];
              const isValorant = team.game === "VALORANT";

              return (
                <tr key={team._id} className={`transition-colors ${draft.isEliminated ? 'bg-red-50/40 hover:bg-red-50/80' : 'hover:bg-gray-50'}`}>
                  <td className="px-3 py-2.5 font-bold text-slate-900 text-center">#{index + 1}</td>
                  <td className="px-3 py-2.5">
                    <p className="font-bold text-slate-900 text-sm">{team.name}</p>
                    <p className="text-[10px] text-gray-400">{team.college}</p>
                  </td>
                  <td className="px-3 py-2.5 text-gray-600 font-semibold text-xs">{team.game}</td>

                  {/* Tag Input */}
                  <td className="px-3 py-2.5">
                    <div className="flex flex-col gap-1">
                      <select
                        value={TAG_OPTIONS.includes(draft.tag) ? draft.tag : "CUSTOM"}
                        onChange={(e) => {
                          if (e.target.value !== "CUSTOM") {
                            handleInputChange(team._id, "tag", e.target.value);
                          }
                        }}
                        className="w-full rounded border border-gray-200 bg-white px-1.5 py-1 text-slate-900 font-medium text-xs outline-none focus:border-red-500 shadow-sm"
                      >
                        <option value="">No Tag</option>
                        <option value="Top 16">Top 16</option>
                        <option value="Top 8">Top 8</option>
                        <option value="Top 4">Top 4</option>
                        <option value="Top 2">Top 2</option>
                        <option value="Semi-Finalist">Semi-Finalist</option>
                        <option value="Finalist">Finalist</option>
                        <option value="Champion">Champion</option>
                        <option value="CUSTOM">Custom Tag...</option>
                      </select>
                      {(!TAG_OPTIONS.includes(draft.tag) || draft.tag === "CUSTOM") && (
                        <input
                          type="text"
                          placeholder="e.g. Top 16"
                          value={draft.tag === "CUSTOM" ? "" : draft.tag}
                          onChange={(e) => handleInputChange(team._id, "tag", e.target.value)}
                          className="w-full rounded border border-gray-200 bg-white px-2 py-0.5 text-xs text-slate-900 outline-none focus:border-red-500"
                        />
                      )}
                    </div>
                  </td>
                  
                  {/* Matches Input */}
                  <td className="px-3 py-2.5 text-center">
                    <input
                      type="number"
                      min="0"
                      value={draft.matchesPlayed}
                      onChange={(e) => handleInputChange(team._id, "matchesPlayed", e.target.value)}
                      className="w-14 rounded border border-gray-200 bg-white px-2 py-1 text-center font-bold text-slate-900 outline-none focus:border-red-500 text-xs shadow-sm"
                    />
                  </td>

                  {/* Wins Input */}
                  <td className="px-3 py-2.5 text-center">
                    <input
                      type="number"
                      min="0"
                      value={draft.wins}
                      onChange={(e) => handleInputChange(team._id, "wins", e.target.value)}
                      className="w-14 rounded border border-gray-200 bg-white px-2 py-1 text-center font-bold text-emerald-600 outline-none focus:border-red-500 text-xs shadow-sm"
                    />
                  </td>

                  {/* Kills Input */}
                  <td className="px-3 py-2.5 text-center">
                    <input
                      type="number"
                      min="0"
                      value={draft.kills}
                      onChange={(e) => handleInputChange(team._id, "kills", e.target.value)}
                      className="w-16 rounded border border-gray-200 bg-white px-2 py-1 text-center font-bold text-sky-600 outline-none focus:border-red-500 text-xs shadow-sm"
                    />
                  </td>

                  {/* Points Input */}
                  <td className="px-3 py-2.5 text-center">
                    {isValorant ? (
                      <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded italic">
                        No Pts (Val)
                      </span>
                    ) : (
                      <input
                        type="number"
                        min="0"
                        value={draft.points}
                        onChange={(e) => handleInputChange(team._id, "points", e.target.value)}
                        className="w-16 rounded border border-gray-200 bg-white px-2 py-1 text-center font-bold text-red-600 outline-none focus:border-red-500 text-xs shadow-sm"
                      />
                    )}
                  </td>

                  {/* Elimination Status Input */}
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 cursor-pointer shrink-0">
                        <input
                          type="checkbox"
                          checked={draft.isEliminated}
                          onChange={(e) => handleInputChange(team._id, "isEliminated", e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                        />
                        <span className={`text-xs font-bold ${draft.isEliminated ? 'text-red-600' : 'text-gray-500'}`}>
                          Eliminated
                        </span>
                      </label>
                      <input
                        type="text"
                        placeholder="Note (e.g. in round 3)"
                        value={draft.eliminationNote}
                        onChange={(e) => handleInputChange(team._id, "eliminationNote", e.target.value)}
                        className="w-full rounded border border-gray-200 bg-white px-2 py-1 text-xs text-slate-900 outline-none focus:border-red-500 shadow-sm"
                      />
                    </div>
                  </td>

                  {/* Save Button */}
                  <td className="px-3 py-2.5 text-center">
                    <button
                      onClick={() => handleSave(team)}
                      disabled={isSaving}
                      className="inline-flex items-center gap-1 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-3 py-1.5 shadow transition disabled:opacity-50"
                    >
                      {isSaving ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <Save size={12} />
                      )}
                      Save
                    </button>
                  </td>
                </tr>
              );
            })}
            {loading && (
              <tr>
                <td colSpan="10" className="py-12 text-center">
                  <Loader2 className="animate-spin mx-auto text-red-500 mb-2" size={20} />
                  <p className="text-gray-400 text-xs">Loading leaderboard...</p>
                </td>
              </tr>
            )}
            {!loading && filteredTeams.length === 0 && (
              <tr>
                <td colSpan="10" className="py-16 text-center">
                  <p className="text-gray-400 text-sm font-medium">No teams found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
