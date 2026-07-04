import EventStructure from "@/components/bgmi/eventStructure";
import EventSlider from "@/components/EventSlider";
import Navbar from "@/components/Navbar/Navbar";
import GameOrganizers from "@/components/GameOrganisers";
import GameRules from "@/components/GameRules";
import GameFAQs from "@/components/GameFAQs";
import GameLeaderboard from "@/components/GameLeaderboard";
import GameOverview from "@/components/GameOverview";

const ffSlides = [
  { image: "/ff/1.png" },
  { image: "/ff/11.png" },
];

const overviewStats = [
  { label: "Registration", value: "64%", percent: 64 },
  { label: "Team Slots", value: "40", percent: 68 },
  { label: "Readiness", value: "Lobby Prep", percent: 54 },
];

const prizeSplit = [
  { label: "Champion", value: "45%", percent: 45 },
  { label: "Runner Up", value: "35%", percent: 35 },
  { label: "Top Fragger", value: "20%", percent: 20 },
];

const eventFlow = ["Roster Lock", "Lobby Check", "Qualifier Rounds", "Final Clash"];

const organizers = [
  {
    club: "Clutch",
    college: "IIIT Kota",
    leader: "Rahul Tiwari",
    role: "Clutch Coordinator & Free Fire Organiser",
    game: "FF",
    description:
      "Official Free Fire organizing partner handling rooms, fixtures, team support and match operations.",
    logo: "/logos/clutch.png",
    personImage: "/developers/rahul.jpg",
  },
];

const rules = [
  "Each Free Fire team must register with the required squad size before verification closes.",
  "Teams must report before match time and join the lobby with the registered player names.",
  "Use of third-party tools, modified clients, account sharing, or unfair coordination is not allowed.",
  "Ranking will be based on the announced point system for placement, eliminations, and penalties.",
];

const faqs = [
  {
    question: "Is Free Fire Max allowed?",
    answer:
      "Yes, players may use the approved Free Fire client or version specified by organizers before match day.",
  },
  {
    question: "Can we change our squad after registration?",
    answer:
      "Roster changes are only possible before verification closes and must be approved by the organizing team.",
  },
  {
    question: "Where will fixtures be posted?",
    answer:
      "Fixtures, lobby details, and match updates will be shared through official event communication channels.",
  },
];

export default function FFPage() {
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

      <GameOverview game="Free Fire" theme="blue" stats={overviewStats} prize={prizeSplit} schedule={eventFlow} />
      <GameOrganizers organizers={organizers} theme="blue" />
      <GameRules title="Free Fire Rules" rules={rules} theme="blue" />
      <EventStructure theme="blue" />
      <GameLeaderboard title="Free Fire Leaderboard" theme="blue" />
      <GameFAQs faqs={faqs} theme="blue" />
    </>
  );
}


