import Link from "next/link";
import { Mail, ChevronRight, Users } from "lucide-react";

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-black/10 bg-white text-slate-900">

      <div className="relative z-20 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        {/* Top Section */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand Column (Spans 4 columns on large screens) */}
          <div className="space-y-4 lg:col-span-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-600">
                Inter IIIT Esports
              </p>
              <h2 className="mt-2 text-2xl font-[family-name:var(--font-display)] tracking-wide text-slate-900 sm:text-4xl">
                Built for the Event.
              </h2>
            </div>
            
            <p className="max-w-sm text-xs leading-6 text-slate-600 font-medium sm:text-sm sm:leading-7">
              The ultimate collegiate esports platform. Register your squad, track live brackets, and fight for campus glory across India&apos;s premier IIITs.
            </p>

            <div className="flex gap-3">
              <a href="https://www.instagram.com/interiiit_esports" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center border border-black/10 bg-slate-50 text-slate-500 transition hover:border-red-600 hover:bg-red-600 hover:text-white sm:h-10 sm:w-10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://discord.gg/iiitiansnetwork" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center border border-black/10 bg-slate-50 text-slate-500 transition hover:border-[#5865F2] hover:bg-[#5865F2] hover:text-white sm:h-10 sm:w-10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="https://www.youtube.com/c/IIITiansNetwork" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center border border-black/10 bg-slate-50 text-slate-500 transition hover:border-[#FF0000] hover:bg-[#FF0000] hover:text-white sm:h-10 sm:w-10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 5.5 3.8 4.2 5.4 4.2h13.2C20.2 4.2 21.5 5.5 21.5 7.1v9.8c0 1.6-1.3 2.9-2.9 2.9H5.4C3.8 19.8 2.5 18.5 2.5 16.9V7.1z"/><path d="M9.7 14.5l5.8-3.4-5.8-3.4v6.8z"/></svg>
              </a>
              <a href="https://x.com/iiitiansnetwork" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center border border-black/10 bg-slate-50 text-slate-500 transition hover:border-[#1DA1F2] hover:bg-[#1DA1F2] hover:text-white sm:h-10 sm:w-10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
              </a>
              <a href="https://www.linkedin.com/company/53184003/" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center border border-black/10 bg-slate-50 text-slate-500 transition hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white sm:h-10 sm:w-10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Links Section (Spans 8 columns on large screens) */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:col-span-8">
            
            {/* Explore */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-slate-900">
                Explore
              </h3>
              <ul className="mt-4 space-y-3 text-xs font-medium text-slate-600 sm:mt-6 sm:space-y-4 sm:text-sm">
                <li>
                  <Link href="/" className="group flex w-full items-center justify-start transition hover:text-red-600">
                    <ChevronRight size={14} className="mr-2 hidden opacity-0 transition-all group-hover:opacity-100 group-hover:text-red-600 sm:block" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/event-details" className="group flex w-full items-center justify-start transition hover:text-red-600">
                    <ChevronRight size={14} className="mr-2 hidden opacity-0 transition-all group-hover:opacity-100 group-hover:text-red-600 sm:block" />
                    Event Details
                  </Link>
                </li>
                <li>
                  <Link href="/participating-colleges" className="group flex w-full items-center justify-start transition hover:text-red-600">
                    <ChevronRight size={14} className="mr-2 hidden opacity-0 transition-all group-hover:opacity-100 group-hover:text-red-600 sm:block" />
                    Colleges
                  </Link>
                </li>
                <li>
                  <Link href="/register-college" className="group flex w-full items-center justify-start transition hover:text-red-600">
                    <ChevronRight size={14} className="mr-2 hidden opacity-0 transition-all group-hover:opacity-100 group-hover:text-red-600 sm:block" />
                    Register College
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="group flex w-full items-center justify-start transition hover:text-red-600">
                    <ChevronRight size={14} className="mr-2 hidden opacity-0 transition-all group-hover:opacity-100 group-hover:text-red-600 sm:block" />
                    Player Registration
                  </Link>
                </li>
                <li>
                  <a href="/docs/IEC_Brochure_Final.pdf" className="group flex w-full items-center justify-start transition hover:text-red-600">
                    <ChevronRight size={14} className="mr-2 hidden opacity-0 transition-all group-hover:opacity-100 group-hover:text-red-600 sm:block" />
                    Brochure
                  </a>
                </li>
                <li>
                  <Link href="/support" className="group flex w-full items-center justify-start transition hover:text-red-600">
                    <ChevronRight size={14} className="mr-2 hidden opacity-0 transition-all group-hover:opacity-100 group-hover:text-red-600 sm:block" />
                    Support & FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Games */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-slate-900">
                Titles
              </h3>
              <ul className="mt-4 space-y-3 text-xs font-medium text-slate-600 sm:mt-6 sm:space-y-4 sm:text-sm">
                <li>
                  <Link href="/games/valo" className="group flex items-center transition hover:text-slate-900">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600 mr-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                    Valorant
                  </Link>
                </li>
                <li>
                  <Link href="/games/bgmi" className="group flex items-center transition hover:text-slate-900">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500 mr-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                    BGMI
                  </Link>
                </li>
                <li>
                  <Link href="/games/ff" className="group flex items-center transition hover:text-slate-900">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 mr-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                    Free Fire
                  </Link>
                </li>
              </ul>
            </div>

            {/* Socials & Community */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-slate-900">
                Community
              </h3>
              <ul className="mt-4 space-y-3 text-xs font-medium text-slate-600 sm:mt-6 sm:space-y-4 sm:text-sm">
                <li>
                  <a href="https://discord.gg/iiitiansnetwork" target="_blank" rel="noopener noreferrer" className="transition hover:text-slate-900">Discord Server</a>
                </li>
                <li>
                  <a href="https://www.instagram.com/interiiit_esports" target="_blank" rel="noopener noreferrer" className="transition hover:text-slate-900">Instagram</a>
                </li>
                <li>
                  <a href="https://www.youtube.com/c/IIITiansNetwork" target="_blank" rel="noopener noreferrer" className="transition hover:text-slate-900">YouTube Stream</a>
                </li>
                <li>
                  <a href="https://x.com/iiitiansnetwork" target="_blank" rel="noopener noreferrer" className="transition hover:text-slate-900">Twitter / X</a>
                </li>
                <li>
                  <Link href="/join-iec" className="group flex items-center gap-1.5 font-semibold text-red-600 transition hover:text-red-700">
                    <Users size={14} />
                    Join IEC Team
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-slate-900">
                Legal
              </h3>
              <ul className="mt-4 space-y-3 text-xs font-medium text-slate-600 sm:mt-6 sm:space-y-4 sm:text-sm">
                <li>
                  <Link href="/rules" className="transition hover:text-slate-900">Tournament Rules</Link>
                </li>
                <li>
                  <Link href="/conduct" className="transition hover:text-slate-900">Code of Conduct</Link>
                </li>
                <li>
                  <Link href="/privacy" className="transition hover:text-slate-900">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/terms" className="transition hover:text-slate-900">Terms of Service</Link>
                </li>
                <li>
                  <Link href="/sitemap-page" className="transition hover:text-slate-900">Sitemap</Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 flex flex-col gap-3 border-t border-black/10 pt-6 text-xs font-medium text-slate-500 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-8 sm:text-sm lg:mt-24">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-900">IEC</span>
            <span>&copy; {new Date().getFullYear()} Inter IIIT Esports. Owned & organized by IIITians Network. All rights reserved.</span>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <p>Built by <a href="https://www.linkedin.com/in/ankurrr27/" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-900 transition-colors">Ankur</a>, <a href="https://www.linkedin.com/in/advik-saksena-08b997323/" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-900 transition-colors">Advik</a>, and <a href="https://www.linkedin.com/in/rahul-tiwari-h0tmedusa/" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-900 transition-colors">Rahul</a>.</p>
            <a href="mailto:iiitiansnetwork@gmail.com" className="flex items-center gap-2 transition hover:text-slate-900">
              <Mail size={13} className="sm:h-auto sm:w-auto" />
              <span>Contact Us</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;





