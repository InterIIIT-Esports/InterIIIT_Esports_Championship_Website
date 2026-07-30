import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "Tournament Rules | IEC Esports",
  description: "Official tournament rules and format for IEC Esports.",
};

export default function RulesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">Legal</p>
        <h1 className="mt-3 text-4xl font-[family-name:var(--font-display)] uppercase tracking-wide sm:text-6xl">Tournament Rules</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">We will publish the full tournament rules here. This page is ready for your content and can be expanded with sections, eligibility, format, and enforcement details.</p>
      </section>
      <Footer />
    </main>
  );
}
