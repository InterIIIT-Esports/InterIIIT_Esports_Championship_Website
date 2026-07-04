function StatCard({ number, label }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-red-500 hover:shadow-[0_0_35px_rgba(239,68,68,0.35)]">

      {/* Glow */}
      <div className="absolute -top-24 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-red-500/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

     
      

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_top_right,#ef4444_0%,transparent_60%)]" />

      <div className="relative z-10">
        <h3 className="text-5xl font-black tracking-tight text-white transition-all duration-300 group-hover:text-red-400">
          {number}
        </h3>

       

        <p className="mt-5 text-sm font-semibold  text-slate-400">
          {label}
        </p>
      </div>
    </div>
  );
}

export default StatCard;