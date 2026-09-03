const gameCards = [
  {
    src: "/ff/1.png",
    title: "Free Fire",
    subtitle: "Squad battle energy",
  },
  {
    src: "/valo/1.png",
    title: "Valorant",
    subtitle: "Tactical duel focus",
  },
  {
    src: "/bgmi/1.png",
    title: "BGMI",
    subtitle: "Battle royale intensity",
  },
];

const stats = [
  { label: "Colleges", value: "21 Participating IIITs" },
  { label: "Teams", value: "1200+ IIIT Squads" },
  { label: "Titles", value: "3 Major Games" },
  { label: "Format", value: "Live Finals" },
];

export default function About() {
  return (
    <section id="about" className="relative bg-white pt-6 pb-12 sm:pt-12 sm:pb-24 text-slate-900 overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          
          {/* Left Column (Text & Stats) */}
          <div className="flex flex-col justify-center">
            
            {/* <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-red-600">
              About the Event
            </p> */}

            <h2 className="mt-4 sm:mt-6 max-w-xl text-3xl font-[family-name:var(--font-display)] tracking-wide sm:text-5xl lg:text-6xl text-slate-900 leading-[1.1] uppercase">
              The Ultimate 
              <span className="text-red-600"> Showdown.</span>
            </h2>

            <p className="mt-5 sm:mt-8 max-w-xl text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
              Inter-IIIT Esports Championship unites the best gaming talent from IIITs across India in a nationwide competition. Organised by IIITians Network in collaboration with gaming clubs across participating IIITs, the championship features BGMI, Valorant, and Free Fire through a structured three-stage format—from Intra-IIIT qualifiers to the Inter-IIIT league stage and the Grand Finals—to crown the ultimate champions.
            </p>

            {/* Stats Grid */}
            <div className="mt-6 sm:mt-10 grid gap-2 sm:gap-3 sm:grid-cols-2">
              {stats.map((item) => (
                <div key={item.label} className="bg-slate-50 rounded-xl p-4 sm:p-5 transition-all duration-300 hover:bg-red-50 hover:shadow-sm group">
                  <p className="text-[15px] font-bold  text-red-500 group-hover:text-red-600 transition-colors">
                    {item.label}
                  </p>
                  <p className="mt-2 text-md font-bold text-slate-900">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* <div className="mt-6 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
              <a
                href="/register"
                className="rounded-lg bg-red-600 px-6 py-3 sm:px-8 sm:py-4 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/20"
              >
                Register Now
              </a>
              <a
                href="#timeline"
                className="rounded-lg bg-slate-100 px-6 py-3 sm:px-8 sm:py-4 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-900 transition-all duration-300 hover:bg-slate-200"
              >
                View Format
              </a>
            </div> */}
          </div>

          {/* Right Column (Games) */}
          <div className="relative">
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {/* <h3 className="sm:col-span-2 lg:col-span-1 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-1">Featured Titles</h3> */}
              {gameCards.map((game, index) => (
                <article
                  key={game.title}
                  className="group relative overflow-hidden rounded-xl transition-all duration-500 hover:shadow-xl hover:shadow-black/10 hover:z-10"
                >
                  <div className="relative aspect-5/2 sm:aspect-[1.8/1] lg:aspect-[2.5/1] overflow-hidden">
                    <img
                      src={game.src}
                      alt={game.title}
                      className="absolute inset-0 h-full w-full object-cover  transition duration-700 group-hover:scale-105"
                    />
                    {/* Dark gradient overlay so text is always readable */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                  </div>

                  <div className="absolute inset-0 flex flex-col  p-6 sm:p-8">
                    <div className="flex items-center gap-4">
                    
                      <div>
                        <h4 className="text-xl font-bold text-white tracking-wide drop-shadow-md">
                          {game.title}
                        </h4>
                        <p className="mt-1 text-xs tracking-widest text-white/70 font-semibold">
                          {game.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
