import Hero_event from "@/components/Hero/Hero_event"
import Navbar from "@/components/Navbar/Navbar";
import About from "./About"
import Timeline from "./Timeline";
import FAQ from "./FAQ"
import Footer from "@/components/Footer";

export default function EventDetailsPage() {
  return (
    <main className="overflow-x-hidden bg-slate-950 text-white">
      <Navbar />
      <Hero_event />
      <About />
      <Timeline />
      <FAQ />
      <Footer />
    </main>
  );
}
