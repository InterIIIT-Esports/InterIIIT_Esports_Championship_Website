"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Building2,
  Mail,
  User,
  Phone,
  MessageCircle,
  FileText,
  Briefcase,
  Instagram,
  Link as LinkIcon,
  Upload,
  CheckCircle2,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";

const inputClass =
  "w-full rounded-lg border border-white/10 bg-black/40 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-500 focus:border-red-500 focus:bg-white/5";

const labelClass = "text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5 block";

export default function CollegeRegistrationForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    college_name: "",
    college_website: "",
    club_name: "",
    club_email: "",
    club_instagram: "",
    coordinator_name: "",
    designation: "President",
    contact_number: "",
    whatsapp_number: "",
    email_domain: "",
    description: "",
    experience: "",
    intra_registration_form: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Logo must be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("File must be an image");
        return;
      }
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!confirmed) {
      toast.error("Please confirm authorization");
      return;
    }

    if (!logoFile) {
      toast.error("Please upload a college logo");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      if (logoFile) {
        data.append("college_logo", logoFile);
      }

      const res = await fetch("/api/college-requests", {
        method: "POST",
        body: data, // No Content-Type header so browser sets multipart/form-data with boundary
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit request");
      }

      setSuccess(true);
      toast.success("Registration submitted successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center text-center">
        <div className="mb-6 rounded-full bg-green-500/10 p-4">
          <CheckCircle2 size={64} className="text-green-500" />
        </div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">
          Request Submitted
        </h2>
        <p className="mx-auto max-w-md text-sm text-gray-400">
          Your registration request has been submitted successfully and is awaiting approval from the IIITians Network team. You will be notified on your club email once approved.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-8 rounded-lg bg-white px-8 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-200"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* SECTION 1: College Info */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
        <h3 className="mb-6 flex items-center gap-2 border-b border-white/10 pb-4 text-lg font-semibold text-white">
          <Building2 size={20} className="text-red-500" />
          College Information
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 md:col-span-2">
            <div>
              <label className={labelClass}>College Logo *</label>
              <div className="mt-2 flex items-center gap-6">
                <div
                  className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-white/20 bg-black/50"
                >
                  {logoPreview ? (
                    <Image
                      src={logoPreview}
                      alt="Logo preview"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Building2 size={32} className="text-gray-500" />
                  )}
                </div>
                <div className="flex-1">
                  <label className="group relative flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10">
                    <Upload size={18} className="text-gray-400 group-hover:text-red-500" />
                    <span>Upload Logo (Max 5MB)</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={handleLogoChange}
                    />
                  </label>
                  <p className="mt-2 text-xs text-gray-500">
                    Recommended: Square image, PNG or JPG format.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group md:col-span-1">
            <label className={labelClass}>College Name *</label>
            <div className="relative">
              <Building2 size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <input
                required
                name="college_name"
                value={formData.college_name}
                onChange={handleChange}
                placeholder="e.g. IIIT Kota"
                className={inputClass}
              />
            </div>
          </div>

            <div className="relative group md:col-span-1">
              <label className={labelClass}>College Website *</label>
              <div className="relative">
                <LinkIcon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
                <input
                  required
                  type="url"
                  name="college_website"
                  value={formData.college_website}
                  onChange={handleChange}
                  placeholder="https://"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="relative group md:col-span-2">
              <label className={labelClass}>Student Email Extension *</label>
              <p className="mb-2 text-[11px] text-gray-500">The email domain provided to students by the college to verify their identities (e.g. iiitkota.ac.in)</p>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-gray-400 font-medium select-none pointer-events-none">@</span>
                <input
                  required
                  name="email_domain"
                  value={formData.email_domain}
                  onChange={handleChange}
                  placeholder="college.ac.in"
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>
          </div>
        </div>

      {/* SECTION 2: Club Info */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
        <h3 className="mb-6 flex items-center gap-2 border-b border-white/10 pb-4 text-lg font-semibold text-white">
          <Briefcase size={20} className="text-red-500" />
          Club Information
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative group md:col-span-2">
            <label className={labelClass}>Responsible Club Name *</label>
            <div className="relative">
              <Briefcase size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <input
                required
                name="club_name"
                value={formData.club_name}
                onChange={handleChange}
                placeholder="e.g. Esports Club IIITK"
                className={inputClass}
              />
            </div>
          </div>

          <div className="relative group md:col-span-1">
            <label className={labelClass}>Official Club Email *</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <input
                required
                type="email"
                name="club_email"
                value={formData.club_email}
                onChange={handleChange}
                placeholder="esports@iiitkota.ac.in"
                className={inputClass}
              />
            </div>
          </div>

          <div className="relative group md:col-span-1">
            <label className={labelClass}>Club Instagram *</label>
            <div className="relative">
              <FaInstagram size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <input
                required
                name="club_instagram"
                value={formData.club_instagram}
                onChange={handleChange}
                placeholder="@handle"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Coordinator Info */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
        <h3 className="mb-6 flex items-center gap-2 border-b border-white/10 pb-4 text-lg font-semibold text-white">
          <User size={20} className="text-red-500" />
          Coordinator Information
        </h3>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative group md:col-span-1">
            <label className={labelClass}>Coordinator Name *</label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <input
                required
                name="coordinator_name"
                value={formData.coordinator_name}
                onChange={handleChange}
                placeholder="Full Name"
                className={inputClass}
              />
            </div>
          </div>

          <div className="relative group md:col-span-1">
            <label className={labelClass}>Position *</label>
            <div className="relative">
              <Briefcase size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <select
                required
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className={inputClass + " appearance-none"}
              >
                <option value="President">President</option>
                <option value="Head">Head</option>
                <option value="Secretary">Secretary</option>
                <option value="Coordinator">Coordinator</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="relative group md:col-span-1">
            <label className={labelClass}>Contact Number *</label>
            <div className="relative">
              <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <input
                required
                type="tel"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                placeholder="+91"
                className={inputClass}
              />
            </div>
          </div>

          <div className="relative group md:col-span-1">
            <label className={labelClass}>WhatsApp Number *</label>
            <div className="relative">
              <MessageCircle size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <input
                required
                type="tel"
                name="whatsapp_number"
                value={formData.whatsapp_number}
                onChange={handleChange}
                placeholder="+91"
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: Additional Details */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
        <h3 className="mb-6 flex items-center gap-2 border-b border-white/10 pb-4 text-lg font-semibold text-white">
          <FileText size={20} className="text-red-500" />
          Additional Details
        </h3>

        <div className="grid gap-6">
          <div className="relative group">
            <label className={labelClass}>Short description about the club *</label>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Tell us a bit about your club..."
              className={`${inputClass} resize-none py-3 pl-4`}
            />
          </div>

          <div className="relative group">
            <label className={labelClass}>Previous esports/event experience *</label>
            <textarea
              required
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows={3}
              placeholder="Any past tournaments organized or participated in?"
              className={`${inputClass} resize-none py-3 pl-4`}
            />
          </div>

          <div className="relative group">
            <label className={labelClass}>Intra Registrations Form Link</label>
            <p className="mb-2 text-[11px] text-gray-500">Provide a link to your college&apos;s internal registration form (e.g. Google Form) so students can register for your intra-college selections.</p>
            <div className="relative">
              <ClipboardList size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-red-500" />
              <input
                type="url"
                name="intra_registration_form"
                value={formData.intra_registration_form}
                onChange={handleChange}
                placeholder="https://forms.google.com/..."
                className={inputClass}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-6 rounded-xl border border-white/10 bg-black/40 p-6 sm:flex-row sm:p-8">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-400">
          <div className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-500 bg-transparent transition-colors has-[:checked]:border-red-500 has-[:checked]:bg-red-600">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
            />
            <CheckCircle2 size={14} className="text-white opacity-0 transition-opacity peer-checked:opacity-100" />
          </div>
          <span>
            I confirm that I am an authorized representative of my college.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading || !confirmed}
          className="relative flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-[#cc0000] px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#aa0000] disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
        >
          {loading ? "SUBMITTING..." : "SUBMIT REQUEST"}
          {!loading && <ArrowRight size={18} className="ml-2" />}
        </button>
      </div>
    </form>
  );
}
