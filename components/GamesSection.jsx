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
    <section className="bg-[#050816] py-14">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-14 flex items-center justify-start gap-2">
          <h2 className="text-3xl md:text-4xl font-black  text-white">
            Featured Games
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-2 lg:grid-cols-3">
          {games.map((game) => (
            <div
              key={game.title}
              className={`group relative overflow-hidden rounded-md  bg-[#090C18] transition-all duration-300 hover:-translate-y-1 ${game.border} ${game.glow}`}
            >
              {/* Image */}
              <div className="w-full h-[360px]">
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
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="relative h-24 w-48">
                  <Image
                    src={game.logo}
                    alt={game.title}
                    fill
                    className="object-contain object-left drop-shadow-lg"
                  />
                </div>

                <p className="mt-2 text-xs text-neutral-300">{game.subtitle}</p>

                <Link
                  href={game.link}
                  className={`mt-6 flex h-10 w-full items-center justify-center gap-3 rounded-md border text-sm font-semibold uppercase text-white transition duration-300 ${game.button}`}
                >
                  VIEW DETAILS
                  <ArrowRight
                    size={16}
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
