import Link from "next/link";

export default function Hero() {
    return(
        <section className="relative overflow-hidden bg-slate-950">
            <img
                src="/event-slide-1.png"
                alt="IEC Esports highlight"
                className="absolute inset-0 h-full w-full object-cover opacity-80"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/30 to-transparent" />
            <div className="absolute inset-0 bg-slate-950/70" />

            <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-6 py-24">
                <div className="max-w-2xl space-y-6">
                    <span className="inline-flex items-center gap-2 rounded-full bg-red-500/15 px-4 py-2 text-xs uppercase tracking-[0.35em] text-red-200">
                        InterIIIIT Esports
                    </span>

                    <h1 className="text-5xl font-black leading-tight text-white md:text-6xl">
                        College esports tournaments for Free Fire, BGMI, and Valorant.
                    </h1>

                    <p className="max-w-xl text-lg leading-8 text-slate-300">
                        Register your team for the biggest inter-college competition and battle for glory, prizes, and campus honors.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-red-500"
                        >
                            Register Now
                        </Link>
                        <Link
                            href="/event-details"
                            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:border-red-400"
                        >
                            Event Details
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-3xl bg-white/5 p-5 text-slate-100">
                            <p className="text-sm uppercase text-gray-400">Prize pool</p>
                            <p className="mt-2 text-3xl font-bold">₹50K+</p>
                        </div>
                        <div className="rounded-3xl bg-white/5 p-5 text-slate-100">
                            <p className="text-sm uppercase text-gray-400">Teams</p>
                            <p className="mt-2 text-3xl font-bold">50+</p>
                        </div>
                        <div className="rounded-3xl bg-white/5 p-5 text-slate-100">
                            <p className="text-sm uppercase text-gray-400">Games</p>
                            <p className="mt-2 text-3xl font-bold">3 Titles</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}