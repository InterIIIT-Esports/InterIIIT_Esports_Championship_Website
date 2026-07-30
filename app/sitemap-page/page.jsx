import Link from "next/link";
import { 
  Home, Calendar, Users, School, Gamepad2, Trophy, 
  UserPlus, HeadphonesIcon, FileText, Shield, Lock, 
  Map, ChevronRight 
} from "lucide-react";

export const metadata = {
  title: "Sitemap | Inter IIIT Esports Championship",
  description: "Browse all pages of the Inter IIIT Esports Championship website â€” games, registration, teams, leaderboards, and more.",
};

const sitemapSections = [
  {
    title: "Main",
    links: [
      { name: "Home", href: "/", icon: Home, desc: "Landing page with event overview" },
      { name: "Event Details", href: "/event-details", icon: Calendar, desc: "Schedule, format & prize pool" },
      { name: "Support & FAQ", href: "/support", icon: HeadphonesIcon, desc: "Help center & frequently asked questions" },
    ],
  },
  {
    title: "Games",
    links: [
      { name: "Valorant", href: "/games/valo", icon: Gamepad2, desc: "Valorant tournament bracket & leaderboard" },
      { name: "BGMI", href: "/games/bgmi", icon: Gamepad2, desc: "BGMI tournament bracket & leaderboard" },
      { name: "Free Fire", href: "/games/ff", icon: Gamepad2, desc: "Free Fire tournament bracket & leaderboard" },
    ],
  },
  {
    title: "Registration",
    links: [
      { name: "Player Registration", href: "/register", icon: UserPlus, desc: "Sign up as a player" },
      { name: "Register College", href: "/register-college", icon: School, desc: "Register your college for the event" },
      { name: "Join IEC Team", href: "/join-iec", icon: Users, desc: "Apply to join the organizing committee" },
    ],
  },
  {
    title: "Teams & Colleges",
    links: [
      { name: "My Team", href: "/team", icon: Users, desc: "View & manage your team" },
      { name: "Participating Colleges", href: "/participating-colleges", icon: School, desc: "List of all registered colleges" },
      { name: "Participating Teams", href: "/participating-teams", icon: Trophy, desc: "All registered esports teams" },
      { name: "IEC Team", href: "/iec-team", icon: Users, desc: "Meet the organizing crew" },
    ],
  },
  {
    title: "Standings",
    links: [
      { name: "Leaderboard", href: "/leaderboard", icon: Trophy, desc: "Overall tournament standings" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Tournament Rules", href: "/rules", icon: FileText, desc: "Official tournament rulebook" },
      { name: "Code of Conduct", href: "/conduct", icon: Shield, desc: "Player & community guidelines" },
      { name: "Privacy Policy", href: "/privacy", icon: Lock, desc: "How we handle your data" },
      { name: "Terms of Service", href: "/terms", icon: FileText, desc: "Terms & conditions" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-black py-16 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-red-400 mb-6">
            <Map size={14} />
            Navigation
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl leading-none tracking-wide text-white sm:text-6xl uppercase">
            SITE<span className="text-red-600">MAP.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-400">
            A complete directory of every page on the Inter IIIT Esports Championship website.
          </p>
        </div>
      </section>

      {/* Sitemap Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {sitemapSections.map((section) => (
            <div key={section.title} className="group">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-red-600">
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group/link flex items-start gap-3 rounded-lg border border-transparent px-3 py-3 transition-all hover:border-slate-200 hover:bg-slate-50"
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500 transition-colors group-hover/link:bg-red-600 group-hover/link:text-white">
                        <Icon size={15} />
                      </span>
                      <div className="min-w-0">
                        <p className="flex items-center gap-1 text-sm font-semibold text-slate-900 transition-colors group-hover/link:text-red-600">
                          {link.name}
                          <ChevronRight size={12} className="opacity-0 transition-opacity group-hover/link:opacity-100" />
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">
                          {link.desc}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}



