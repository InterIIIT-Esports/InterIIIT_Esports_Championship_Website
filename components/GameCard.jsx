export default function GameCard({ image, title, description, accent, tag }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />

        <div className={`absolute inset-0 bg-gradient-to-t ${accent} via-black/10 to-transparent`} />
        <div className="absolute left-4 top-4 rounded-md border border-white/15 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/80 backdrop-blur-md">
          {tag}
        </div>
      </div>

      <div className="space-y-4 p-5 sm:p-6">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-white">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-white/0 via-white/10 to-white/0" />
          <button className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-200 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-white">
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}
