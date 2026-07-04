import React from "react";

const themes = {
  amber: {
    label: "text-amber-300",
    line: "border-amber-400/50",
    chip: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    card: "hover:border-amber-400/40 hover:bg-amber-400/[0.05]",
    name: "group-hover:text-amber-200",
  },
  red: {
    label: "text-red-300",
    line: "border-red-500/50",
    chip: "border-red-500/30 bg-red-500/10 text-red-200",
    card: "hover:border-red-500/40 hover:bg-red-500/[0.05]",
    name: "group-hover:text-red-200",
  },
  blue: {
    label: "text-sky-300",
    line: "border-sky-400/50",
    chip: "border-sky-400/30 bg-sky-400/10 text-sky-200",
    card: "hover:border-sky-400/40 hover:bg-sky-400/[0.05]",
    name: "group-hover:text-sky-200",
  },
};

export default function GameOrganizers({ organizers = [], theme = "red" }) {
  const colors = themes[theme] || themes.red;

  return (
    <section className="bg-black py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`mb-8 flex items-end justify-between gap-4 border-b pb-4 ${colors.line}`}>
          <div>
            <p className={`text-[10px] font-semibold uppercase tracking-[0.45em] ${colors.label}`}>
              Partner Network
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Game Organizers
            </h2>
          </div>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-white/30 sm:block">
            Event operations crew
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {organizers.map((org, index) => {
            const clubLogo = org.clubLogo || org.logo || "/logos/iiitians-network.png";
            const networkLogo = org.networkLogo || "/logos/iiitians-network.png";

            return (
              <article
                key={index}
                className={`group flex min-h-[320px] flex-col justify-between border border-white/10 bg-white/[0.03] p-4 transition duration-300 ${colors.card}`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center border border-white/10 bg-white p-2">
                        <img
                          src={networkLogo}
                          alt="Network logo"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
                        x
                      </div>
                      <div className="flex h-14 w-14 items-center justify-center border border-white/10 bg-white p-2">
                        <img
                          src={clubLogo}
                          alt="Club logo"
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>

                    <span className={`border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] ${colors.chip}`}>
                      {org.game || "Partner"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 shrink-0 overflow-hidden border border-white/10 bg-zinc-950">
                      <img
                        src={org.personImage}
                        alt={org.leader}
                        className="h-full w-full object-cover object-top grayscale transition duration-300 group-hover:grayscale-0"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className={`text-lg font-semibold tracking-tight text-white transition ${colors.name}`}>
                        {org.leader}
                      </h3>
                      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                        {org.role}
                      </p>
                      {org.description ? (
                        <p className="mt-3 max-w-md text-sm leading-6 text-white/60">
                          {org.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.22em] text-white/40">
                  <span>{org.club}</span>
                  <span>{org.college}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
