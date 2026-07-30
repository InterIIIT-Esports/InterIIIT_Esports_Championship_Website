import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";

export const metadata = {
  title: "Terms of Service | IEC Esports",
  description: "Terms and conditions for using IEC Esports services.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-500">Legal</p>
        <h1 className="mt-3 text-4xl font-[family-name:var(--font-display)] uppercase tracking-wide sm:text-6xl">Terms of Service</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">This is a placeholder for your terms and conditions. You can add eligibility, account rules, liability, and event participation terms here.</p>
      </section>
      <Footer />
    </main>
  );
}
