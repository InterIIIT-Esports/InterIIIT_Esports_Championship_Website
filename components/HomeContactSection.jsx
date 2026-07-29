"use client";

import { useState } from "react";
import { Send, Mail, Globe, MessageSquareMore } from "lucide-react";
import { toast } from "sonner";

const contacts = [
  {
    icon: MessageSquareMore,
    title: "Discord Community",
    value: "Join our Discord",
    href: "https://discord.gg/iiitiansnetwork",
    accent: "text-indigo-500 bg-indigo-50 border-indigo-100",
    borderHover: "hover:border-indigo-300"
  },
  {
    icon: Mail,
    title: "Email Support",
    value: "iiitiansnetwork@gmail.com",
    href: "mailto:iiitiansnetwork@gmail.com",
    accent: "text-red-500 bg-red-50 border-red-100",
    borderHover: "hover:border-red-300"
  },
  {
    icon: Globe,
    title: "Instagram",
    value: "@interiiit_esports",
    href: "https://www.instagram.com/interiiit_esports",
    accent: "text-pink-500 bg-pink-50 border-pink-100",
    borderHover: "hover:border-pink-300"
  },
];

export default function HomeContactSection() {
  const [form, setForm] = useState({ name: "", email: "", category: "Registration", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email, and message.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Message sent! We'll get back to you soon.");
        setForm({ name: "", email: "", category: "Registration", subject: "", message: "" });
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch {
      toast.error("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-5 sm:py-12 lg:py-16 bg-white text-slate-900">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="mb-10 flex items-start flex-col gap-1">
          
          <h2 className="text-3xl md:text-6xl font-[family-name:var(--font-display)] tracking-wide text-black leading-none uppercase">
            Contact <span className="text-red-600">Support.</span>
          </h2>
          <p className="mt-2 text-[11px] sm:text-sm text-slate-600">
            Send us a message or reach out through our community channels.
          </p>
        </div>

        {/* ── Content Grid ── */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Form (2 columns) */}
          <div className="lg:col-span-2 rounded-xl border border-slate-100 bg-slate-50/50 p-2 sm:p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ankur Singh"
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="abcd1234@iiitkota.ac.in"
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  >
                    <option>Registration</option>
                    <option>Tournament Issues</option>
                    <option>Account Support</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Briefly describe your issue"
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your issue..."
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-red-400 focus:ring-2 focus:ring-red-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full md:w-auto items-center justify-center gap-2 rounded-md bg-[#e3000f] px-6 py-2.5 text-sm font-bold text-white uppercase tracking-wider transition-all hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={16} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                {loading ? "Sending..." : "Submit Request"}
              </button>
            </form>
          </div>

          {/* Sidebar Cards (1 column) */}
          <div className="space-y-3">
            {contacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <a
                  key={contact.title}
                  href={contact.href}
                  target="_blank" rel="noopener noreferrer"
                  className={`group flex items-center gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:shadow-sm ${contact.borderHover}`}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded border transition-all ${contact.accent}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{contact.title}</h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">{contact.value}</p>
                  </div>
                </a>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
