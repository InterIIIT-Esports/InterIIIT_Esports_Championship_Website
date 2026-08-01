import EventSlider from "@/components/EventSlider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import GameOrganizers from "@/components/GameOrganisers";
import GameLeaderboard from "@/components/GameLeaderboard";
import { dbConnect } from "@/lib/mongodb";
import IECTeamMember from "@/lib/models/IECTeamMember";

const ffSlides = [
  { image: "/ff/1.png" },
  { image: "/ff/11.png" },
];

const ffOrganizers = [
  {
    club: "Sports Club IIIT Kalyani",
    college: "IIIT Kalyani",
    leader: "Advik Mukherjee",
    role: "Sports Club Community Partner & Free Fire Lead",
    game: "FF",
    description:
      "Official Free Fire operations partner from IIIT Kalyani handling player coordination, lobby flow and match-day support.",
    personImage: "/developers/Advik.jpeg",
    networkLogo: "/logos/iiitians-network.png",
    clubLogo: "/logos/SportsClubKalyani.jpg",
    email: "sportsiiitkalyani@gmail.com",
    social: {
      instagram: "https://www.instagram.com/sports_iiitkalyani",
      discord: "https://discord.gg/KvXd8HMQWc",
    },
  },
];

const ffLeaderboard = [
  { rank: "01", team: "To be announced", played: "-", points: "-" },
  { rank: "02", team: "To be announced", played: "-", points: "-" },
  { rank: "03", team: "To be announced", played: "-", points: "-" },
  { rank: "04", team: "To be announced", played: "-", points: "-" },
  { rank: "05", team: "To be announced", played: "-", points: "-" },
  { rank: "06", team: "To be announced", played: "-", points: "-" },
  { rank: "07", team: "To be announced", played: "-", points: "-" },
  { rank: "08", team: "To be announced", played: "-", points: "-" },
  { rank: "09", team: "To be announced", played: "-", points: "-" },
  { rank: "10", team: "To be announced", played: "-", points: "-" },
];

export default async function FFPage() {
  await dbConnect();
  const teamMembers = await IECTeamMember.find({ departments: "Free Fire" }).sort({ order: 1 }).lean();
  
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
        slides={ffSlides}
        title="Free Fire Max"
        subtitle="Championship"
        description="Drop into fast-paced squad battles, outplay your opponents, and fight for the championship title against the best IIIT teams."
        primaryBtn={{
          text: "Register Now",
          href: "/register",
        }}
        secondaryBtn={{
          text: "Rulebook",
          href: "/games/ff/rulebook",
        }}
      />
      
      <GameLeaderboard title="Free Fire Leaderboard" rows={ffLeaderboard} theme="blue" />
      
      <GameOrganizers organizers={ffOrganizers} teamMembers={serializedMembers} theme="blue" />
      
      <Footer />
    </>
  );
}
