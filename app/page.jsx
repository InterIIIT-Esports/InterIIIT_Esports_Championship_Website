import Navbar from "@/components/Navbar/Navbar";
import EventSlider from "@/components/EventSlider";
import EventIntro from "@/components/EventIntro";
import Stats from "@/components/Stats/Stats";

import DeveloperSection from "@/components/DeveloperSection";
import Footer from "@/components/Footer";
import GamesSection from "@/components/GamesSection";

const homeSlides = [
  { image: "/ff/11.png" },
  { image: "/valo/33.png" },
  { image: "/bgmi/23.png" },
];

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-slate-950 text-white">
      <Navbar />

      <EventSlider
        slides={homeSlides}
        title="India's Biggest"
        subtitle="Inter-IIIT Esports League"
        description="Compete with the finest gamers from IIITs across India in BGMI, Valorant and Free Fire. Experience professional production, exciting prize pools and national recognition."
      />
      <GamesSection/>
      <EventIntro />
      <Stats />
  
      <DeveloperSection />
      <Footer />
    </main>
  );
}
