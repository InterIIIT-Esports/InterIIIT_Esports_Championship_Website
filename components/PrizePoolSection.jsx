"use client";

import { Trophy, Gift, Medal } from "lucide-react";

export default function PrizePoolSection() {
  const prizes = [
    {
      place: "1st Place",
      amount: "₹50,000",
      icon: <Trophy size={28} className="text-yellow-400" />,
      color: "from-yellow-400/20 to-yellow-600/5",
      borderColor: "border-yellow-400/30",
    },
    {
      place: "2nd Place",
      amount: "₹25,000",
      icon: <Medal size={28} className="text-slate-300" />,
      color: "from-slate-300/20 to-slate-500/5",
      borderColor: "border-slate-300/30",
    },
    {
      place: "3rd Place",
      amount: "₹10,000",
      icon: <Gift size={28} className="text-orange-400" />,
      color: "from-orange-400/20 to-orange-600/5",
      borderColor: "border-orange-400/30",
    },
  ];

  return (
    <section className="relative py-12 lg:py-16 bg-black overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-500/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-left sm:text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-slate-400 font-medium mb-1">Rewards</p>
          <h2 className="text-4xl font-[family-name:var(--font-display)] leading-none tracking-wide text-white sm:text-6xl uppercase">
            Prize <span className="text-red-600">Pool.</span>
          </h2>
          <p className="mt-3 max-w-xl text-xs text-slate-400 sm:mx-auto sm:text-sm">
            Compete for glory and walk away with massive cash prizes. The stakes have never been higher.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-3">
          {prizes.map((prize, idx) => (
            <div
              key={idx}
              className={`relative group rounded-xl border ${prize.borderColor} bg-gradient-to-b ${prize.color} p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/5`}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 border border-white/10 shadow-lg transition-transform duration-300 group-hover:scale-110">
                {prize.icon}
              </div>
              <h3 className="text-sm sm:text-base font-bold uppercase tracking-widest text-white mb-1">
                {prize.place}
              </h3>
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                {prize.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

