import StatCard from "./StatCard";

function StatsSection() {
  const stats = [
    { number: "500+", label: "Participants" },
    { number: "3", label: "Game Titles" },
    { number: "50+", label: "Teams" },
    { number: "₹50K+", label: "Prize Pool" },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-14 text-white">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-[250px] w-[250px] rounded-full bg-red-500/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-left">
          <h2 className="text-2xl font-black md:text-3xl">
            Tournament by Numbers
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut nemo
            consequuntur laudantium deleniti dolorum tenetur vel totam dolore
            animi aspernatur?
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;