"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Minus, Search } from "lucide-react";

export default function AdminLeaderboardPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
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
      }
    } catch (err) {
      toast.error("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  const updatePoints = async (teamId, currentPoints, currentMatches, pointChange, matchChange) => {
    try {
      const res = await fetch("/api/admin/teams/points", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          teamId,
          points: currentPoints + pointChange,
          matchesPlayed: currentMatches + matchChange
        })
      });

      const data = await res.json();
      if (data.success) {
        // Update local state to avoid refetching everything instantly if we don't want to
        setTeams(prev => prev.map(t => t._id === teamId ? { ...t, points: data.team.points, matchesPlayed: data.team.matchesPlayed } : t));
        toast.success("Score updated");
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const filteredTeams = teams.filter(t => 
    (gameFilter === "ALL" || t.game === gameFilter) &&
    (t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.college.toLowerCase().includes(searchQuery.toLowerCase()))
  ).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Leaderboard Management</h2>
          <p className="text-xs text-gray-500 mt-0.5">Update scores after every match.</p>
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

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 border-b border-gray-200 text-[10px] uppercase text-gray-400">
            <tr>
              <th className="px-4 py-2.5 font-semibold tracking-wider">Rank</th>
              <th className="px-4 py-2.5 font-semibold tracking-wider">Team</th>
              <th className="px-4 py-2.5 font-semibold tracking-wider">Game</th>
              <th className="px-4 py-2.5 font-semibold tracking-wider text-center">Matches</th>
              <th className="px-4 py-2.5 font-semibold tracking-wider text-center">Points</th>
              <th className="px-4 py-2.5 font-semibold tracking-wider text-right">Adjust Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTeams.map((team, index) => (
              <tr key={team._id} className="transition-colors hover:bg-gray-50">
                <td className="px-4 py-2.5 font-bold text-slate-900">#{index + 1}</td>
                <td className="px-4 py-2.5">
                  <p className="font-bold text-slate-900 text-sm">{team.name}</p>
                  <p className="text-[10px] text-gray-400">{team.college}</p>
                </td>
                <td className="px-4 py-2.5 text-gray-600 font-semibold">{team.game}</td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => updatePoints(team._id, team.points, team.matchesPlayed, 0, -1)} className="p-0.5 rounded bg-gray-100 hover:bg-gray-200 text-slate-600"><Minus size={10} /></button>
                    <span className="font-bold text-slate-900 w-4 text-center text-xs">{team.matchesPlayed || 0}</span>
                    <button onClick={() => updatePoints(team._id, team.points, team.matchesPlayed, 0, 1)} className="p-0.5 rounded bg-gray-100 hover:bg-gray-200 text-slate-600"><Plus size={10} /></button>
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center justify-center">
                    <span className="font-bold text-red-600 text-sm w-8 text-center">{team.points || 0}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center justify-end gap-1.5">
                    <button onClick={() => updatePoints(team._id, team.points, team.matchesPlayed, -1, 0)} className="px-1.5 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-slate-600 font-semibold text-[10px]">-1</button>
                    <button onClick={() => updatePoints(team._id, team.points, team.matchesPlayed, -5, 0)} className="px-1.5 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-slate-600 font-semibold text-[10px]">-5</button>
                    <button onClick={() => updatePoints(team._id, team.points, team.matchesPlayed, 1, 0)} className="px-1.5 py-0.5 rounded bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-[10px]">+1</button>
                    <button onClick={() => updatePoints(team._id, team.points, team.matchesPlayed, 5, 0)} className="px-1.5 py-0.5 rounded bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-[10px]">+5</button>
                    <button onClick={() => updatePoints(team._id, team.points, team.matchesPlayed, 10, 0)} className="px-1.5 py-0.5 rounded bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-[10px]">+10</button>
                  </div>
                </td>
              </tr>
            ))}
            {loading && (
              <tr>
                <td colSpan="6" className="py-12 text-center">
                  <Loader2 className="animate-spin mx-auto text-red-500 mb-2" size={20} />
                  <p className="text-gray-400 text-xs">Loading leaderboard...</p>
                </td>
              </tr>
            )}
            {!loading && filteredTeams.length === 0 && (
              <tr>
                <td colSpan="6" className="py-16 text-center">
                  <Plus size={32} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-400 text-sm font-medium">No teams found</p>
                  <p className="text-gray-300 text-xs mt-1">Register teams first, then update their scores here</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
