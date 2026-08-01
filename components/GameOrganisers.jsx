import Image from "next/image";
import { Mail } from "lucide-react";
import TeamCard from "./TeamCard";

const themes = {
  amber: {
    label: "text-amber-600",
    panel: "from-amber-500/16 via-zinc-950 to-black",
    ring: "ring-amber-400/35",
    chip: "bg-amber-300 text-black",
    soft: "bg-amber-100 text-amber-800 ring-1 ring-amber-200",
    line: "bg-amber-400",
    glow: "shadow-[0_0_70px_rgba(251,191,36,0.16)]",
  },
  red: {
    label: "text-red-600",
    panel: "from-red-600/18 via-zinc-950 to-black",
    ring: "ring-red-500/35",
    chip: "bg-red-500 text-white",
    soft: "bg-red-50 text-red-700 ring-1 ring-red-100",
    line: "bg-red-500",
    glow: "shadow-[0_0_70px_rgba(239,68,68,0.16)]",
  },
  blue: {
    label: "text-sky-600",
    panel: "from-sky-500/18 via-zinc-950 to-black",
    ring: "ring-sky-400/35",
    chip: "bg-sky-400 text-black",
    soft: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
    line: "bg-sky-400",
    glow: "shadow-[0_0_70px_rgba(56,189,248,0.16)]",
  },
};

export default function GameOrganizers({ organizers = [], teamMembers = [], theme = "red" }) {
  const colors = themes[theme] || themes.red;

  return (
    <section className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden bg-slate-50 py-12 text-slate-950 sm:py-16">
      <div className={`absolute inset-x-0 top-0 h-px ${colors.line} opacity-50`} />
      <div className="absolute left-1/2 top-0 h-72 w-[70vw] -translate-x-1/2 bg-white blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {/* <p className={`text-[10px] font-semibold uppercase tracking-[0.45em] ${colors.label}`}>
              Partner Network
            </p> */}
            <h2 className="mt-2 text-3xl font-[family-name:var(--font-display)] leading-none tracking-wide text-slate-950 sm:text-5xl uppercase">
              Game <span className={colors.label}>Organizers.</span>
            </h2>
          </div>
          {/* <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400">
            Event operations crew
          </span> */}
        </div>

        {/* Club Conducting Info Row */}
        {organizers.length > 0 && (
          <div className="mb-12">
            {organizers.map((org, index) => {
              const clubLogo = org.clubLogo || org.logo || "/logos/iiitians-network.png";
              const instagramUrl = org.social?.instagram || org.instagram;
              const discordUrl = org.social?.discord || org.discord;
              const email = org.email || org.contactEmail;
              
              return (
                <article
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_60px_rgba(15,23,42,0.08)] transition duration-300 hover:border-slate-300 sm:p-6 lg:p-10"
                >
                  <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(15,23,42,0.06),transparent_42%)] opacity-70" />
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-100">
                    {/* <div className={`h-full w-2/5 ${colors.line}`} /> */}
                  </div>

                  <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                      <div className="relative h-16 w-16 shrink-0 rounded-xl bg-white p-2 ring-1 ring-slate-200 sm:h-20 sm:w-20 sm:p-2.5">
                        <Image
                          src={clubLogo}
                          alt={`${org.club || "Club"} logo`}
                          fill
                          sizes="96px"
                          className="object-contain p-1.5 sm:p-2"
                        />
                      </div>
                      <div>
                        <h3 className="max-w-[16rem] text-2xl font-black tracking-tight text-slate-950 sm:max-w-none sm:text-4xl">
                          {org.club}
                        </h3>
                        <p className={`mt-2 inline-flex w-fit px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] ${colors.soft}`}>
                          {org.college}
                        </p>
                      </div>
                    </div>

                    {org.description && (
                      <div className="max-w-none lg:max-w-xl lg:text-right">
                        <p className="text-sm leading-relaxed text-slate-600 sm:text-base lg:ml-auto">
                          {org.description}
                        </p>
                        {(instagramUrl || discordUrl || email) && (
                          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-end">
                            {email && (
                              <a
                                href={`mailto:${email}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={email}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                              >
                                <Mail size={16} />
                              </a>
                            )}
                            {instagramUrl && (
                              <a
                                href={instagramUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Instagram"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                              >
                                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                              </a>
                            )}
                            {discordUrl && (
                              <a
                                href={discordUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Discord"
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                              >
                                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.101 18.08.114 18.102.136 18.116a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                </svg>
                              </a>
                            )}
                          </div>
                        )}
                        <div className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-50 px-4 py-2 ring-1 ring-slate-200 sm:w-auto lg:ml-auto">
                          <span className={`h-2 w-2 rounded-full ${colors.line} animate-pulse`} />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700">
                            Official {org.game || "Game"} Partner
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Team Members Grid */}
        {teamMembers && teamMembers.length > 0 && (
          <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2 bg-slate-50 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                  The Squad
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Meet the individuals managing the operations for this game.
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-6">
                {teamMembers.map((member) => (
                  <TeamCard key={member._id || member.name} member={member} />
                ))}
              </div>
            </div>
          </div>
        )}
        
      </div>
    </section>
  );
}


