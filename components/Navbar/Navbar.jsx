"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [hasCheckedNotifs, setHasCheckedNotifs] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/user/me", { headers: { Authorization: `Bearer ${token}` } })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUser(data.user);
          }
        })
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (user && !hasCheckedNotifs) {
      setHasCheckedNotifs(true);
      const token = localStorage.getItem("token");
      
      if (!user.teamId) {
        fetch("/api/team/invitations", { headers: { Authorization: `Bearer ${token}` } })
          .then(res => res.json())
          .then(data => {
            if (data.success && data.invitations?.length > 0) {
              toast.info(`You have ${data.invitations.length} pending team invitation(s)`, {
                duration: 10000,
                action: {
                  label: "View",
                  onClick: () => router.push("/team")
                }
              });
            }
          })
          .catch(() => {});
      } else if (user.teamId) {
        fetch("/api/team/request", { headers: { Authorization: `Bearer ${token}` } })
          .then(res => res.json())
          .then(data => {
            if (data.success && data.requests?.length > 0) {
              toast.info(`You have ${data.requests.length} pending join request(s) for your team`, {
                duration: 10000,
                action: {
                  label: "View",
                  onClick: () => router.push("/team/current")
                }
              });
            }
          }).catch(() => {});
      }
    }
  }, [user, hasCheckedNotifs, router]);

  const teamHref = user?.teamId ? "/team/current" : "/team";

  const links = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/event-details" },
    { name: "IEC Team", href: "/iec-team" },
    { name: "Colleges", href: "/participating-colleges" },
    { name: "Registration", href: "/register" },
    { name: "My Team", href: "/team" },
    { name: "Contact", href: "/support" },
  ];

  const gameLinks = [
    { name: "FF", href: "/games/ff", label: "Free Fire" },
    { name: "VALO", href: "/games/valo", label: "Valorant" },
    { name: "BGMI", href: "/games/bgmi", label: "BGMI" },
  ];

  return (
    <>
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 h-[64px] sm:h-14 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <a
            href="https://iiitiansnetwork.in"


            aria-label="Open IIITians Network website"
            className="flex items-center"
          >
            <Image
              src="/logos/iiitians-network.png"
              alt="IIITians Network"
              width={120}
              height={48}
              className="h-5 w-auto opacity-95 sm:h-9"
              priority
            />
          </a>
          <span className="opacity-50">|</span>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logos/IEC LOGO Black.png"
              alt="IEC"
              width={88}
              height={88}
              className="h-9 w-auto invert opacity-95 sm:h-15"
              priority
            />

            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold tracking-[0.1em] text-white">
                INTER IIIT
              </h1>
              <p className="text-[10px] text-slate-100">Esports Championship</p>
            </div>
          </Link>
        </div>

        <div className="hidden items-center gap-8 lg:flex">
          <div className="flex items-center gap-6">
            {links.map((item) => (
              <Link
                key={item.name}
                href={item.href === "/team" ? teamHref : item.href}
                className="text-[11px] font-semibold  text-slate-300 transition hover:text-white"
              >
                {item.name}
              </Link>
            ))}

            {/* <div
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
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-xs text-slate-200 transition hover:bg-white/5 hover:text-white"
                    >
                      <span>{item.name}</span>
                      <span className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div> */}
          </div>

          {/* <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Search"
              className="grid h-9 w-9 place-items-center text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <Search size={16} />
            </button>
            <Link
              href={teamHref}
              aria-label="Account"
              className="grid h-9 w-9 place-items-center text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <User size={16} />
            </Link>
          </div> */}
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center text-white transition hover:text-white/90 lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />

      <div
        className={`fixed right-0 top-0 z-50 flex h-[100dvh] w-64 flex-col border-l border-slate-200 bg-white p-4 shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-md border border-slate-200 bg-slate-100 text-slate-900 transition hover:bg-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-1">
            {links.map((item) => (
              <Link
                key={item.name}
                href={item.href === "/team" ? teamHref : item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-100 hover:text-slate-950"
              >
                {item.name}
              </Link>
            ))}

            {/* <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-2">
              <p className="mb-1 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                Games
              </p>
              {gameLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-md px-2 py-2 text-xs text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  <span>{item.name}</span>
                  <span className="text-[9px] uppercase tracking-[0.22em] text-slate-400">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div> */}
          </div>
        </div>

        <Link
          href="/register"
          onClick={() => setOpen(false)}
          className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-red-600 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.1em] text-white shadow-[0_0_15px_rgba(220,38,38,0.2)] transition hover:bg-red-500"
        >
          Register
        </Link>
      </div>
    </nav>
    {/* Placeholder to prevent layout shift from fixed navbar */}
    <div className="h-[64px] sm:h-14 w-full shrink-0" />
    </>
  );
}

