import Image from "next/image";
import { Building2, User, Mail, ShieldCheck, ClipboardList, ExternalLink } from "lucide-react";

export default function CollegeCard({ college }) {
  return (
    <>
      {/* ── Mobile: Compact list row ── */}
      <div className="sm:hidden flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-100">
        {/* Logo */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-100 bg-white p-1">
          {college.college_logo ? (
            <Image
              src={college.college_logo}
              alt={`${college.college_name} logo`}
              width={44}
              height={44}
              className="h-full w-full object-contain"
            />
          ) : (
            <Building2 size={18} className="text-slate-300" />
          )}
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col min-w-0">
          <h3 className="truncate font-[family-name:var(--font-display)] text-sm leading-tight tracking-wide text-slate-900" title={college.college_name}>
            {college.college_name}
          </h3>
          <p className="truncate text-[9px] font-semibold uppercase tracking-widest text-red-500 mt-0.5">
            {college.club_name}
          </p>
          <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500">
            <span className="flex items-center gap-1 truncate">
              <User size={10} className="shrink-0 text-slate-400" />
              <span className="truncate">{college.coordinator_name}</span>
            </span>
            <span className="flex items-center gap-1 truncate">
              <Mail size={10} className="shrink-0 text-slate-400" />
              <span className="truncate">{college.club_email}</span>
            </span>
          </div>
        </div>

        {/* Intra reg link */}
        <div className="shrink-0">
          {college.intra_registration_form ? (
            <a
              href={college.intra_registration_form}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-colors hover:bg-red-100"
              title="Intra Registrations"
            >
              <ExternalLink size={14} />
            </a>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-300" title="Intra Registrations — Coming Soon">
              <ClipboardList size={14} />
            </div>
          )}
        </div>
      </div>

      {/* ── Desktop: Full card ── */}
      <div className="group relative hidden h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg shadow-slate-200/50 ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/10 hover:ring-red-100 sm:flex">
        
        {/* Top subtle gradient line */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 to-orange-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div className="flex flex-1 flex-col p-8">
          
          {/* Header: Logo + Names */}
          <div className="mb-8 flex flex-col items-center text-center gap-5">
            <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-100 bg-white p-2 shadow-sm transition-transform duration-300 group-hover:scale-105">
              {college.college_logo ? (
                <Image
                  src={college.college_logo}
                  alt={`${college.college_name} logo`}
                  width={112}
                  height={112}
                  className="h-full w-full object-contain"
                />
              ) : (
                <Building2 size={32} className="text-slate-300" />
              )}
            </div>
            <div className="w-full">
              <h3 className="truncate font-[family-name:var(--font-display)] text-2xl lg:text-3xl leading-tight tracking-wide text-slate-900 transition-colors group-hover:text-red-600" title={college.college_name}>
                {college.college_name}
              </h3>
              <p className="mt-2 flex items-center gap-1.5 truncate text-[11px] font-semibold uppercase tracking-widest text-red-500 justify-center" title={college.club_name}>
                <ShieldCheck size={14} className="shrink-0" />
                <span className="truncate">{college.club_name}</span>
              </p>
            </div>
          </div>

          {/* Footer: Details Box */}
          <div className="mt-auto space-y-3.5 rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-colors duration-300 group-hover:border-red-100 group-hover:bg-red-50/30">
            
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-white shadow-sm transition-colors group-hover:border-red-100 group-hover:text-red-500 text-slate-400">
                <User size={14} />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {college.designation}
                </span>
                <span className="truncate text-xs font-medium text-slate-700">
                  {college.coordinator_name}
                </span>
              </div>
            </div>
            
            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent transition-colors group-hover:via-red-100" />
            
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-white shadow-sm transition-colors group-hover:border-red-100 group-hover:text-red-500 text-slate-400">
                <Mail size={14} />
              </div>
              <span className="truncate text-xs font-medium text-slate-600" title={college.club_email}>
                {college.club_email}
              </span>
            </div>
            
            {college.intra_registration_form ? (
              <>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent transition-colors group-hover:via-red-100" />
                
                <a
                  href={college.intra_registration_form}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg px-1 py-1 transition-colors hover:bg-red-50"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-white shadow-sm transition-colors group-hover:border-red-100 group-hover:text-red-500 text-slate-400">
                    <ClipboardList size={14} />
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-red-600 transition-colors hover:text-red-700">
                    Intra Registrations
                    <ExternalLink size={12} />
                  </span>
                </a>
              </>
            ) : (
              <>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent transition-colors group-hover:via-red-100" />
                
                <div className="flex items-center gap-3 px-1 py-1">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-100 bg-white shadow-sm text-slate-300">
                    <ClipboardList size={14} />
                  </div>
                  <span className="text-xs font-medium italic text-slate-400">
                    Intra Registrations — Coming Soon
                  </span>
                </div>
              </>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
}
