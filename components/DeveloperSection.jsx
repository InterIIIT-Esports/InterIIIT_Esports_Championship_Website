import DeveloperCard from "./DeveloperCard";

const developers = [
  {
    image: "/developers/ankur.jpg",
    name: "Ankur Singh",
    role: "Frontend Developer",
    quote: "For website UI, responsiveness, and interface polish across the event platform.",
    github: "https://github.com/ankur",
    linkedin: "https://linkedin.com/in/ankur",
    website: "https://ankur.dev",
  },
  {
    image: "/developers/Advik.jpeg",
    name: "Advik",
    role: "Frontend Developer",
    quote: "For page experience, visual details, and frontend fixes during the event.",
    github: "https://github.com/advik",
    linkedin: "https://linkedin.com/in/advik",
    website: "",
  },
  {
    image: "/developers/rahul.jpg",
    name: "Rahul",
    role: "Backend Developer",
    quote: "For login, team APIs, registrations, and backend support workflows.",
    github: "https://github.com/rahul",
    linkedin: "https://linkedin.com/in/rahul",
    website: "",
  },
];

function DeveloperSection() {
  return (
    <section className="w-full bg-black py-12 text-white lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            
            <h2 className="font-[family-name:var(--font-display)] text-4xl leading-none tracking-wide text-white sm:text-6xl uppercase">
              Contact The <span className="text-red-600">Developers.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-400">
            Found a website bug, login issue, or page layout problem? Reach the build team here.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {developers.map((developer) => (
            <DeveloperCard key={developer.name} {...developer} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default DeveloperSection;
