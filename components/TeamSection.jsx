import { getIECTeamMembers } from "@/lib/helpers/iecTeam";
import TeamCard from "./TeamCard";

const DEPARTMENTS = [
  "Management",
  "Free Fire",
  "BGMI",
  "Valorant",
  "Sponsorship",
  "Web Development",
  "Social Media",
  "Design",
  "Content"
];

export default async function TeamSection() {
  const teamMembers = await getIECTeamMembers();

  if (!teamMembers || teamMembers.length === 0) {
    return (
      <section className="bg-white py-12 text-slate-950 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-5xl tracking-wide sm:text-6xl text-[#0f172a] uppercase leading-none">
              Members
            </h2>
          </div>
          <div className="w-full py-16 text-center text-slate-500 border border-dashed border-slate-200">
            The core team is currently being assembled.
          </div>
        </div>
      </section>
    );
  }

  // Filter members by departments
  const departmentGroups = DEPARTMENTS.map(dept => {
    return {
      name: dept,
      members: teamMembers.filter(member => member.departments?.includes(dept))
    };
  }).filter(group => group.members.length > 0);

  // Fallback for members without any department
  const unassignedMembers = teamMembers.filter(member => !member.departments || member.departments.length === 0);
  if (unassignedMembers.length > 0) {
    departmentGroups.push({
      name: "Other Members",
      members: unassignedMembers
    });
  }

  return (
    <section className="bg-slate-50 py-10 text-slate-950 sm:py-24 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8 sm:mb-16 text-left">
          
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-wide sm:text-5xl lg:text-6xl text-slate-900 uppercase leading-none">
            Core <span className="text-red-600">Team.</span>
          </h2>
          
        </div>
        
        <div className="space-y-8 md:space-y-24">
          {departmentGroups.map((group) => (
            <div key={group.name} className="relative">
              
              {/* Department Header */}
              <div className="mb-6 sm:mb-8 text-left border-b border-slate-200 pb-2">
                <span className="text-xs sm:text-sm font-bold text-red-400 uppercase tracking-wider">
                  {group.name} {group.name.includes("Team") ? "" : "Team"}
                </span>
              </div>

              {/* Department Members */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 sm:gap-3 lg:gap-4 justify-center">
                {group.members.map((member) => (
                  <div key={member._id.toString()} className="w-full">
                    <TeamCard member={member} />
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
