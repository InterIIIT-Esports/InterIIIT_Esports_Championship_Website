"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

export default function ContactForm() {
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
    <section id="contact" className="px-6 py-24 relative z-10 bg-slate-50">
      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] tracking-wide text-slate-900">
            Contact Support
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 font-medium">
            Still need help? Send us a message and we&apos;ll get back to you as
            soon as possible.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-none border border-black/10 bg-white p-8 md:p-12 shadow-sm relative overflow-hidden">
          
          <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>

            {/* Name + Email */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 uppercase tracking-widest">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-none border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:border-red-500 focus:bg-white focus:ring-1 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 uppercase tracking-widest">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full rounded-none border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:border-red-500 focus:bg-white focus:ring-1 focus:ring-red-500"
                />
              </div>

            </div>

            {/* Category + Subject */}
            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 uppercase tracking-widest">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-none border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition-all duration-300 focus:border-red-500 focus:bg-white focus:ring-1 focus:ring-red-500"
                >
                  <option>Registration</option>
                  <option>Team Management</option>
                  <option>Payments</option>
                  <option>Tournament Issues</option>
                  <option>Account Support</option>
                  <option>Website Bug</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700 uppercase tracking-widest">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Briefly describe your issue"
                  className="w-full rounded-none border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:border-red-500 focus:bg-white focus:ring-1 focus:ring-red-500"
                />
              </div>

            </div>

            {/* Message */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700 uppercase tracking-widest">
                Message
              </label>

              <textarea
                rows={6}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your issue..."
                className="w-full resize-none rounded-none border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder-slate-400 outline-none transition-all duration-300 focus:border-red-500 focus:bg-white focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full md:w-auto items-center justify-center gap-2 rounded-none bg-slate-900 px-10 py-4 font-semibold text-white uppercase tracking-widest transition-all duration-300 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send size={18} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              {loading ? "Sending..." : "Submit Request"}
            </button>

          </form>

        </div>
      </div>
    </section>
  );
}