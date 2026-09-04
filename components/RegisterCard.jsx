"use client";

import Link from "next/link";
import { Lock, ArrowRight, Trophy, Building2, User } from "lucide-react";

const cardShell = "z-10 my-0 sm:my-2 flex w-full max-w-[430px] justify-center px-0 sm:px-0 lg:my-0";
const cardPanel = "flex h-auto sm:h-[590px] max-h-none sm:max-h-[calc(100svh-7rem)] min-h-0 sm:min-h-[520px] w-full flex-col justify-between rounded-none sm:rounded-lg border-0 sm:border sm:border-white/10 bg-white sm:bg-black/55 px-5 py-6 shadow-none sm:shadow-2xl sm:backdrop-blur-2xl sm:px-6 sm:py-6";

export default function RegisterCard() {
  return (
    <div className={cardShell}>
      <div className={cardPanel}>
        <div className="mb-4 flex w-full border-b border-slate-200 sm:border-white/20">
          <Link href="/login" className="flex-1 py-2 text-center text-xs font-medium uppercase tracking-widest text-slate-400 sm:text-gray-400 sm:text-sm">
            LOGIN
          </Link>
          <Link href="/register" className="flex-1 border-b-2 border-red-600 py-2 text-center text-xs font-medium uppercase tracking-widest text-red-500 sm:text-sm">
            SIGN UP
          </Link>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center text-center my-auto py-6">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-600/10 border border-red-500/30 text-red-500 shadow-[0_0_20px_rgba(220,38,38,0.2)]">
            <Lock size={32} />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 sm:text-white uppercase tracking-wider mb-2">
            Registrations <span className="text-red-600">Closed</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 sm:text-slate-300 max-w-xs leading-relaxed mb-6">
            Player and team registrations for Inter-IIIT Esports Championship have officially ended.
          </p>

          <div className="w-full space-y-2.5">
            <Link
              href="/login"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-lg transition hover:bg-red-500"
            >
              <User size={16} />
              Login to Account
            </Link>

            <Link
              href="/leaderboard/bgmi"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 sm:border-white/10 bg-slate-50 sm:bg-white/5 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-800 sm:text-slate-200 transition hover:bg-white/10"
            >
              <Trophy size={16} className="text-yellow-500" />
              View Leaderboard
            </Link>

            <Link
              href="/participating-colleges"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 sm:border-white/10 bg-slate-50 sm:bg-white/5 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-800 sm:text-slate-200 transition hover:bg-white/10"
            >
              <Building2 size={16} className="text-blue-400" />
              Participating Colleges
            </Link>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 sm:border-white/10 text-center">
          <p className="text-xs text-slate-500 sm:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-red-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}