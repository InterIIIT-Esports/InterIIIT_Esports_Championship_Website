import Image from "next/image";
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


