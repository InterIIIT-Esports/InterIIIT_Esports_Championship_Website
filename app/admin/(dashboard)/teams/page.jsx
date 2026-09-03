"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Search, Users, Loader2, Trash2, Shield, Plus, X, ChevronDown, UserPlus, ImageIcon, Pencil } from "lucide-react";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeamIds, setSelectedTeamIds] = useState([]);

  // Add Team Modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [collegesLoading, setCollegesLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    game: "",
    leaderName: "",
  });
  const [players, setPlayers] = useState([]);
  const [showPlayers, setShowPlayers] = useState(false);

  // Edit Team Modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    college: "",
    game: "",
    leaderName: "",
    isRegistered: true,
  });
  const [editPlayers, setEditPlayers] = useState([]);
  const [showEditPlayers, setShowEditPlayers] = useState(false);

  async function fetchTeams(currentToken) {
    try {
      const res = await fetch("/api/admin/teams", { headers: { Authorization: `Bearer ${currentToken}` } });
      const data = await res.json();
      if (data.success) {
        setTeams(data.teams);
        setSelectedTeamIds([]);
      }
      else toast.error("Failed to load teams");
    } catch { toast.error("An error occurred"); }
    finally { setLoading(false); }
  };

  const deleteTeam = async (teamId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`/api/admin/teams?teamId=${teamId}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) { toast.success("Team deleted"); fetchTeams(token); }
      else toast.error(data.message);
    } catch { toast.error("Failed to delete team"); }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) Promise.resolve().then(() => fetchTeams(storedToken));
  }, []);

  const deleteSelectedTeams = async () => {
    if (selectedTeamIds.length === 0) return;
    if (!confirm(`Delete ${selectedTeamIds.length} selected teams permanently?`)) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/teams", {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ teamIds: selectedTeamIds }),
      });
      const data = await res.json();
      if (data.success) { toast.success(data.message); fetchTeams(token); }
      else toast.error(data.message);
    } catch { toast.error("Failed to delete selected teams"); }
  };

  const toggleTeam = (teamId) => {
    setSelectedTeamIds((current) => current.includes(teamId)
      ? current.filter((id) => id !== teamId)
      : [...current, teamId]);
  };

  const toggleAllVisible = () => {
    const visibleIds = filteredTeams.map((team) => team._id);
    setSelectedTeamIds((current) => visibleIds.every((id) => current.includes(id))
      ? current.filter((id) => !visibleIds.includes(id))
      : [...new Set([...current, ...visibleIds])]);
  };

  const filteredTeams = teams.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.college.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const registered = teams.filter(t => t.isRegistered).length;
  const pending = teams.length - registered;

  // ---- Add Team Modal logic ----

  const openAddModal = async () => {
    setShowAddModal(true);
    setFormData({ name: "", college: "", game: "", leaderName: "" });
    setPlayers([]);
    setShowPlayers(false);

    // Fetch colleges
    if (colleges.length === 0) {
      setCollegesLoading(true);
      try {
        const res = await fetch("/api/public/colleges");
        const data = await res.json();
        if (data.success) {
          setColleges(data.colleges);
        }
      } catch { /* silently fail */ }
      finally { setCollegesLoading(false); }
    }
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const addPlayerRow = () => {
    setPlayers((prev) => [...prev, { name: "", imageUrl: "" }]);
    setShowPlayers(true);
  };

  const removePlayerRow = (index) => {
    setPlayers((prev) => prev.filter((_, i) => i !== index));
  };

  const updatePlayer = (index, field, value) => {
    setPlayers((prev) => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
  };

  const handleSubmitTeam = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: formData.name,
          college: formData.college,
          game: formData.game,
          leaderName: formData.leaderName,
          players: players.filter((p) => p.name.trim()),
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Team created successfully!");
        closeAddModal();
        fetchTeams(token);
      } else {
        toast.error(data.message || "Failed to create team");
      }
    } catch {
      toast.error("An error occurred while creating the team");
    } finally {
      setSubmitting(false);
    }
  };

  // ---- Edit Team Modal logic ----

  const openEditModal = (team) => {
    setEditingTeamId(team._id);
    setEditFormData({
      name: team.name || "",
      college: team.college || "",
      game: team.game || "",
      leaderName: team.leaderName || team.leaderId?.name || "",
      isRegistered: team.isRegistered ?? true,
    });
    setEditPlayers(team.playerRoster && team.playerRoster.length > 0
      ? team.playerRoster.map(p => ({ name: p.name || "", imageUrl: p.imageUrl || "" }))
      : team.members && team.members.length > 0
      ? team.members.map(m => ({ name: m.userId?.name || "Player", imageUrl: "" }))
      : []
    );
    setShowEditPlayers((team.playerRoster && team.playerRoster.length > 0) || (team.members && team.members.length > 0));
    setShowEditModal(true);

    if (colleges.length === 0) {
      setCollegesLoading(true);
      fetch("/api/public/colleges")
        .then(r => r.json())
        .then(data => { if (data.success) setColleges(data.colleges); })
        .catch(() => {})
        .finally(() => setCollegesLoading(false));
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingTeamId(null);
  };

  const addEditPlayerRow = () => {
    setEditPlayers((prev) => [...prev, { name: "", imageUrl: "" }]);
    setShowEditPlayers(true);
  };

  const removeEditPlayerRow = (index) => {
    setEditPlayers((prev) => prev.filter((_, i) => i !== index));
  };

  const updateEditPlayer = (index, field, value) => {
    setEditPlayers((prev) => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
  };

  const handleUpdateTeam = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/teams", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          teamId: editingTeamId,
          name: editFormData.name,
          college: editFormData.college,
          game: editFormData.game,
          leaderName: editFormData.leaderName,
          isRegistered: editFormData.isRegistered,
          players: editPlayers.filter((p) => p.name.trim()),
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Team updated successfully!");
        closeEditModal();
        fetchTeams(token);
      } else {
        toast.error(data.message || "Failed to update team");
      }
    } catch {
      toast.error("An error occurred while updating the team");
    } finally {
      setSubmitting(false);
    }
  };

  const GAME_OPTIONS = [
    { value: "BGMI", label: "BGMI", color: "bg-amber-100 text-amber-700 border-amber-200" },
    { value: "VALORANT", label: "Valorant", color: "bg-rose-100 text-rose-700 border-rose-200" },
    { value: "FREEFIRE", label: "Free Fire", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  ];

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Teams Directory</h2>
          <p className="text-xs text-gray-500 mt-0.5">View and manage all registered squads</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-100"
          >
            <Plus size={13} /> Add Team
          </button>
          <button
            onClick={deleteSelectedTeams}
            disabled={selectedTeamIds.length === 0}
            className="inline-flex items-center justify-center gap-1.5 rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 size={13} /> Delete selected{selectedTeamIds.length > 0 ? ` (${selectedTeamIds.length})` : ""}
          </button>
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search teams or colleges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-gray-200 bg-white py-1.5 pl-8 pr-4 text-xs text-slate-900 outline-none transition-colors focus:border-red-500 placeholder:text-gray-400 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Teams", value: teams.length, color: "text-slate-900" },
          { label: "Registered", value: registered, color: "text-emerald-600" },
          { label: "Pending", value: pending, color: "text-orange-600" },
        ].map(stat => (
          <div key={stat.label} className="rounded-lg border border-gray-200 bg-white shadow-sm px-4 py-3 flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs text-gray-500">
          <thead className="bg-gray-50 text-[10px] uppercase tracking-wider text-gray-400 border-b border-gray-200">
            <tr>
              <th className="w-10 px-4 py-2.5 font-semibold">
                <input
                  type="checkbox"
                  aria-label="Select all visible teams"
                  checked={filteredTeams.length > 0 && filteredTeams.every((team) => selectedTeamIds.includes(team._id))}
                  onChange={toggleAllVisible}
                  className="h-3.5 w-3.5 accent-red-600"
                />
              </th>
              <th className="px-4 py-2.5 font-semibold">Team Name</th>
              <th className="px-4 py-2.5 font-semibold hidden sm:table-cell">College</th>
              <th className="px-4 py-2.5 font-semibold">Game</th>
              <th className="px-4 py-2.5 font-semibold text-center">Members</th>
              <th className="px-4 py-2.5 font-semibold">Status</th>
              <th className="px-4 py-2.5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading && (
              <tr>
                <td colSpan="7" className="py-12 text-center">
                  <Loader2 className="animate-spin mx-auto text-red-500 mb-2" size={20} />
                  <p className="text-gray-400 text-xs">Loading teams...</p>
                </td>
              </tr>
            )}
            {!loading && filteredTeams.length === 0 && (
              <tr>
                <td colSpan="7" className="py-16 text-center">
                  <Users size={32} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-400 text-sm font-medium">No teams found</p>
                  <p className="text-gray-300 text-xs mt-1">Teams will appear here once players register</p>
                </td>
              </tr>
            )}
            {filteredTeams.map((team) => (
              <tr key={team._id} className="transition-colors hover:bg-gray-50 group">
                <td className="px-4 py-2.5">
                  <input
                    type="checkbox"
                    aria-label={`Select ${team.name}`}
                    checked={selectedTeamIds.includes(team._id)}
                    onChange={() => toggleTeam(team._id)}
                    className="h-3.5 w-3.5 accent-red-600"
                  />
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    {team.isRegistered && <Shield size={11} className="text-emerald-600 shrink-0" />}
                    <p className="font-semibold text-slate-900 text-xs truncate max-w-[140px]">{team.name}</p>
                    {team.isAdminCreated && (
                      <span className="shrink-0 rounded bg-violet-100 border border-violet-200 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-violet-600">
                        Admin
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 sm:hidden mt-0.5 truncate">{team.college}</p>
                  {(team.isAdminCreated || team.leaderName) && (
                    <p className="text-[10px] text-gray-400 mt-0.5">Leader: {team.leaderName || team.leaderId?.name || "N/A"}</p>
                  )}
                </td>
                <td className="px-4 py-2.5 text-gray-500 hidden sm:table-cell text-xs truncate max-w-[160px]">{team.college}</td>
                <td className="px-4 py-2.5">
                  <span className="inline-block rounded bg-gray-100 border border-gray-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    {team.game}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-center font-mono text-xs text-gray-500">
                  {team.isAdminCreated || (team.playerRoster && team.playerRoster.length > 0)
                    ? <>{team.playerRoster?.length || 0}<span className="text-gray-400">/{team.maxPlayers}</span></>
                    : <>{team.members?.length || 0}<span className="text-gray-400">/{team.maxPlayers}</span></>
                  }
                </td>
                <td className="px-4 py-2.5">
                  <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${team.isRegistered ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-orange-50 text-orange-700 border-orange-200"}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${team.isRegistered ? "bg-emerald-500" : "bg-orange-500"}`} />
                    {team.isRegistered ? "Registered" : "Pending"}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right">
                  <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-colors">
                    <button
                      onClick={() => openEditModal(team)}
                      className="inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <Pencil size={10} /> Edit
                    </button>
                    <button
                      onClick={() => deleteTeam(team._id)}
                      className="inline-flex items-center gap-1 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={10} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ====== Add Team Modal ====== */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeAddModal} />

          {/* Modal */}
          <div className="relative w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-gray-200">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Add New Team</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Create a team directly as admin</p>
              </div>
              <button
                onClick={closeAddModal}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitTeam} className="px-6 py-5 space-y-4">
              {/* College */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  College Name <span className="text-red-500">*</span>
                </label>
                {collegesLoading ? (
                  <div className="flex items-center gap-2 py-2 text-xs text-gray-400">
                    <Loader2 size={12} className="animate-spin" /> Loading colleges...
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="text"
                      required
                      list="college-suggestions"
                      value={formData.college}
                      onChange={(e) => setFormData((f) => ({ ...f, college: e.target.value }))}
                      placeholder="Select or type college name..."
                      className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none transition-colors focus:border-red-500 placeholder:text-gray-400 shadow-sm"
                    />
                    <datalist id="college-suggestions">
                      {colleges.map((c) => (
                        <option key={c.name} value={c.name} />
                      ))}
                    </datalist>
                  </div>
                )}
                <p className="text-[10px] text-gray-400 mt-1">Multiple teams can be added for the same college.</p>
              </div>

              {/* Game */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Game <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {GAME_OPTIONS.map((g) => (
                    <button
                      type="button"
                      key={g.value}
                      onClick={() => setFormData((f) => ({ ...f, game: g.value }))}
                      className={`rounded-lg border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                        formData.game === g.value
                          ? `${g.color} ring-2 ring-offset-1 ring-current scale-[1.02]`
                          : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Team Name */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Team Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Enter team name"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none transition-colors focus:border-red-500 placeholder:text-gray-400 shadow-sm"
                />
              </div>

              {/* Team Leader Name */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Team Leader Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.leaderName}
                  onChange={(e) => setFormData((f) => ({ ...f, leaderName: e.target.value }))}
                  placeholder="Enter leader's name"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none transition-colors focus:border-red-500 placeholder:text-gray-400 shadow-sm"
                />
              </div>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Optional
                  </span>
                </div>
              </div>

              {/* Players Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <button
                    type="button"
                    onClick={() => setShowPlayers(!showPlayers)}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
                  >
                    <ChevronDown size={12} className={`transition-transform ${showPlayers ? "rotate-0" : "-rotate-90"}`} />
                    Team Players
                    {players.length > 0 && (
                      <span className="ml-1 rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] font-bold text-gray-500">
                        {players.length}
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={addPlayerRow}
                    className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    <UserPlus size={10} /> Add Player
                  </button>
                </div>

                {showPlayers && players.length > 0 && (
                  <div className="space-y-2">
                    {players.map((player, index) => (
                      <div key={index} className="flex items-start gap-2 rounded-lg border border-gray-100 bg-gray-50/50 p-2.5">
                        <div className="flex-1 space-y-1.5">
                          <input
                            type="text"
                            value={player.name}
                            onChange={(e) => updatePlayer(index, "name", e.target.value)}
                            placeholder="Player name"
                            className="w-full rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 outline-none transition-colors focus:border-red-500 placeholder:text-gray-400 shadow-sm"
                          />
                          <div className="relative">
                            <ImageIcon size={10} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="url"
                              value={player.imageUrl}
                              onChange={(e) => updatePlayer(index, "imageUrl", e.target.value)}
                              placeholder="Image URL (optional)"
                              className="w-full rounded-md border border-gray-200 bg-white py-1.5 pl-7 pr-2.5 text-xs text-slate-900 outline-none transition-colors focus:border-red-500 placeholder:text-gray-400 shadow-sm"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removePlayerRow(index)}
                          className="mt-1 rounded-md p-1 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {showPlayers && players.length === 0 && (
                  <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50/50 py-6 text-center">
                    <UserPlus size={20} className="mx-auto text-gray-300 mb-1.5" />
                    <p className="text-[11px] text-gray-400">No players added yet. Click &quot;Add Player&quot; above.</p>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-500 transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !formData.name || !formData.college || !formData.game || !formData.leaderName}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={12} className="animate-spin" /> Creating...
                    </>
                  ) : (
                    <>
                      <Plus size={12} /> Create Team
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ====== Edit Team Modal ====== */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeEditModal} />

          {/* Modal */}
          <div className="relative w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-gray-200">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Edit Team Details</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Modify squad parameters and roster</p>
              </div>
              <button
                onClick={closeEditModal}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdateTeam} className="px-6 py-5 space-y-4">
              {/* College */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  College Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    list="edit-college-suggestions"
                    value={editFormData.college}
                    onChange={(e) => setEditFormData((f) => ({ ...f, college: e.target.value }))}
                    placeholder="Select or type college name..."
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none transition-colors focus:border-red-500 placeholder:text-gray-400 shadow-sm"
                  />
                  <datalist id="edit-college-suggestions">
                    {colleges.map((c) => (
                      <option key={c.name} value={c.name} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Game */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Game <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {GAME_OPTIONS.map((g) => (
                    <button
                      type="button"
                      key={g.value}
                      onClick={() => setEditFormData((f) => ({ ...f, game: g.value }))}
                      className={`rounded-lg border px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                        editFormData.game === g.value
                          ? `${g.color} ring-2 ring-offset-1 ring-current scale-[1.02]`
                          : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Team Name */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Team Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Enter team name"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none transition-colors focus:border-red-500 placeholder:text-gray-400 shadow-sm"
                />
              </div>

              {/* Team Leader Name */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Team Leader Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.leaderName}
                  onChange={(e) => setEditFormData((f) => ({ ...f, leaderName: e.target.value }))}
                  placeholder="Enter leader's name"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none transition-colors focus:border-red-500 placeholder:text-gray-400 shadow-sm"
                />
              </div>

              {/* Registration Status */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Registration Status
                </label>
                <div className="flex gap-3 items-center pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="radio"
                      name="isRegistered"
                      checked={editFormData.isRegistered === true}
                      onChange={() => setEditFormData((f) => ({ ...f, isRegistered: true }))}
                      className="accent-emerald-600"
                    />
                    Registered (Locked)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="radio"
                      name="isRegistered"
                      checked={editFormData.isRegistered === false}
                      onChange={() => setEditFormData((f) => ({ ...f, isRegistered: false }))}
                      className="accent-orange-600"
                    />
                    Pending
                  </label>
                </div>
              </div>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                    Roster Players
                  </span>
                </div>
              </div>

              {/* Players Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <button
                    type="button"
                    onClick={() => setShowEditPlayers(!showEditPlayers)}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
                  >
                    <ChevronDown size={12} className={`transition-transform ${showEditPlayers ? "rotate-0" : "-rotate-90"}`} />
                    Team Players
                    {editPlayers.length > 0 && (
                      <span className="ml-1 rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] font-bold text-gray-500">
                        {editPlayers.length}
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={addEditPlayerRow}
                    className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    <UserPlus size={10} /> Add Player
                  </button>
                </div>

                {showEditPlayers && editPlayers.length > 0 && (
                  <div className="space-y-2">
                    {editPlayers.map((player, index) => (
                      <div key={index} className="flex items-start gap-2 rounded-lg border border-gray-100 bg-gray-50/50 p-2.5">
                        <div className="flex-1 space-y-1.5">
                          <input
                            type="text"
                            value={player.name}
                            onChange={(e) => updateEditPlayer(index, "name", e.target.value)}
                            placeholder="Player name"
                            className="w-full rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 outline-none transition-colors focus:border-red-500 placeholder:text-gray-400 shadow-sm"
                          />
                          <div className="relative">
                            <ImageIcon size={10} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="url"
                              value={player.imageUrl}
                              onChange={(e) => updateEditPlayer(index, "imageUrl", e.target.value)}
                              placeholder="Image URL (optional)"
                              className="w-full rounded-md border border-gray-200 bg-white py-1.5 pl-7 pr-2.5 text-xs text-slate-900 outline-none transition-colors focus:border-red-500 placeholder:text-gray-400 shadow-sm"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeEditPlayerRow(index)}
                          className="mt-1 rounded-md p-1 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {showEditPlayers && editPlayers.length === 0 && (
                  <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50/50 py-6 text-center">
                    <UserPlus size={20} className="mx-auto text-gray-300 mb-1.5" />
                    <p className="text-[11px] text-gray-400">No players added yet. Click &quot;Add Player&quot; above.</p>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-500 transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !editFormData.name || !editFormData.college || !editFormData.game || !editFormData.leaderName}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={12} className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Pencil size={12} /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

