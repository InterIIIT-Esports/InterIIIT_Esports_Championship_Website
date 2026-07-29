import Image from "next/image";
import TeamCard from "./TeamCard";

const themes = {
  amber: {
    label: "text-amber-300",
    panel: "from-amber-500/16 via-zinc-950 to-black",
    ring: "ring-amber-400/35",
    chip: "bg-amber-300 text-black",
    soft: "bg-amber-400/10 text-amber-100",
    line: "bg-amber-400",
    glow: "shadow-[0_0_70px_rgba(251,191,36,0.16)]",
  },
  red: {
    label: "text-red-300",
    panel: "from-red-600/18 via-zinc-950 to-black",
    ring: "ring-red-500/35",
    chip: "bg-red-500 text-white",
    soft: "bg-red-500/10 text-red-100",
    line: "bg-red-500",
    glow: "shadow-[0_0_70px_rgba(239,68,68,0.16)]",
  },
  blue: {
    label: "text-sky-300",
    panel: "from-sky-500/18 via-zinc-950 to-black",
    ring: "ring-sky-400/35",
    chip: "bg-sky-400 text-black",
    soft: "bg-sky-400/10 text-sky-100",
    line: "bg-sky-400",
    glow: "shadow-[0_0_70px_rgba(56,189,248,0.16)]",
  },
};

export default function GameOrganizers({ organizers = [], teamMembers = [], theme = "red" }) {
  const colors = themes[theme] || themes.red;

  return (
    <section className="relative overflow-hidden bg-black py-12 text-white sm:py-16">
      <div className={`absolute inset-x-0 top-0 h-px ${colors.line} opacity-50`} />
      <div className="absolute left-1/2 top-0 h-72 w-[70vw] -translate-x-1/2 bg-white/[0.035] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={`text-[10px] font-semibold uppercase tracking-[0.45em] ${colors.label}`}>
              Partner Network
            </p>
            <h2 className="mt-2 text-3xl font-[family-name:var(--font-display)] leading-none tracking-wide sm:text-5xl uppercase">
              Game <span className={colors.label}>Organizers.</span>
            </h2>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/35">
            Event operations crew
          </span>
        </div>

        {/* Club Conducting Info Row */}
        {organizers.length > 0 && (
          <div className="mb-12">
            {organizers.map((org, index) => {
              const clubLogo = org.clubLogo || org.logo || "/logos/iiitians-network.png";
              
              return (
                <article
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.panel} p-6 ring-1 ring-white/10 transition duration-300 hover:ring-white/20 sm:p-8 lg:p-10 ${colors.glow}`}
                >
                  <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_38%)] opacity-70" />
                  <div className="absolute bottom-0 left-0 h-1 w-full bg-white/10">
                    <div className={`h-full w-2/5 ${colors.line}`} />
                  </div>

                  <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    
                    <div className="flex items-center gap-6">
                      <div className="relative h-20 w-20 shrink-0 rounded-xl bg-white p-2 ring-1 ring-white/20 sm:h-24 sm:w-24">
                        <Image
                          src={clubLogo}
                          alt={`${org.club || "Club"} logo`}
                          fill
                          sizes="96px"
                          className="object-contain p-2"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
                          {org.club}
                        </h3>
                        <p className={`mt-2 inline-flex w-fit px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] ${colors.soft}`}>
                          {org.college}
                        </p>
                      </div>
                    </div>

                    {org.description && (
                      <div className="max-w-xl lg:text-right">
                        <p className="text-sm leading-relaxed text-white/70 sm:text-base">
                          {org.description}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 ring-1 ring-white/10">
                          <span className={`h-2 w-2 rounded-full ${colors.line} animate-pulse`} />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
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
          <div className="-mx-4 sm:-mx-6 lg:-mx-8 mt-10 bg-slate-50 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
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
