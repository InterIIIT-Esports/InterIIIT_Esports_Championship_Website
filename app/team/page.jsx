import TeamActions from "./components/TeamActions";

export const metadata = {
  title: "Team Management | IEC Esports",
  description: "Create, join, or manage your esports team.",
};

export default function UserTeamPage() {
  return (
    <main className="min-h-screen bg-[#121212]">
      <TeamActions />
    </main>
  );
}