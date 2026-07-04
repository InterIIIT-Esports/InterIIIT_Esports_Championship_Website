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

const logos = [
  "Logo space",
  "Logo space",
  "Logo space",
  "Logo space",
];

const stats = [
  { label: "Titles", value: "3" },
  { label: "Teams", value: "IIIT squads" },
  { label: "Format", value: "Live finals" },
  { label: "Style", value: "Minimal, premium" },
];

export default function About() {
  return (
    <section className="bg-black py-8 text-white sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="border border-white/10 bg-white text-black shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
            <div className="border-b border-black/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.42em] text-black/45">
                About the Event
              </p>

              <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[3.1rem] lg:leading-[1.05]">
                Inter-IIIT Esports, built with a clean and serious visual tone.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-black/70 sm:text-base">
                A focused championship experience for college teams, designed to feel professional, compact, and easy to read while still carrying the energy of the event.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {stats.map((item) => (
                  <div key={item.label} className="border border-black/10 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/45">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-medium text-black sm:text-[15px]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/register"
                  className="border border-black bg-black px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-black"
                >
                  Register
                </a>
                <a
                  href="/event-details"
                  className="border border-black/10 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-black transition hover:border-black hover:bg-black hover:text-white"
                >
                  Event Details
                </a>
              </div>
            </div>

            <div className="bg-black p-6 text-white sm:p-8 lg:p-10">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {logos.map((label, index) => (
                  <div
                    key={`${label}-${index}`}
                    className="flex min-h-[140px] flex-col items-center justify-center border border-white/10 bg-white/[0.03] px-3 py-4 text-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center border border-dashed border-white/15 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
                      Logo
                    </div>
                    <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-white/35">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {gameCards.map((game, index) => (
                  <article
                    key={game.title}
                    className="group overflow-hidden border border-white/10 bg-white/[0.03]"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
                      <img
                        src={game.src}
                        alt={game.title}
                        className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-black/18" />
                    </div>

                    <div className="space-y-2 p-4">
                      <p className="text-sm font-semibold text-white">
                        {game.title}
                      </p>
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                        {game.subtitle}
                      </p>
                    </div>

                    <div className="absolute left-3 top-3 h-7 w-7 border border-white/15 bg-black/35 text-center text-[10px] font-semibold leading-7 text-white/60">
                      0{index + 1}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
