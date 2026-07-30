import Navbar from "@/components/Navbar/Navbar";
import EventSlider from "@/components/EventSlider";
import EventIntro from "@/components/EventIntro";
import Stats from "@/components/Stats/Stats";
import HomeTeamSection from "@/components/HomeTeamSection";
import Footer from "@/components/Footer";
import GamesSection from "@/components/GamesSection";
import HomeFeatureSections from "@/components/HomeFeatureSections";
import PrizePoolSection from "@/components/PrizePoolSection";
import FAQSection from "@/components/FAQSection";
import HomeCollegesSection from "@/components/HomeCollegesSection";
import HomeContactSection from "@/components/HomeContactSection";

export const metadata = {
  title: "IEC Esports | Inter IIIT Esports Championship by IIITians Network",
  description:
    "Official website of IEC Esports, the Inter IIIT Esports Championship organized by IIITians Network. Explore participating IIIT colleges, team rosters, and player registration for BGMI, Valorant, and Free Fire.",
  keywords: [
    "IEC Esports",
    "Inter IIIT Esports",
    "IIITians Network esports",
    "Inter IIIT esports championship",
    "IIIT esports tournament",
    "college esports India",
    "BGMI Valorant Free Fire",
    "IIIT esports event",
    "Inter IIIT gaming",
    "Inter IIIT championship",
  ],
  alternates: {
    canonical: "/",
  },
};

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
      <EventIntro />

     
      <HomeFeatureSections />
       <GamesSection />

      {/* <PrizePoolSection /> */}
      <HomeCollegesSection />
      <HomeTeamSection />
      <HomeContactSection />
      <FAQSection />
      <Footer />
    </main>
  );
}

