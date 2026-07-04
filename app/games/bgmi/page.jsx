import EventStructure from "@/components/bgmi/eventStructure";
import EventSlider from "@/components/EventSlider";
import Navbar from "@/components/Navbar/Navbar";
import GameOrganizers from "@/components/GameOrganisers";
import GameRules from "@/components/GameRules";
import GameFAQs from "@/components/GameFAQs";
import GameLeaderboard from "@/components/GameLeaderboard";
import GameOverview from "@/components/GameOverview";

const bgmiSlides = [
  { image: "/bgmi/1.png" },
  { image: "/bgmi/22.png" },
  { image: "/bgmi/23.png" },
];

const overviewStats = [
  { label: "Registration", value: "72%", percent: 72 },
  { label: "Team Slots", value: "48", percent: 80 },
  { label: "Readiness", value: "Qualifiers", percent: 62 },
];

const prizeSplit = [
  { label: "Champion", value: "50%", percent: 50 },
  { label: "Runner Up", value: "30%", percent: 30 },
  { label: "MVP", value: "20%", percent: 20 },
];

const eventFlow = ["Squad Registration", "College Verification", "Room Assignment", "Grand Finals"];

const organizers = [
  {
    club: "Clutch",
    college: "IIIT Kota",
    leader: "Rahul Tiwari",
    role: "Clutch Coordinator & BGMI Organiser",
    game: "BGMI",
    description:
      "Official BGMI organizing partner responsible for tournament operations, player coordination, scheduling and match management.",
    personImage: "/developers/rahul.jpg",
    networkLogo: "/logos/iiitians-network.png",
    clubLogo: "/logos/clutch.png",
  },
];

const rules = [
  "Each BGMI squad must register with exactly four starting players and approved substitutes if allowed.",
  "Teams must enter the room lobby before the reporting deadline shared by organizers.",
  "Emulators, hacks, scripts, teaming, stream sniping, and account sharing are strictly prohibited.",
  "Placement and finish points will decide rankings unless a match-specific rulebook states otherwise.",
];

const faqs = [
  {
    question: "How many players are required for BGMI?",
    answer:
      "A standard BGMI squad needs four active players. Substitute rules will be confirmed by the organizing team before fixtures begin.",
  },
  {
    question: "How will room IDs be shared?",
    answer:
      "Room IDs, passwords, and reporting windows will be shared only through the official event communication channel.",
  },
  {
    question: "What happens if a player disconnects?",
    answer:
      "Disconnects are handled according to the match rulebook. The organizer decision will be final for restarts or continuation.",
  },
];

export default function BGMIPage() {
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

      <GameOverview game="BGMI" theme="amber" stats={overviewStats} prize={prizeSplit} schedule={eventFlow} />
      <GameOrganizers organizers={organizers} theme="amber" />
      <GameRules title="BGMI Rules" rules={rules} theme="amber" />
      <EventStructure theme="amber" />
      <GameLeaderboard title="BGMI Leaderboard" theme="amber" />
      <GameFAQs faqs={faqs} theme="amber" />
    </>
  );
}


