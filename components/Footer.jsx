import Link from "next/link";

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-red-400">
              Inter IIIT Esports
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Compact. Competitive. Built for the event.
            </h2>
            <p className="max-w-md text-sm leading-7 text-slate-400">
              A focused esports platform for registrations, event details, and team coordination across IIITs.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-200">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/event-details" className="transition hover:text-white">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/register" className="transition hover:text-white">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/support" className="transition hover:text-white">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-200">
              Games
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>Free Fire</li>
              <li>BGMI</li>
              <li>Valorant</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 Inter IIIT. All rights reserved.</p>
          <p>Built by Ankur, Advik, and Rahul.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
