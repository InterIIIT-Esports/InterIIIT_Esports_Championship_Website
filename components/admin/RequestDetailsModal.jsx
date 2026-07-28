"use client";

import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Building2, Mail, Phone, MessageCircle, Briefcase, User, Globe, Calendar, CheckCircle, Edit, Save, X, Upload, ImageIcon, ClipboardList, ExternalLink } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";


// ─── Main Modal ────────────────────────────────────────────────────────────────
export default function RequestDetailsModal({ isOpen, onClose, request, currentUser, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  // Logo state
  const [pendingLogoFile, setPendingLogoFile] = useState(null);   // File ready to upload
  const [pendingLogoPreview, setPendingLogoPreview] = useState(null); // object URL for preview
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (request) {
      setFormData({
        college_name: request.college_name || "",
        club_name: request.club_name || "",
        coordinator_name: request.coordinator_name || "",
        designation: request.designation || "",
        contact_number: request.contact_number || "",
        whatsapp_number: request.whatsapp_number || "",
        club_email: request.club_email || "",
        club_instagram: request.club_instagram || "",
        college_website: request.college_website || "",
        description: request.description || "",
        experience: request.experience || "",
        email_domain: request.email_domain || "",
        intra_registration_form: request.intra_registration_form || "",
      });
      setIsEditing(false);
      setPendingLogoFile(null);
      setPendingLogoPreview(null);
    }
  }, [request, isOpen]);

  // Cleanup object URLs
  useEffect(() => {
    return () => { if (pendingLogoPreview) URL.revokeObjectURL(pendingLogoPreview); };
  }, [pendingLogoPreview]);

  if (!request) return null;

  const isAdmin = currentUser?.role === "ADMIN";

  const statusColors = {
    Pending:  "bg-amber-50 text-amber-700 border-amber-200",
    Approved: "bg-green-50 text-green-700 border-green-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");

      if (pendingLogoFile) {
        // Upload logo via multipart
        const fd = new FormData();
        fd.append("college_logo", pendingLogoFile);
        Object.entries(formData).forEach(([k, v]) => fd.append(k, v));

        const res = await fetch(`/api/college-requests/${request._id}`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        });
        const data = await res.json();
        if (data.success) {
          toast.success("Details + logo updated successfully");
          setIsEditing(false);
          setPendingLogoFile(null);
          setPendingLogoPreview(null);
          if (onUpdate) onUpdate();
        } else toast.error(data.error || "Failed to update");
      } else {
        // JSON update (no logo change)
        const res = await fetch(`/api/college-requests/${request._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success) {
          toast.success("Details updated successfully");
          setIsEditing(false);
          if (onUpdate) onUpdate();
        } else toast.error(data.error || "Failed to update details");
      }
    } catch { toast.error("An error occurred while saving"); }
    finally { setSaving(false); }
  };

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (pendingLogoPreview) URL.revokeObjectURL(pendingLogoPreview);

    const url = URL.createObjectURL(file);
    setPendingLogoPreview(url);
    setPendingLogoFile(file);

    // reset so same file can be picked again
    e.target.value = "";
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setPendingLogoFile(null);
    if (pendingLogoPreview) URL.revokeObjectURL(pendingLogoPreview);
    setPendingLogoPreview(null);
  };

  const inputCls = "w-full bg-white border border-gray-200 rounded px-2 py-1 text-sm text-slate-900 focus:border-red-500 focus:outline-none";

  const currentLogoSrc = pendingLogoPreview || request.college_logo || null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-gray-200 bg-white text-slate-900 shadow-xl sm:max-w-3xl">
          <DialogHeader className="mb-4">
            <div className="flex items-center justify-between pr-6">
              <div className="flex items-center gap-4">
                <DialogTitle className="text-xl font-bold tracking-tight text-slate-900">
                  Registration Details
                </DialogTitle>
                {isAdmin && !isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-1.5 rounded-md bg-gray-100 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-gray-200 transition-colors"
                  >
                    <Edit size={13} /> Edit
                  </button>
                )}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${statusColors[request.status]}`}>
                {request.status}
              </span>
            </div>
          </DialogHeader>

          <div className="space-y-6 pb-4">
            {/* College header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              {/* Logo section */}
              <div className="relative shrink-0">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                  {currentLogoSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={currentLogoSrc} alt={request.college_name} className="h-full w-full object-contain p-2" />
                  ) : (
                    <Building2 size={40} className="text-gray-300" />
                  )}
                </div>

                {/* Edit logo button — only in editing mode */}
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Change logo"
                    className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border border-gray-200 bg-white shadow-md text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                  >
                    <ImageIcon size={13} />
                  </button>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />

                {/* Pending logo badge */}
                {pendingLogoPreview && (
                  <div className="absolute -top-2 -left-2 flex h-5 items-center gap-0.5 rounded-full bg-green-500 px-1.5 text-[9px] font-bold text-white shadow">
                    <Upload size={8} /> New
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-1">
                {isEditing
                  ? <input type="text" name="college_name" value={formData.college_name} onChange={handleChange} className={`${inputCls} text-xl font-bold`} />
                  : <h3 className="text-xl font-bold text-slate-900">{request.college_name}</h3>}
                {isEditing
                  ? <input type="text" name="club_name" value={formData.club_name} onChange={handleChange} className={`${inputCls} text-red-600 font-semibold mt-1`} />
                  : <p className="flex items-center gap-2 text-sm font-semibold text-red-600"><Briefcase size={15} />{request.club_name}</p>}
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1"><Calendar size={12} /> Submitted {format(new Date(request.createdAt), "MMM d, yyyy")}</div>
                  {request.approved_at && <div className="flex items-center gap-1 text-green-600"><CheckCircle size={12} /> Approved {format(new Date(request.approved_at), "MMM d, yyyy")}</div>}
                </div>

                {/* Logo change hint in edit mode */}
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-red-600 hover:text-red-500 transition-colors"
                  >
                    <Upload size={12} />
                    {pendingLogoPreview ? "Change logo again" : "Upload new logo"}
                  </button>
                )}
              </div>
            </div>

            <Separator className="bg-gray-100" />

            <div className="grid gap-6 md:grid-cols-2">
              {/* Left: Coordinator & Club contact */}
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Coordinator</h4>
                  <div className="space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-3">
                    <div className="flex items-center gap-2 text-sm">
                      <User size={14} className="text-gray-400 shrink-0" />
                      {isEditing ? (
                        <div className="flex-1 space-y-1.5">
                          <input type="text" name="coordinator_name" value={formData.coordinator_name} onChange={handleChange} placeholder="Name" className={inputCls} />
                          <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="Designation" className={inputCls} />
                        </div>
                      ) : (
                        <div><p className="font-semibold text-slate-900">{request.coordinator_name}</p><p className="text-xs text-gray-500">{request.designation}</p></div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={14} className="text-gray-400 shrink-0" />
                      {isEditing
                        ? <input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} placeholder="Contact" className={`${inputCls} flex-1`} />
                        : <span className="text-slate-700">{request.contact_number}</span>}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MessageCircle size={14} className="text-green-500 shrink-0" />
                      {isEditing
                        ? <input type="text" name="whatsapp_number" value={formData.whatsapp_number} onChange={handleChange} placeholder="WhatsApp" className={`${inputCls} flex-1`} />
                        : <span className="text-slate-700">{request.whatsapp_number || "—"}</span>}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Club Contact</h4>
                  <div className="space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={14} className="text-gray-400 shrink-0" />
                      {isEditing
                        ? <input type="email" name="club_email" value={formData.club_email} onChange={handleChange} className={`${inputCls} flex-1`} />
                        : <span className="text-slate-700">{request.club_email}</span>}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaInstagram size={14} className="text-pink-500 shrink-0" />
                      {isEditing
                        ? <input type="text" name="club_instagram" value={formData.club_instagram} onChange={handleChange} placeholder="Instagram" className={`${inputCls} flex-1`} />
                        : <span className="text-slate-700">{request.club_instagram || "—"}</span>}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Globe size={14} className="text-blue-500 shrink-0" />
                      {isEditing
                        ? <input type="url" name="college_website" value={formData.college_website} onChange={handleChange} placeholder="Website" className={`${inputCls} flex-1`} />
                        : request.college_website
                          ? <a href={request.college_website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline truncate">{request.college_website}</a>
                          : <span className="text-gray-400">—</span>}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={14} className="text-purple-500 shrink-0" />
                      {isEditing
                        ? <div className="flex-1 flex items-center gap-1"><span className="text-gray-400">@</span><input type="text" name="email_domain" value={formData.email_domain} onChange={handleChange} placeholder="college.ac.in" className={`${inputCls} flex-1`} /></div>
                        : request.email_domain
                          ? <span className="text-slate-700">@{request.email_domain}</span>
                          : <span className="text-gray-400">—</span>}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ClipboardList size={14} className="text-orange-500 shrink-0" />
                      {isEditing
                        ? <input type="url" name="intra_registration_form" value={formData.intra_registration_form} onChange={handleChange} placeholder="https://forms.google.com/..." className={`${inputCls} flex-1`} />
                        : request.intra_registration_form
                          ? <a href={request.intra_registration_form} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-orange-600 hover:underline truncate"><span className="truncate">{request.intra_registration_form}</span><ExternalLink size={11} className="shrink-0" /></a>
                          : <span className="text-gray-400">—</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Description & Experience */}
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Club Description</h4>
                  {isEditing
                    ? <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className={`${inputCls} resize-none`} />
                    : <div className="min-h-[90px] rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm text-slate-700 leading-relaxed">
                        {request.description || <span className="italic text-gray-400">No description provided</span>}
                      </div>}
                </div>
                <div>
                  <h4 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Previous Experience</h4>
                  {isEditing
                    ? <textarea name="experience" value={formData.experience} onChange={handleChange} rows={4} className={`${inputCls} resize-none`} />
                    : <div className="min-h-[90px] rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm text-slate-700 leading-relaxed">
                        {request.experience || <span className="italic text-gray-400">No experience details provided</span>}
                      </div>}
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button onClick={handleCancelEdit} disabled={saving} className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-500 hover:text-slate-900 transition-colors">
                  <X size={15} /> Cancel
                </button>
                <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-500 transition-colors disabled:opacity-50">
                  <Save size={15} /> {saving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
