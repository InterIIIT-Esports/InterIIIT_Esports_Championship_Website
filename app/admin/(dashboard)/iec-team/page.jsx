"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Image as ImageIcon, Users, Pencil, Check, X, Clock } from "lucide-react";
import Image from "next/image";

export default function IECTeamAdminPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("team");
  const [isReordering, setIsReordering] = useState(false);
  const [draggedMemberId, setDraggedMemberId] = useState(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const router = useRouter();

  const DEPARTMENTS = ["Management", "Free Fire", "BGMI", "Valorant", "Sponsorship", "Web Development", "Social Media", "Design", "Content"];

  // Applications state
  const [applications, setApplications] = useState([]);
  const [appsLoading, setAppsLoading] = useState(false);
  const [appFilter, setAppFilter] = useState("PENDING");

  const [form, setForm] = useState({ name: "", role: "", college: "", instagram: "", linkedin: "", order: 0, departments: [] });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", role: "", college: "", instagram: "", linkedin: "", order: 0, departments: [] });

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (t) { setToken(t); fetchMembers(); }
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/public/iec-team", { cache: "no-store" });
      const data = await res.json();
      if (data.success) setMembers(data.team);
    } catch { toast.error("Failed to fetch IEC team"); }
    finally { setLoading(false); }
  };

  const fetchApplications = async () => {
    setAppsLoading(true);
    try {
      const t = localStorage.getItem("token");
      const res = await fetch(`/api/iec-team-applications?status=${appFilter}`, {
        headers: { Authorization: `Bearer ${t}` }
      });
      const data = await res.json();
      if (data.success) setApplications(data.data);
    } catch { toast.error("Failed to fetch applications"); }
    finally { setAppsLoading(false); }
  };

  useEffect(() => {
    if (activeTab === "applications" && token) fetchApplications();
  }, [activeTab, appFilter, token]);

  const handleAppAction = async (appId, status) => {
    try {
      const res = await fetch(`/api/iec-team-applications/${appId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        fetchApplications();
        if (status === "APPROVED") {
          await fetchMembers();
        }
        router.refresh();
      } else toast.error(data.error);
    } catch { toast.error("Action failed"); }
  };

  const handleAppDelete = async (appId) => {
    if (!confirm("Delete this application permanently?")) return;
    try {
      const res = await fetch(`/api/iec-team-applications/${appId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) { toast.success("Deleted"); fetchApplications(); }
      else toast.error(data.error);
    } catch { toast.error("Delete failed"); }
  };

  const openEdit = (member) => {
    setEditTarget(member);
    setEditForm({
      name: member.name,
      role: member.role,
      college: member.college || "",
      instagram: member.instagram || "",
      linkedin: member.linkedin || "",
      order: member.order || 0,
      departments: member.departments || [],
    });
    setEditImageFile(null);
    setEditImagePreview(member.image_url);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) { setImageFile(file); setImagePreview(URL.createObjectURL(file)); }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) { setEditImageFile(file); setEditImagePreview(URL.createObjectURL(file)); }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return toast.error("Profile image is required");
    setSubmitting(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("role", form.role);
    formData.append("college", form.college);
    formData.append("instagram", form.instagram);
    formData.append("linkedin", form.linkedin);
    formData.append("order", form.order);
    formData.append("departments", JSON.stringify(form.departments));
    formData.append("image", imageFile);
    try {
      const res = await fetch("/api/admin/iec-team", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Member added");
        setShowAdd(false);
        setForm({ name: "", role: "", college: "", instagram: "", linkedin: "", order: 0, departments: [] });
        setImageFile(null); setImagePreview(null);
        await fetchMembers();
        router.refresh();
      } else toast.error(data.error);
    } catch { toast.error("Failed to add member"); }
    finally { setSubmitting(false); }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    formData.append("name", editForm.name);
    formData.append("role", editForm.role);
    formData.append("college", editForm.college);
    formData.append("instagram", editForm.instagram);
    formData.append("linkedin", editForm.linkedin);
    formData.append("order", editForm.order);
    formData.append("departments", JSON.stringify(editForm.departments));
    if (editImageFile) formData.append("image", editImageFile);
    try {
      const res = await fetch(`/api/admin/iec-team?id=${editTarget._id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        toast.success("Member updated");
        setMembers((prev) => prev.map((member) => member._id === data.member._id ? data.member : member));
        setEditTarget(null);
        setEditImageFile(null);
        await fetchMembers();
        router.refresh();
      } else {
        toast.error(data.error || "Failed to update member");
      }
    } catch (err) {
      toast.error(err.message || "Failed to update member");
    }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this member from the core team?")) return;
    try {
      const res = await fetch(`/api/admin/iec-team?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) { toast.success("Member removed"); await fetchMembers(); router.refresh(); }
    } catch { toast.error("Delete failed"); }
  };

  const handleReorderDrop = (targetMember) => {
    if (!draggedMemberId || !targetMember) return;

    if (draggedMemberId === targetMember._id) {
      setDraggedMemberId(null);
      return;
    }

    setMembers((prev) => {
      const next = [...prev];
      const fromIndex = next.findIndex((member) => member._id === draggedMemberId);
      const toIndex = next.findIndex((member) => member._id === targetMember._id);

      if (fromIndex === -1 || toIndex === -1) return prev;

      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next.map((member, index) => ({ ...member, order: index }));
    });
    setDraggedMemberId(null);
  };

  const saveMemberOrder = async () => {
    if (!token) return;
    setSavingOrder(true);
    try {
      await Promise.all(
        members.map((member, index) => {
          const formData = new FormData();
          formData.append("order", index);
          return fetch(`/api/admin/iec-team?id=${member._id}`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          });
        })
      );
      toast.success("Team order updated");
      router.refresh();
    } catch {
      toast.error("Failed to save team order");
    } finally {
      setSavingOrder(false);
    }
  };

  const inputCls = "w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-sm text-slate-900 placeholder:text-gray-400 focus:border-red-500 focus:outline-none shadow-sm";
  const labelCls = "text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1 block";

  const renderMemberModal = ({ title, onSubmit, imgPreview, onImgChange, imgRef, form: f, setForm: sf, isEdit, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-xl border border-gray-200 bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-slate-900 text-xs">âœ• Close</button>
        </div>
        <form onSubmit={onSubmit} className="space-y-3">
          {/* Image picker */}
          <div className="flex flex-col items-center mb-2">
            <div
              onClick={() => imgRef.current?.click()}
              className="w-24 h-24 rounded-full border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer hover:border-red-500 transition-colors relative group"
            >
              {imgPreview
                ? <Image src={imgPreview} alt="Preview" width={96} height={96} className="w-full h-full object-cover" />
                : <ImageIcon size={22} className="text-gray-300" />
              }
              {/* Overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                <Pencil size={18} className="text-white" />
              </div>
            </div>
            <input type="file" accept="image/*" ref={imgRef} onChange={onImgChange} className="hidden" />
            <p className="text-[10px] text-gray-500 mt-2">{isEdit ? "Click photo to change image" : "Click to upload photo *"}</p>
          </div>

          <div><label className={labelCls}>Name *</label><input required type="text" placeholder="Full name" value={f.name} onChange={e => sf({...f, name: e.target.value})} className={inputCls} /></div>
          <div><label className={labelCls}>Role *</label><input required type="text" placeholder="e.g. Lead Organizer" value={f.role} onChange={e => sf({...f, role: e.target.value})} className={inputCls} /></div>
          <div><label className={labelCls}>College</label><input type="text" placeholder="e.g. IIIT Hyderabad" value={f.college || ""} onChange={e => sf({...f, college: e.target.value})} className={inputCls} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={labelCls}>Instagram URL</label><input type="text" placeholder="https://instagram.com/..." value={f.instagram} onChange={e => sf({...f, instagram: e.target.value})} className={inputCls} /></div>
            <div><label className={labelCls}>LinkedIn URL</label><input type="text" placeholder="https://linkedin.com/..." value={f.linkedin} onChange={e => sf({...f, linkedin: e.target.value})} className={inputCls} /></div>
          </div>
          <div><label className={labelCls}>Sort Order</label><input type="number" placeholder="0 = first" value={f.order} onChange={e => sf({...f, order: parseInt(e.target.value) || 0})} className={inputCls} /></div>
          
          <div className="mt-2">
            <label className={labelCls}>Teams / Departments</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
              {DEPARTMENTS.map(dept => (
                <label key={dept} className="flex items-center gap-2 text-[11px] text-slate-700 cursor-pointer hover:text-slate-900">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                    checked={f.departments?.includes(dept) || false}
                    onChange={(e) => {
                      const current = f.departments || [];
                      if (e.target.checked) sf({...f, departments: [...current, dept]});
                      else sf({...f, departments: current.filter(d => d !== dept)});
                    }}
                  />
                  {dept}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 mt-4">
            <button type="button" onClick={onClose} className="px-3 py-1.5 text-xs text-gray-500 hover:text-slate-900 transition-colors">Cancel</button>
            <button type="submit" disabled={submitting} className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-md text-xs font-bold uppercase tracking-wider disabled:opacity-50 transition-colors">
              {submitting ? "Saving..." : isEdit ? "Save Changes" : "Save Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">IEC Core Team</h2>
          <p className="text-xs text-gray-500 mt-0.5">Organizers displayed on the public website</p>
        </div>
        {activeTab === "team" && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsReordering((prev) => !prev)}
              className="flex items-center gap-1.5 border border-gray-200 bg-white px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider text-slate-700 transition-colors hover:border-red-300 hover:text-red-600"
            >
              {isReordering ? "Cancel" : "Reorder"}
            </button>
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Plus size={13} /> Add Member
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex overflow-hidden rounded-lg border border-gray-200 bg-gray-50/50 shadow-sm p-1 w-fit">
        {[{key: "team", label: "Current Team"}, {key: "applications", label: "Applications"}].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
              activeTab === tab.key
                ? "bg-white text-slate-900 shadow-sm ring-1 ring-gray-200/50"
                : "text-gray-500 hover:text-slate-900 hover:bg-gray-100/50"
            }`}
          >
            {tab.label}
            {tab.key === "applications" && applications.length > 0 && (
              <span className="ml-1.5 bg-red-100 text-red-600 px-1.5 py-0.5 rounded text-[9px] font-bold">
                {applications.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Summary strip */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
          {activeTab === "team" ? "Total Members" : "Applications"}
        </p>
        <p className="text-xl font-bold text-slate-900">
          {activeTab === "team" ? members.length : applications.length}
        </p>
      </div>

      {/* â•â•â•â•â•â• CURRENT TEAM TAB â•â•â•â•â•â• */}
      {activeTab === "team" && (<>

      {isReordering && (
        <div className="flex items-center justify-between rounded-lg border border-dashed border-red-200 bg-red-50/70 px-3 py-2">
          <p className="text-xs font-semibold text-red-700">Drag a card to change the public display order.</p>
          <button
            onClick={saveMemberOrder}
            disabled={savingOrder}
            className="rounded-md bg-red-600 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white disabled:opacity-50"
          >
            {savingOrder ? "Saving..." : "Save Order"}
          </button>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="animate-spin text-red-500" size={24} />
        </div>
      ) : members.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border border-dashed border-gray-200 bg-gray-50 rounded-xl">
          <Users size={32} className="text-gray-300 mb-3" />
          <p className="text-gray-400 text-sm font-medium">No team members yet</p>
          <p className="text-gray-400 text-xs mt-1">Click "Add Member" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {members.map(member => (
            <div
              key={member._id}
              draggable={isReordering}
              onDragStart={() => setDraggedMemberId(member._id)}
              onDragOver={(e) => isReordering && e.preventDefault()}
              onDrop={() => handleReorderDrop(member)}
              className={`relative group bg-white border border-gray-200 rounded-xl overflow-hidden p-4 text-center hover:border-gray-300 shadow-sm transition-all ${isReordering ? "cursor-grab" : ""}`}
            >
              {/* Action buttons â€” appear on hover */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <button
                  onClick={() => openEdit(member)}
                  className="p-1 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded text-gray-500 border border-gray-200 transition-colors shadow-sm"
                  title="Edit"
                >
                  <Pencil size={11} />
                </button>
                <button
                  onClick={() => handleDelete(member._id)}
                  className="p-1 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded text-gray-500 border border-gray-200 transition-colors shadow-sm"
                  title="Remove"
                >
                  <Trash2 size={11} />
                </button>
              </div>

              <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border border-red-200 mb-3 bg-gray-50">
                <Image src={member.image_url} alt={member.name} width={64} height={64} className="w-full h-full object-cover" />
              </div>
              <p className="font-bold text-slate-900 text-sm leading-tight truncate">{member.name}</p>
              <p className="text-red-600 text-[10px] font-semibold mt-0.5 truncate">{member.role}</p>
              {member.college && <p className="mt-1 text-[9px] font-medium uppercase tracking-wider text-gray-400 truncate">{member.college}</p>}
            </div>
          ))}
        </div>
      )}
      </>)}

      {/* â•â•â•â•â•â• APPLICATIONS TAB â•â•â•â•â•â• */}
      {activeTab === "applications" && (
        <>
          {/* Filter pills */}
          <div className="flex gap-2">
            {["PENDING", "APPROVED", "REJECTED"].map((s) => (
              <button
                key={s}
                onClick={() => setAppFilter(s)}
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border transition-all ${
                  appFilter === s
                    ? s === "PENDING" ? "bg-orange-50 text-orange-700 border-orange-200"
                      : s === "APPROVED" ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-red-50 text-red-700 border-red-200"
                    : "bg-white text-gray-400 border-gray-200 hover:text-slate-900"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {appsLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="animate-spin text-red-500" size={24} />
            </div>
          ) : applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 border border-dashed border-gray-200 bg-gray-50 rounded-xl">
              <Clock size={32} className="text-gray-300 mb-3" />
              <p className="text-gray-400 text-sm font-medium">No {appFilter.toLowerCase()} applications</p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {applications.map((app) => (
                <div key={app._id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-gray-300 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 shrink-0 rounded-full overflow-hidden border border-gray-200 bg-gray-50">
                      <Image src={app.image_url} alt={app.name} width={56} height={56} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 text-sm truncate">{app.name}</p>
                      <p className="text-red-600 text-[10px] font-semibold truncate">{app.role}</p>
                      <p className="text-gray-400 text-[10px] truncate mt-0.5">{app.email}</p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {app.reason_to_join}
                  </p>

                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100">
                    {app.instagram && (
                      <span className="text-[9px] bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded text-gray-500 truncate max-w-[80px]">
                        {app.instagram}
                      </span>
                    )}
                    {app.linkedin && (
                      <span className="text-[9px] bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded text-gray-500 truncate max-w-[80px]">
                        LinkedIn
                      </span>
                    )}
                    <div className="flex-1" />
                    {appFilter === "PENDING" && (
                      <>
                        <button
                          onClick={() => handleAppAction(app._id, "APPROVED")}
                          className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                        >
                          <Check size={10} /> Approve
                        </button>
                        <button
                          onClick={() => handleAppAction(app._id, "REJECTED")}
                          className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-colors"
                        >
                          <X size={10} /> Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleAppDelete(app._id)}
                      className="p-1 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Add Member Modal */}
      {showAdd && renderMemberModal({
        title: "Add IEC Member",
        onSubmit: handleAddSubmit,
        imgPreview: imagePreview,
        onImgChange: handleImageChange,
        imgRef: fileInputRef,
        form: form,
        setForm: setForm,
        isEdit: false,
        onClose: () => setShowAdd(false)
      })}

      {/* Edit Member Modal */}
      {editTarget && renderMemberModal({
        title: `Edit â€” ${editTarget.name}`,
        onSubmit: handleEditSubmit,
        imgPreview: editImagePreview,
        onImgChange: handleEditImageChange,
        imgRef: editFileInputRef,
        form: editForm,
        setForm: setEditForm,
        isEdit: true,
        onClose: () => setEditTarget(null)
      })}
    </div>
  );
}

