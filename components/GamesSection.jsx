"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const games = [
  {
    title: "BGMI",
    logo: "/logos/logoBGMI.png",
    subtitle: "BattleGrounds Mobile India",
    image: "/bgmi/ourGamesBGMI.png",
    link: "/games/bgmi",
    border: "border-orange-500/80",
    glow: "hover:shadow-[0_0_40px_rgba(249,115,22,0.18)]",
    button: "border-orange-300 hover:bg-orange-300/10",
  },
  {
    title: "VALORANT",
    logo: "/logos/logoValo.png",
    subtitle: "5v5 Tactical Shooter",
    image: "/valo/ourGamesValo.png",
    link: "/games/valo",
    border: "border-red-500/80",
    glow: "hover:shadow-[0_0_40px_rgba(239,68,68,0.18)]",
    button: "border-red-500 hover:bg-red-500/10",
  },
  {
    title: "FREE FIRE",
    logo: "/logos/logoFF.png",
    subtitle: "Battle Royale",
    image: "/ff/ourGamesFF.png",
    link: "/games/ff",
    border: "border-yellow-500/80",
    glow: "hover:shadow-[0_0_40px_rgba(250,204,21,0.18)]",
    button: "border-blue-500 hover:bg-blue-500/10",
  },
];

export default function GamesSection() {
  return (
    <section className="relative bg-black py-16 overflow-hidden">
      {/* ── Grunge accents ── */}

      {/* Diagonal stripe accent behind heading */}
      <div
        className="absolute top-0 left-0 w-full h-[250px] pointer-events-none"
        style={{
          background: `
            linear-gradient(135deg, rgba(220,38,38,0.06) 0%, transparent 40%),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 50px,
              rgba(255,255,255,0.01) 50px,
              rgba(255,255,255,0.01) 52px
            )
          `,
        }}
      />

      {/* Halftone dots — bottom right */}
      <div
        className="absolute bottom-0 right-0 w-[250px] h-[250px] pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "9px 9px",
          maskImage: "linear-gradient(135deg, transparent 30%, black 80%)",
          WebkitMaskImage: "linear-gradient(135deg, transparent 30%, black 80%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-10 flex items-start flex-col gap-1">
          <p className="text-[0.5rem] sm:text-xs tracking-[0.25em] uppercase text-slate-400 font-medium">Our Games</p>
          <h2 className="text-3xl md:text-6xl font-[family-name:var(--font-display)] tracking-wide text-white leading-none uppercase">
            Featured <span className="text-red-600">Games.</span>
          </h2>
          {/* <div className="mt-2 h-[2px] w-12 bg-red-600" /> */}
        </div>

        {/* Cards */}
        <div className="grid gap-2 lg:grid-cols-3">
          {games.map((game) => (
            <div
              key={game.title}
              className={`group relative overflow-hidden rounded-md bg-[#090C18] transition-all duration-300 hover:-translate-y-1 ${game.border} ${game.glow}`}
            >
              {/* Image */}
              <div className="relative w-full h-[320px] sm:h-[360px] lg:h-[400px]">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

                {/* Decoration */}
                <div className="absolute left-5 top-5 flex items-center gap-2"></div>

                <div className="absolute right-5 top-5 h-px w-16 bg-white/15" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                <div className="relative h-16 w-36 sm:h-24 sm:w-48">
                  <Image
                    src={game.logo}
                    alt={game.title}
                    fill
                    className="object-contain object-left drop-shadow-lg"
                  />
                </div>

                <p className="mt-1 text-[11px] sm:mt-2 sm:text-xs text-neutral-300">{game.subtitle}</p>

                <Link
                  href={game.link}
                  className={`mt-4 sm:mt-6 flex h-9 sm:h-10 w-full items-center justify-center gap-2 sm:gap-3 rounded-md border text-[11px] sm:text-sm font-semibold uppercase text-white transition duration-300 ${game.button}`}
                >
                  VIEW DETAILS
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

