import EventStructure from "@/components/bgmi/eventStructure";
import EventSlider from "@/components/EventSlider";
import Navbar from "@/components/Navbar/Navbar";
import GameOrganizers from "@/components/GameOrganisers";
import GameRules from "@/components/GameRules";
import GameFAQs from "@/components/GameFAQs";
import GameLeaderboard from "@/components/GameLeaderboard";
import GameOverview from "@/components/GameOverview";

const valoSlides = [
  { image: "/valo/1.png" },
  { image: "/valo/33.png" },
];

const overviewStats = [
  { label: "Registration", value: "58%", percent: 58 },
  { label: "Team Slots", value: "24", percent: 60 },
  { label: "Readiness", value: "Map Veto", percent: 48 },
];

const prizeSplit = [
  { label: "Champion", value: "50%", percent: 50 },
  { label: "Runner Up", value: "30%", percent: 30 },
  { label: "Clutch Player", value: "20%", percent: 20 },
];

const eventFlow = ["Roster Check", "Map Veto", "Knockouts", "Best-of Finals"];

const organizers = [
  {
    club: "Clutch",
    college: "IIIT Kota",
    leader: "Rahul Tiwari",
    role: "Clutch Coordinator & Valorant Organiser",
    game: "VALO",
    description:
      "Official Valorant organizing partner handling match rooms, brackets, player coordination and dispute support.",
    logo: "/logos/clutch.png",
    personImage: "/developers/rahul.jpg",
  },
];

const rules = [
  "Each Valorant roster must register with five starting players and approved substitutes if allowed.",
  "Players must use their registered Riot IDs and join the custom lobby before the reporting deadline.",
  "Cheating, scripting, account sharing, abusive conduct, and unauthorized coaching are not permitted.",
  "Map veto, side selection, overtime, and pause rules will follow the official match briefing.",
];

const faqs = [
  {
    question: "How many players are needed for Valorant?",
    answer:
      "A Valorant team requires five active players. Substitute limits will be confirmed by organizers before the bracket begins.",
  },
  {
    question: "How will map veto work?",
    answer:
      "Map veto and side selection rules will be announced with the match format before fixtures start.",
  },
  {
    question: "Are coaches allowed?",
    answer:
      "Coaches are allowed only if the final rulebook permits them. Any unauthorized assistance can lead to penalties.",
  },
];

export default function ValorantPage() {
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

      <GameOverview game="Valorant" theme="red" stats={overviewStats} prize={prizeSplit} schedule={eventFlow} />
      <GameOrganizers organizers={organizers} theme="red" />
      <GameRules title="Valorant Rules" rules={rules} theme="red" />
      <EventStructure theme="red" />
      <GameLeaderboard title="Valorant Leaderboard" theme="red" />
      <GameFAQs faqs={faqs} theme="red" />
    </>
  );
}


