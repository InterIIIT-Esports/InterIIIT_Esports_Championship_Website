import DeveloperCard from "./DeveloperCard";

function DeveloperSection() {
  return (
    <section className="w-full bg-black py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          
          <h2 className="mt-3 text-3xl font-semibold uppercase tracking-tight sm:text-4xl lg:text-5xl">
            Developers
          </h2>
          <p className="mx-auto mt-4 max-w-7xl text-sm leading-7 text-slate-400 sm:text-base">
            The people behind the website, focused on a clean and reliable event experience.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
  <DeveloperCard
    image="/developers/ankur.jpg"
    name="Ankur Singh"
    role="Frontend Developer"
    quote="Building modern, responsive interfaces that create a seamless experience for every participant."
    github="https://github.com/ankur"
    linkedin="https://linkedin.com/in/ankur"
    website="https://ankur.dev"
  />

  <DeveloperCard
    image="/developers/Advik.jpeg"
    name="Advik"
    role="Frontend Developer"
    quote="Focused on crafting intuitive UI and delivering pixel-perfect user experiences."
    github="https://github.com/advik"
    linkedin="https://linkedin.com/in/advik"
    website=""
  />

  <DeveloperCard
    image="/developers/rahul.jpg"
    name="Rahul"
    role="Backend Developer"
    quote="Designing secure, scalable backend systems that keep the tournament running smoothly."
    github="https://github.com/rahul"
    linkedin="https://linkedin.com/in/rahul"
    website=""
  />
</div>
      </div>
    </section>
  );
}

export default DeveloperSection;
