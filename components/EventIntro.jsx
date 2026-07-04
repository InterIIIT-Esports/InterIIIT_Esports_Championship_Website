
"use client";

export default function EventIntro() {
  const organisers = [
    { name: "IIITians Network", role: "Founder", logo: "/logos/iiitians-network.png" },
    { name: "Clutch IIIT Kota", role: "Organising Partner BGMI", logo: "/logos/clutch.jpg" },
    { name: "Synergy IIIT Nagpur", role: "Organising Partner Valo", logo: "/logos/synergy.png" },
    { name: "Sports Club IIIT Kalyani", role: "Community Partner FF", logo: "/logos/SportsClubKalyani.jpg" },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-white">
      <div className="absolute inset-0 " />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            

            <h2 className="mb-8 text-3xl font-bold leading-tight lg:text-4xl">
              What is
              <span className="text-white"> IEC ?</span>
            </h2>

            <div className="space-y-3 text-slate-300 leading-8">
              <p>
                The Inter-IIIT Esports Championship (IEC) is a nationwide esports
                competition uniting students from IIITs across India through
                professional gaming and healthy competition.
              </p>

              <p>
                Organised by student communities from multiple institutes, IEC
                provides structured tournaments, high production quality, and a
                platform for collaboration across campuses.
              </p>

              <p>
                Featuring BGMI, Valorant, and Free Fire, the championship
                combines online qualifiers, competitive league stages, and
                exciting finals into one unified experience.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/register"
                className="rounded-md bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-500"
              >
                Register Now
              </a>

              <a
                href="/brochure.pdf"
                className="rounded-md border border-white/15 px-6 py-3 font-semibold hover:bg-white/5"
              >
                Download Brochure
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-3xl font-bold">Partners</h3>

            <div className="grid grid-cols-2 gap-5">
              {organisers.map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-8 transition hover:border-red-500/50 hover:bg-white/[0.05]"
                >
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="mx-auto h-20 object-contain"
                  />

                  <h4 className="mt-6 text-center text-lg font-semibold">
                    {item.name}
                  </h4>

                  <p className="mt-2 text-center text-sm text-slate-400">
                    {item.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
