"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Search,
  Building2,
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash2,
  Shield,
  Users,
  LayoutGrid,
  List,
  Plus,
  X,
  UserPlus,
  ImageIcon,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
} from "lucide-react";
import StatsCards from "@/components/admin/StatsCards";
import RequestCard from "@/components/admin/RequestCard";
import RequestDetailsModal from "@/components/admin/RequestDetailsModal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

export default function CollegesPage() {
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [stats, setStats] = useState({});
  const [requests, setRequests] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list"); // "list" (dropdown representation) or "grid"
  const [expandedCollegeIds, setExpandedCollegeIds] = useState([]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [draggedRequestId, setDraggedRequestId] = useState(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const router = useRouter();

  // Confirm Dialog
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    action: null,
    request: null,
    loading: false,
  });

  // Edit Team Modal state for Colleges Page
  const [showEditTeamModal, setShowEditTeamModal] = useState(false);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [submittingTeam, setSubmittingTeam] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    college: "",
    game: "",
    leaderName: "",
    isRegistered: true,
  });
  const [editPlayers, setEditPlayers] = useState([]);
  const [showEditPlayers, setShowEditPlayers] = useState(false);
  const [collegeSuggestions, setCollegeSuggestions] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchData(storedToken);

      // Fetch user role for edit permission
      fetch("/api/user/me", { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setCurrentUser(data.user);
        });
    }
  }, []);

  const fetchData = async (currentToken) => {
    setLoading(true);
    try {
      const [statsRes, reqRes, teamsRes] = await Promise.all([
        fetch("/api/college-requests/stats", {
          headers: { Authorization: `Bearer ${currentToken}` },
          cache: "no-store",
        }),
        fetch("/api/college-requests?limit=100", {
          headers: { Authorization: `Bearer ${currentToken}` },
          cache: "no-store",
        }),
        fetch("/api/admin/teams", {
          headers: { Authorization: `Bearer ${currentToken}` },
          cache: "no-store",
        }),
      ]);

      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.data);

      const reqData = await reqRes.json();
      if (reqData.success) {
        setRequests(reqData.data);
        setCollegeSuggestions(reqData.data.map((r) => ({ name: r.college_name })));
      }

      const teamsData = await teamsRes.json();
      if (teamsData.success) setAllTeams(teamsData.teams);
    } catch {
      toast.error("Failed to fetch college data");
    } finally {
      setLoading(false);
    }
  };

  const toggleCollegeExpand = (id) => {
    setExpandedCollegeIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleActionClick = (action, request) => {
    setConfirmDialog({ isOpen: true, action, request, loading: false });
  };

  const executeAction = async () => {
    const { action, request } = confirmDialog;
    setConfirmDialog((prev) => ({ ...prev, loading: true }));

    try {
      let res;
      if (action === "delete") {
        res = await fetch(`/api/college-requests/${request._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        let status = "Pending";
        if (action === "approve") status = "Approved";
        if (action === "reject") status = "Rejected";

        res = await fetch(`/api/college-requests/${request._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success(
        action === "delete"
          ? "Request permanently deleted"
          : `Request marked as ${action === "restore" ? "Pending" : action === "approve" ? "Approved" : "Rejected"}`
      );

      fetchData(token);
      if (isDetailsOpen) setIsDetailsOpen(false);
    } catch (err) {
      toast.error(err.message || "Action failed");
    } finally {
      setConfirmDialog({ isOpen: false, action: null, request: null, loading: false });
    }
  };

  const getConfirmDialogContent = () => {
    const { action, request } = confirmDialog;
    if (!request) return {};
    switch (action) {
      case "approve": return { title: "Approve Registration", description: `Approve ${request.college_name}?`, confirmText: "Approve", isDestructive: false };
      case "reject": return { title: "Reject Registration", description: `Reject ${request.college_name}?`, confirmText: "Reject", isDestructive: true };
      case "restore": return { title: "Restore to Pending", description: `Restore ${request.college_name}?`, confirmText: "Restore", isDestructive: false };
      case "delete": return { title: "Permanently Delete", description: `Delete ${request.college_name}?`, confirmText: "Delete", isDestructive: true };
      default: return {};
    }
  };

  const handleReorderDrop = (targetRequest) => {
    if (!draggedRequestId || !targetRequest) return;

    if (draggedRequestId === targetRequest._id) {
      setDraggedRequestId(null);
      return;
    }

    setRequests((prev) => {
      const approved = prev.filter((req) => req.status === "Approved");
      const other = prev.filter((req) => req.status !== "Approved");
      const nextApproved = [...approved];
      const fromIndex = nextApproved.findIndex((req) => req._id === draggedRequestId);
      const toIndex = nextApproved.findIndex((req) => req._id === targetRequest._id);

      if (fromIndex === -1 || toIndex === -1) return prev;

      const [moved] = nextApproved.splice(fromIndex, 1);
      nextApproved.splice(toIndex, 0, moved);
      return [...other, ...nextApproved.map((req, index) => ({ ...req, order: index }))];
    });
    setDraggedRequestId(null);
  };

  const saveCollegeOrder = async () => {
    setSavingOrder(true);
    try {
      const approvedRequests = requests.filter((req) => req.status === "Approved");
      await Promise.all(
        approvedRequests.map((req, index) =>
          fetch(`/api/college-requests/${req._id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ order: index }),
          })
        )
      );
      toast.success("College order updated");
      router.refresh();
      fetchData(token);
    } catch {
      toast.error("Failed to update college order");
    } finally {
      setSavingOrder(false);
    }
  };

  // ---- Edit Team Modal logic for Colleges Page ----
  const openEditTeamModal = (team) => {
    setEditingTeamId(team._id);
    setEditFormData({
      name: team.name || "",
      college: team.college || "",
      game: team.game || "",
      leaderName: team.leaderName || team.leaderId?.name || "",
      isRegistered: team.isRegistered ?? true,
    });
    setEditPlayers(
      team.playerRoster && team.playerRoster.length > 0
        ? team.playerRoster.map((p) => ({ name: p.name || "", imageUrl: p.imageUrl || "" }))
        : team.members && team.members.length > 0
        ? team.members.map((m) => ({ name: m.userId?.name || "Player", imageUrl: "" }))
        : []
    );
    setShowEditPlayers(
      (team.playerRoster && team.playerRoster.length > 0) || (team.members && team.members.length > 0)
    );
    setShowEditTeamModal(true);
  };

  const closeEditTeamModal = () => {
    setShowEditTeamModal(false);
    setEditingTeamId(null);
  };

  const handleUpdateTeam = async (e) => {
    e.preventDefault();
    setSubmittingTeam(true);

    try {
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
        closeEditTeamModal();
        fetchData(token);
      } else {
        toast.error(data.message || "Failed to update team");
      }
    } catch {
      toast.error("Error updating team");
    } finally {
      setSubmittingTeam(false);
    }
  };

  const deleteTeam = async (teamId) => {
    if (!confirm("Are you sure you want to delete this team?")) return;
    try {
      const res = await fetch(`/api/admin/teams?teamId=${teamId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Team deleted");
        fetchData(token);
      } else {
        toast.error(data.message || "Failed to delete team");
      }
    } catch {
      toast.error("Error deleting team");
    }
  };

  const filteredRequests = [...requests]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .filter((req) => {
      const matchesSearch =
        req.college_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.club_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.coordinator_name.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
      if (activeTab === "pending") return req.status === "Pending";
      if (activeTab === "approved") return req.status === "Approved";
      if (activeTab === "rejected") return req.status === "Rejected";
      return true;
    });

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
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Colleges & Teams Directory</h2>
          <p className="text-xs text-gray-500 mt-0.5">Manage registered colleges and view their full team lists</p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row items-center">
          {/* View mode toggle */}
          <div className="flex items-center gap-1 rounded-md border border-gray-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold transition-all ${
                viewMode === "list"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-gray-500 hover:text-slate-900 hover:bg-gray-100"
              }`}
              title="List & Teams Dropdown View"
            >
              <List size={13} /> List & Teams
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold transition-all ${
                viewMode === "grid"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-gray-500 hover:text-slate-900 hover:bg-gray-100"
              }`}
              title="Cards Grid View"
            >
              <LayoutGrid size={13} /> Cards
            </button>
          </div>

          <div className="relative w-full sm:w-56">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search colleges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-gray-200 bg-white py-1.5 pl-8 pr-4 text-xs text-slate-900 outline-none transition-colors focus:border-red-500 placeholder:text-gray-400 shadow-sm"
            />
          </div>
          <button
            onClick={() => setIsReordering((prev) => !prev)}
            className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-700 transition-colors hover:border-red-300 hover:text-red-600 shadow-sm"
          >
            {isReordering ? "Cancel Reorder" : "Reorder Approved"}
          </button>
        </div>
      </div>

      {/* Summary strip */}
      <div className="mb-2">
        <StatsCards stats={stats} />
      </div>

      {isReordering && (
        <div className="flex items-center justify-between rounded-lg border border-dashed border-red-200 bg-red-50/70 px-3 py-2">
          <p className="text-xs font-semibold text-red-700">Drag approved colleges to change the public display order.</p>
          <button
            onClick={saveCollegeOrder}
            disabled={savingOrder}
            className="rounded-md bg-red-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white disabled:opacity-50"
          >
            {savingOrder ? "Saving..." : "Save Order"}
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex overflow-hidden rounded-lg border border-gray-200 bg-gray-50/50 shadow-sm p-1 w-fit">
        {["overview", "approved", "pending", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-xs font-bold capitalize rounded-md transition-all ${
              activeTab === tab
                ? "bg-white text-slate-900 shadow-sm ring-1 ring-gray-200/50"
                : "text-gray-500 hover:text-slate-900 hover:bg-gray-100/50"
            }`}
          >
            {tab === "overview" ? "All Requests" : tab}
          </button>
        ))}
      </div>

      {filteredRequests.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50">
          <p className="text-gray-400 text-sm">No colleges found for this category.</p>
        </div>
      ) : viewMode === "grid" ? (
        /* Grid View */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredRequests.map((request) => (
            <div
              key={request._id}
              draggable={isReordering && request.status === "Approved"}
              onDragStart={() => setDraggedRequestId(request._id)}
              onDragOver={(e) => isReordering && request.status === "Approved" && e.preventDefault()}
              onDrop={() => handleReorderDrop(request)}
              className={isReordering && request.status === "Approved" ? "cursor-grab" : ""}
            >
              <RequestCard
                request={request}
                onViewDetails={(req) => {
                  setSelectedRequest(req);
                  setIsDetailsOpen(true);
                }}
                onAction={handleActionClick}
              />
            </div>
          ))}
        </div>
      ) : (
        /* List & Teams Dropdown Representation */
        <div className="space-y-3">
          {filteredRequests.map((request) => {
            const collegeTeams = allTeams.filter(
              (t) => t.college?.toLowerCase().trim() === request.college_name.toLowerCase().trim()
            );
            const isExpanded = expandedCollegeIds.includes(request._id);
            const bgmiTeams = collegeTeams.filter((t) => t.game === "BGMI");
            const valoTeams = collegeTeams.filter((t) => t.game === "VALORANT");
            const ffTeams = collegeTeams.filter((t) => t.game === "FREEFIRE");

            return (
              <div
                key={request._id}
                draggable={isReordering && request.status === "Approved"}
                onDragStart={() => setDraggedRequestId(request._id)}
                onDragOver={(e) => isReordering && request.status === "Approved" && e.preventDefault()}
                onDrop={() => handleReorderDrop(request)}
                className={`rounded-xl border bg-white shadow-sm transition-all overflow-hidden ${
                  isReordering && request.status === "Approved" ? "cursor-grab" : ""
                } ${isExpanded ? "border-red-200 ring-1 ring-red-500/20" : "border-gray-200 hover:border-gray-300"}`}
              >
                {/* College Header Row */}
                <div
                  onClick={() => toggleCollegeExpand(request._id)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer hover:bg-gray-50/70 transition-colors gap-3"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-100 border border-gray-200 overflow-hidden">
                      {request.college_logo ? (
                        <img
                          src={request.college_logo}
                          alt={request.college_name}
                          className="h-full w-full object-contain p-1"
                        />
                      ) : (
                        <Building2 size={20} className="text-gray-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-900 text-sm tracking-tight truncate">
                          {request.college_name}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${
                            request.status === "Approved"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : request.status === "Rejected"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          {request.status === "Approved" && <CheckCircle size={10} />}
                          {request.status === "Pending" && <Clock size={10} />}
                          {request.status === "Rejected" && <XCircle size={10} />}
                          {request.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 truncate mt-0.5">
                        {request.club_name || "Esports Club"} • Coord: {request.coordinator_name}
                      </p>
                    </div>
                  </div>

                  {/* Team Badges & Expand Icon */}
                  <div className="flex items-center gap-3 justify-between sm:justify-end shrink-0">
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
                      <span className="rounded bg-slate-900 text-white px-2 py-0.5">
                        {collegeTeams.length} {collegeTeams.length === 1 ? "Team" : "Teams"}
                      </span>
                      {bgmiTeams.length > 0 && (
                        <span className="rounded bg-amber-100 text-amber-800 px-1.5 py-0.5 border border-amber-200">
                          BGMI: {bgmiTeams.length}
                        </span>
                      )}
                      {valoTeams.length > 0 && (
                        <span className="rounded bg-rose-100 text-rose-800 px-1.5 py-0.5 border border-rose-200">
                          Valorant: {valoTeams.length}
                        </span>
                      )}
                      {ffTeams.length > 0 && (
                        <span className="rounded bg-emerald-100 text-emerald-800 px-1.5 py-0.5 border border-emerald-200">
                          Free Fire: {ffTeams.length}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      aria-label="Expand college details"
                      className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-200 hover:text-slate-900 transition-colors"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Expanded Dropdown Details Section */}
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50/50 p-4 space-y-4 animate-in fade-in duration-150">
                    {/* Teams List Table under this college */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Users size={14} className="text-red-500" />
                          Registered Squads ({collegeTeams.length})
                        </h4>
                      </div>

                      {collegeTeams.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-gray-200 bg-white p-4 text-center">
                          <p className="text-xs text-gray-400">No teams registered for {request.college_name} yet.</p>
                        </div>
                      ) : (
                        <div className="rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-gray-50 text-[10px] uppercase text-gray-400 border-b border-gray-200">
                              <tr>
                                <th className="px-3 py-2 font-semibold">Team Name</th>
                                <th className="px-3 py-2 font-semibold">Game</th>
                                <th className="px-3 py-2 font-semibold">Leader</th>
                                <th className="px-3 py-2 font-semibold text-center">Roster</th>
                                <th className="px-3 py-2 font-semibold">Status</th>
                                <th className="px-3 py-2 font-semibold text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {collegeTeams.map((team) => (
                                <tr key={team._id} className="hover:bg-gray-50/70 transition-colors">
                                  <td className="px-3 py-2 font-bold text-slate-900">
                                    <div className="flex items-center gap-1.5">
                                      {team.isRegistered && <Shield size={10} className="text-emerald-600 shrink-0" />}
                                      <span>{team.name}</span>
                                      {team.isAdminCreated && (
                                        <span className="rounded bg-violet-100 text-violet-700 px-1 py-0.2 text-[8px] font-bold uppercase">
                                          Admin
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-3 py-2">
                                    <span className="rounded bg-gray-100 border border-gray-200 px-1.5 py-0.5 text-[9px] font-bold text-slate-700 uppercase">
                                      {team.game}
                                    </span>
                                  </td>
                                  <td className="px-3 py-2 text-gray-600">
                                    {team.leaderName || team.leaderId?.name || "N/A"}
                                  </td>
                                  <td className="px-3 py-2 text-center font-mono text-[11px] text-gray-500">
                                    {team.isAdminCreated || (team.playerRoster && team.playerRoster.length > 0)
                                      ? team.playerRoster?.length || 0
                                      : team.members?.length || 0}
                                    /{team.maxPlayers}
                                  </td>
                                  <td className="px-3 py-2">
                                    <span
                                      className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                                        team.isRegistered
                                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                          : "bg-orange-50 text-orange-700 border border-orange-200"
                                      }`}
                                    >
                                      {team.isRegistered ? "Registered" : "Pending"}
                                    </span>
                                  </td>
                                  <td className="px-3 py-2 text-right">
                                    <div className="flex items-center justify-end gap-1.5">
                                      <button
                                        onClick={() => openEditTeamModal(team)}
                                        className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors"
                                      >
                                        <Pencil size={10} /> Edit
                                      </button>
                                      <button
                                        onClick={() => deleteTeam(team._id)}
                                        className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-bold uppercase text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 transition-colors"
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
                      )}
                    </div>

                    {/* Full College Details & Action Footer */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-gray-200/60 gap-2">
                      <div className="text-[11px] text-gray-500 space-x-3">
                        <span><strong>Domain:</strong> @{request.email_domain || "N/A"}</span>
                        <span><strong>Phone:</strong> {request.coordinator_phone || "N/A"}</span>
                        <span><strong>Date:</strong> {new Date(request.createdAt).toLocaleDateString()}</span>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => {
                            setSelectedRequest(request);
                            setIsDetailsOpen(true);
                          }}
                          className="rounded border border-gray-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase text-slate-700 hover:bg-gray-100 transition-colors shadow-sm"
                        >
                          View Full Request Details
                        </button>
                        {request.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleActionClick("approve", request)}
                              className="rounded bg-emerald-600 px-2.5 py-1 text-[10px] font-bold uppercase text-white hover:bg-emerald-500 transition-colors shadow-sm"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleActionClick("reject", request)}
                              className="rounded bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase text-white hover:bg-red-500 transition-colors shadow-sm"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Request Details */}
      <RequestDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        request={selectedRequest}
        currentUser={currentUser}
        onUpdate={() => fetchData(token)}
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, action: null, request: null, loading: false })}
        onConfirm={executeAction}
        loading={confirmDialog.loading}
        {...getConfirmDialogContent()}
      />

      {/* Edit Team Modal for Colleges Page */}
      {showEditTeamModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeEditTeamModal} />

          <div className="relative w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-gray-200">
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">Edit Team Details</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">Modify squad parameters and roster</p>
              </div>
              <button
                onClick={closeEditTeamModal}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleUpdateTeam} className="px-6 py-5 space-y-4">
              {/* College */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  College Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  list="colleges-page-suggestions"
                  value={editFormData.college}
                  onChange={(e) => setEditFormData((f) => ({ ...f, college: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none transition-colors focus:border-red-500 shadow-sm"
                />
                <datalist id="colleges-page-suggestions">
                  {collegeSuggestions.map((c) => (
                    <option key={c.name} value={c.name} />
                  ))}
                </datalist>
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
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none transition-colors focus:border-red-500 shadow-sm"
                />
              </div>

              {/* Leader Name */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Team Leader Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.leaderName}
                  onChange={(e) => setEditFormData((f) => ({ ...f, leaderName: e.target.value }))}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-slate-900 outline-none transition-colors focus:border-red-500 shadow-sm"
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
                      name="isRegisteredCollegesPage"
                      checked={editFormData.isRegistered === true}
                      onChange={() => setEditFormData((f) => ({ ...f, isRegistered: true }))}
                      className="accent-emerald-600"
                    />
                    Registered (Locked)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
                    <input
                      type="radio"
                      name="isRegisteredCollegesPage"
                      checked={editFormData.isRegistered === false}
                      onChange={() => setEditFormData((f) => ({ ...f, isRegistered: false }))}
                      className="accent-orange-600"
                    />
                    Pending
                  </label>
                </div>
              </div>

              {/* Roster Players */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <button
                    type="button"
                    onClick={() => setShowEditPlayers(!showEditPlayers)}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
                  >
                    <ChevronDown size={12} className={`transition-transform ${showEditPlayers ? "rotate-0" : "-rotate-90"}`} />
                    Team Players ({editPlayers.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditPlayers((p) => [...p, { name: "", imageUrl: "" }])}
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
                            onChange={(e) =>
                              setEditPlayers((prev) =>
                                prev.map((p, i) => (i === index ? { ...p, name: e.target.value } : p))
                              )
                            }
                            placeholder="Player name"
                            className="w-full rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 outline-none focus:border-red-500 shadow-sm"
                          />
                          <div className="relative">
                            <ImageIcon size={10} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="url"
                              value={player.imageUrl}
                              onChange={(e) =>
                                setEditPlayers((prev) =>
                                  prev.map((p, i) => (i === index ? { ...p, imageUrl: e.target.value } : p))
                                )
                              }
                              placeholder="Image URL (optional)"
                              className="w-full rounded-md border border-gray-200 bg-white py-1.5 pl-7 pr-2.5 text-xs text-slate-900 outline-none focus:border-red-500 shadow-sm"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEditPlayers((prev) => prev.filter((_, i) => i !== index))}
                          className="mt-1 rounded-md p-1 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeEditTeamModal}
                  className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-500 transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingTeam || !editFormData.name || !editFormData.college || !editFormData.game || !editFormData.leaderName}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submittingTeam ? (
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

