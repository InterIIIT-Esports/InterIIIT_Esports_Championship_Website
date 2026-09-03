import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Flag,
  RadioTower,
  ShieldCheck,
  Swords,
  Trophy,
  Users,
} from "lucide-react";

const featureCards = [
 {
  icon: Swords,
  title: "Intra-IIIT Qualifiers",
  copy: "Registered gaming clubs at each IIIT conduct their own qualifiers to determine the institute's best teams.",
},
{
  icon: RadioTower,
  title: "Inter-IIIT League Stage",
  copy: "Qualified teams from participating IIITs compete against one another in a structured league to earn a place in the finals.",
},
{
  icon: ShieldCheck,
  title: "Grand Finals",
  copy: "The top-performing teams from the league stage battle for the Inter-IIIT Esports Championship title.",
},
];

const stages = [
  {
    label: "Register",
    value: "01",
    detail: "Create your team and lock the game title.",
  },
  {
    label: "Verify",
    value: "02",
    detail: "Admins confirm rosters and college eligibility.",
  },
  {
    label: "Qualify",
    value: "03",
    detail: "Fight through opening brackets and lobbies.",
  },
  {
    label: "Finals",
    value: "04",
    detail: "Top squads play for trophies and prize money.",
  },
];

const matchStats = [
  { icon: Users, label: "Teams", value: "1200+" },
  { icon: Trophy, label: "Prize pool", value: "TBD" },
  { icon: CalendarDays, label: "Colleges", value: "21" },
  { icon: Flag, label: "Game titles", value: "3" },
];

export default function HomeFeatureSections() {
  return (
    <section className="relative  bg-white text-black overflow-hidden">
      {/* ── Grunge Background Layers ── */}

      {/* Diagonal splatter wash — inspired by the yellow-black grunge texture */}

      {/* Diagonal accent stripes — subtle repeating lines (changed to black for white bg) */}

      {/* Halftone dots — bottom right corner (changed to black for white bg) */}

      {/* Halftone dots — top left corner (changed to black for white bg) */}

      {/* Noise grain texture overlay (increased opacity slightly for white bg) */}

      {/* Corner accent — geometric red glow top-right */}

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl  pb-18 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
          {/* Left — Image panel (Dark background, so text remains white) */}
          <div className="relative min-h-[50vh] sm:min-h-[460px] overflow-hidden rounded-none sm:rounded-lg bg-black shadow-lg order-first">
            <Image
              src="/pan.jpg"
              alt="IEC tournament games lineup"
              fill
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-cover "
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 px-2">
              <div className="mt-4 grid grid-cols-4 gap-0.5 sm:gap-2 px-1">
                {matchStats.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-sm border-white/10 p-1.5 sm:p-2.5"
                    >
                      <p className="mt-1 sm:mt-2 text-sm sm:text-lg font-black text-white">
                        {item.value}
                      </p>
                      <p className="mt-0.5 sm:mt-1 text-[8px] sm:text-[10px] uppercase text-white/45">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right — Content panel (Adapted for white bg) */}
          <div className="grid content-between gap-3 px-4">
            <div>
              <p className="text-[0.5rem] opacity-0 sm:opacity-100 sm:text-xs font-medium uppercase tracking-[0.28em] text-slate-500">
                Built for competition
              </p>

              {/* Heading with accent underline */}
              <div className="relative mt-2 inline-block">
                <h2 className="text-3xl font-[family-name:var(--font-display)] leading-none tracking-wide text-slate-900 sm:text-5xl">
                  Event Architecture
                </h2>
                {/* <div className="mt-2 h-[2px] w-16 bg-red-600" /> */}
              </div>

              <p className="mt-3 max-w-2xl text-xs text-slate-600 sm:text-base">
                IEC follows a{" "}
                <strong>three-stage championship structure</strong>. The journey
                begins with <strong>Intra-IIIT Qualifiers</strong>, conducted by
                registered gaming clubs of participating IIITs, where teams
                compete to represent their institute. Qualified teams then
                advance to the
                <strong> Inter-IIIT League Stage</strong>, facing the best teams
                from IIITs across the country. The competition culminates in the
                <strong> Grand Finals</strong>, where the top-performing teams
                battle for the title of{" "}
                <strong>Inter-IIIT Esports Champion</strong>.
              </p>
            </div>

            {/* Feature cards */}
            <div className="grid gap-2 md:grid-cols-3">
              {featureCards.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="group sm:rounded-lg sm:border border-black/10 bg-black/[0.02] p-1 sm:p-3.5 transition-all duration-300 hover:border-red-500/30 hover:bg-black/[0.04]"
                  >
                    <h3 className="mt-3 text-sm font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm leading-6 text-slate-600">
                      {item.copy}
                    </p>
                  </article>
                );
              })}
            </div>

            {/* Stages */}
            <div className="sm:rounded-lg sm:border border-black/10 bg-black/[0.02] sm:p-3.5 sm:p-4">
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-4">
                {stages.map((stage) => (
                  <div
                    key={stage.label}
                    className="border-l border-black/10 pl-3"
                  >
                    <p className="text-md sm:text-xl font-black text-red-400">
                      {stage.value}
                    </p>
                    <h3 className="mt-1 sm:mt-1.5 text-xs sm:text-sm font-semibold text-slate-900">
                      {stage.label}
                    </h3>
                    
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            {/* <div className="hidden flex-row flex-nowrap gap-2 sm:flex">
              <Link
                href="/register"
                className="flex-1 sm:flex-none text-center rounded-lg bg-red-600 px-4 py-2.5 sm:px-5 text-[13px] sm:text-sm font-semibold  sm:tracking-[0.12em] text-white transition hover:bg-red-500"
              >
                Register
              </Link>
              <Link
                href="/event-details"
                className="flex-1 sm:flex-none text-center rounded-lg border border-black/15 bg-black/5 px-4 py-2.5 sm:px-5 text-[13px] sm:text-sm font-semibold sm:tracking-[0.12em] text-slate-900 transition hover:bg-black/10"
              >
                Events
              </Link>
            </div> */}
          </div>
        </div>
      </div>

      {/* ── Bottom Diagonal Edge ── */}
      {/* Since the background is white, and the next section is dark, this black clip creates the transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[50px] bg-black pointer-events-none z-20"
        style={{
          clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
        }}
      />
    </section>
  );
}
