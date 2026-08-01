import EventSlider from "@/components/EventSlider";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import GameOrganizers from "@/components/GameOrganisers";
import GameLeaderboard from "@/components/GameLeaderboard";
import { dbConnect } from "@/lib/mongodb";
import IECTeamMember from "@/lib/models/IECTeamMember";

const bgmiSlides = [
  { image: "/bgmi/1.png" },
  { image: "/bgmi/22.png" },
  { image: "/bgmi/23.png" },
];

const bgmiOrganizers = [
  {
    club: "Clutch IIIT Kota",
    college: "IIIT Kota",
    leader: "Rahul Tiwari",
    role: "Clutch Organising Partner & BGMI Lead",
    game: "BGMI",
    description:
      "Official BGMI organizing partner from IIIT Kota handling tournament operations, player coordination, scheduling and match management.",
    personImage: "/developers/rahul.jpg",
    networkLogo: "/logos/iiitians-network.png",
    clubLogo: "/logos/clutch.jpg",
    email: "clutch.iiitkota@gmail.com",
    social: {
      instagram: "https://www.instagram.com/clutch_iiitkota/",
    },
  },
];

const bgmiLeaderboard = [
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

export default async function BGMIPage() {
  await dbConnect();
  const teamMembers = await IECTeamMember.find({ departments: "BGMI" }).sort({ order: 1 }).lean();
  
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
        slides={bgmiSlides}
        title="Battlegrounds Mobile"
        subtitle="India Championship"
        description="Drop into the battleground, outplay your opponents, and fight for the championship title. Squad up and compete against the best IIIT teams from across the nation."
        primaryBtn={{
          text: "Register Now",
          href: "/register",
        }}
        secondaryBtn={{
          text: "Rulebook",
          href: "/games/bgmi/rulebook",
        }}
      />
      
      <GameLeaderboard title="BGMI Leaderboard" rows={bgmiLeaderboard} theme="amber" />
      
      <GameOrganizers organizers={bgmiOrganizers} teamMembers={serializedMembers} theme="amber" />
      
      <Footer />
    </>
  );
}
