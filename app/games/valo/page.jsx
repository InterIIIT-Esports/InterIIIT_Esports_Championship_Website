import EventSlider from "@/components/EventSlider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import GameOrganizers from "@/components/GameOrganisers";
import GameLeaderboard from "@/components/GameLeaderboard";
import { dbConnect } from "@/lib/mongodb";
import IECTeamMember from "@/lib/models/IECTeamMember";

const valoSlides = [
  { image: "/valo/1.png" },
  { image: "/valo/33.png" },
];

const valoOrganizers = [
  {
    club: "Clutch",
    college: "IIIT Kota",
    leader: "Rahul Tiwari",
    role: "Clutch Coordinator & Valorant Organiser",
    game: "VALO",
    description:
      "Official Valorant organizing partner handling match rooms, brackets, player coordination and dispute support.",
    personImage: "/developers/rahul.jpg",
    networkLogo: "/logos/iiitians-network.png",
    clubLogo: "/logos/clutch.jpg",
  },
];

const valoLeaderboard = [
  { rank: "01", team: "To be announced", played: "-", points: "-" },
  { rank: "02", team: "To be announced", played: "-", points: "-" },
  { rank: "03", team: "To be announced", played: "-", points: "-" },
  { rank: "04", team: "To be announced", played: "-", points: "-" },
];

export default async function ValorantPage() {
  await dbConnect();
  const teamMembers = await IECTeamMember.find({ departments: "Valorant" }).sort({ order: 1 }).lean();
  
  // Convert MongoDB ObjectIds to strings to avoid passing non-plain objects to Client Components
  const serializedMembers = teamMembers.map(member => ({
    ...member,
    _id: member._id.toString(),
    createdAt: member.createdAt?.toISOString(),
    updatedAt: member.updatedAt?.toISOString()
  }));

  return (
    <>
      <Navbar />
      <EventSlider
        slides={valoSlides}
        title="Valorant PC"
        subtitle="Championship"
        description="Enter tactical five-versus-five matches where coordination, precision, and clutch decision-making decide the championship."
        primaryBtn={{
          text: "Register Now",
          href: "/register",
        }}
        secondaryBtn={{
          text: "Rulebook",
          href: "/games/valo/rulebook",
        }}
      />
      
      <GameLeaderboard title="Valorant Leaderboard" rows={valoLeaderboard} theme="red" />
      
      <GameOrganizers organizers={valoOrganizers} teamMembers={serializedMembers} theme="red" />
      
      <Footer />
    </>
  );
}
