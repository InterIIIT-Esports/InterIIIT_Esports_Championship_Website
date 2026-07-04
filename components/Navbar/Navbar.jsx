"use client";

import Link from "next/link";
import { Menu, Search, User, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/event-details" },
    { name: "Registration", href: "/register" },
  
    { name: "Contact", href: "/support" },
  ];

  const gameLinks = [
    { name: "FF", href: "/games/ff", label: "Free Fire" },
    { name: "VALO", href: "/games/valo", label: "Valorant" },
    { name: "BGMI", href: "/games/bgmi", label: "BGMI" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logos/iiitians-network.png"
            alt="IIITians Network"
            className="h-9 w-auto opacity-95"
          />
            <h1 className="opacity-50">|</h1>
          <img
            src="/logos/IEC LOGO Black.png"
            alt="IEC"
            className="h-15 w-auto invert opacity-95"
          />

          <div className="hidden sm:block">
            <h1 className="text-sm font-semibold tracking-[0.1em] text-white">
              INTER IIIT
            </h1>
            <p className="text-[10px] uppercase text-slate-100">
              Esports Championship
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <div className="flex items-center gap-6">
            {links.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-[11px] font-semibold tracking-[0.22em] text-slate-300 transition hover:text-white"
              >
                {item.name}
              </Link>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setGamesOpen(true)}
              onMouseLeave={() => setGamesOpen(false)}
            >
              <button
                type="button"
                className="text-[11px] font-semibold tracking-[0.22em] text-slate-300 transition hover:text-white"
              >
                Games
              </button>

              <div
                className={`absolute left-1/2 top-full mt-4 w-56 -translate-x-1/2 overflow-hidden border border-white/10 bg-slate-950/95 shadow-[0_18px_60px_rgba(0,0,0,0.45)] transition-all duration-200 ${
                  gamesOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                }`}
              >
                <div className="p-2">
                  {gameLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-sm text-slate-200 transition hover:bg-white/5 hover:text-white"
                    >
                      <span>{item.name}</span>
                      <span className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Search"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <Search size={16} />
            </button>
            <button
              type="button"
              aria-label="Account"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
            >
              <User size={16} />
            </button>
            <Link
              href="/register"
              className=" px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-red-200 transition  hover:text-white"
            >
              Register
            </Link>
          </div>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/20 hover:bg-white/10 lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 bg-slate-950/95 transition-all duration-300 lg:hidden ${
          open ? "max-h-[28rem]" : "max-h-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <div className="grid gap-1">
            {links.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium  text-slate-200 transition hover:bg-white/5 hover:text-white"
              >
                {item.name}
              </Link>
            ))}

            <div className="mt-2 rounded-xl border border-white/10 bg-white/[0.03] p-2">
              <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                Games
              </p>
              {gameLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-sm text-slate-200 transition hover:bg-white/5 hover:text-white"
                >
                  <span>{item.name}</span>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/register"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-red-400"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
