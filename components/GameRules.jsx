const themes = {
  amber: {
    border: "border-amber-400/50",
    label: "text-amber-300",
    card: "hover:border-amber-400/40 hover:bg-amber-400/[0.06]",
    badge: "text-amber-300",
  },
  red: {
    border: "border-red-500/50",
    label: "text-red-300",
    card: "hover:border-red-500/40 hover:bg-red-500/[0.06]",
    badge: "text-red-300",
  },
  blue: {
    border: "border-sky-400/50",
    label: "text-sky-300",
    card: "hover:border-sky-400/40 hover:bg-sky-400/[0.06]",
    badge: "text-sky-300",
  },
};

export default function GameRules({ title = "Tournament Rules", rules = [], theme = "red" }) {
  const colors = themes[theme] || themes.red;
  const fallbackRules = [
    "All players must register with accurate college and team details.",
    "Teams must join the official match lobby before the reporting deadline.",
    "Any unfair play, account sharing, or abusive behavior can lead to disqualification.",
    "Final decisions by the organizing team will be binding for match disputes.",
  ];

  const items = rules.length ? rules : fallbackRules;

  return (
    <section className="bg-black py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`max-w-2xl border-l pl-4 ${colors.border}`}>
          <p className={`text-[10px] font-semibold uppercase tracking-[0.45em] ${colors.label}`}>
            Rulebook
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-white/55 sm:text-base">
            Core rules every team should review before joining the event.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((rule, index) => (
            <article
              key={rule}
              className={`border border-white/10 bg-white/[0.03] p-5 transition duration-300 ${colors.card}`}
            >
              <p className={`text-[10px] font-semibold uppercase tracking-[0.28em] ${colors.badge}`}>
                Rule {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-sm leading-7 text-white/70">
                {rule}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
