import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "Code of Conduct | IEC Esports",
  description: "Community expectations and behavior guidelines for IEC Esports.",
};

export default function ConductPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">Legal</p>
        <h1 className="mt-3 text-4xl font-[family-name:var(--font-display)] uppercase tracking-wide sm:text-6xl">Code of Conduct</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">This page is reserved for the community and participant conduct policy. Add your moderation rules, anti-cheat policy, and sportsmanship expectations here.</p>
      </section>
      <Footer />
    </main>
  );
}
