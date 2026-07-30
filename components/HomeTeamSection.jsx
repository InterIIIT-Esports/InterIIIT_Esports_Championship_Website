import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { getIECTeamMembers } from "@/lib/helpers/iecTeam";

export default async function HomeTeamSection() {
  const allMembers = await getIECTeamMembers();
  // Get top 5 members
  const teamMembers = allMembers.slice(0, 5);

  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="bg-slate-50 py-10 text-slate-950 sm:py-24 border-t border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 text-left sm:text-center sm:mb-16">
          {/* <p className="text-[0.5rem] sm:text-xs tracking-[0.25em] uppercase text-red-500 font-medium mb-1">
            Our Team
          </p> */}
          <h2 className="text-3xl font-[family-name:var(--font-display)] tracking-wide sm:text-4xl lg:text-6xl text-slate-900 uppercase leading-none">
            Core <span className="text-red-600">Team.</span>
          </h2>
          {/* <p className="mt-2 sm:mt-4 text-slate-500 text-[11px] sm:text-sm  font-semibold">
            Meet the people behind the championship
          </p> */}
        </div>

        {/* Desktop View: Grid of Compact Cards */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {teamMembers.map((member) => (
            <article key={member._id.toString()} className="group flex flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="relative aspect-[4/5] w-full bg-slate-100 overflow-hidden">
                <Image
                  src={member.image_url}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover object-top transition duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3 z-20 flex gap-2">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-7 w-7 items-center justify-center text-[#0a66c2] transition-opacity hover:opacity-80"
                    >
                      <FaLinkedin size={14} />
                    </a>
                  )}
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-7 w-7 items-center justify-center text-[#e1306c] transition-opacity hover:opacity-80"
                    >
                      <FaInstagram size={14} />
                    </a>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white truncate pr-2">
                    {member.role || "Team"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center p-4 pt-3 text-center">
                <h3 className="text-[14px] font-bold text-[#0f172a] line-clamp-1">{member.name}</h3>
                {member.college && (
                  <span className="mt-1.5 inline-flex items-center rounded-md bg-red-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-600 ring-1 ring-inset ring-red-600/10">
                    {member.college}
                  </span>
                )}
              </div>
            </article>
          ))}

          {/* See More Card Desktop */}
          <Link href="/iec-team" className="group flex flex-col justify-between overflow-hidden rounded-[20px] bg-white border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition-all hover:shadow-lg hover:-translate-y-1 min-h-[250px] p-4 text-center">
             {/* Card Stack Container */}
             <div className="relative flex-1 flex items-center justify-center min-h-[160px]">
                {allMembers.slice(5, 9).map((member, index) => {
                   const stackStyles = [
                     "rotate-[-12deg] -translate-x-6 translate-y-1 opacity-70 scale-90",
                     "rotate-[-6deg] -translate-x-3 -translate-y-1 opacity-85 scale-95",
                     "rotate-[6deg] translate-x-3 translate-y-2 opacity-90 scale-95",
                     "rotate-0 z-10 shadow-lg scale-100 border-red-500/20"
                   ];
                   const styleClass = stackStyles[index] || "";
                   return (
                     <div
                       key={member._id.toString()}
                       className={`absolute w-[100px] h-[125px] bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:scale-105 ${styleClass}`}
                       style={{ zIndex: index }}
                     >
                       <div className="relative w-full h-[75%] bg-slate-50">
                         <Image
                           src={member.image_url}
                           alt={member.name}
                           fill
                           sizes="100px"
                           className="object-cover object-top"
                         />
                       </div>
                       <div className="h-[25%] flex items-center justify-center p-1 bg-white border-t border-slate-100">
                         <span className="text-[9px] font-bold text-slate-800 truncate block w-full text-center">
                           {member.name.split(" ")[0]}
                         </span>
                       </div>
                     </div>
                   );
                })}
             </div>
             
             {/* Text Label */}
             <div className="flex flex-col items-center gap-1.5 mt-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 group-hover:text-red-600 transition-colors">
                   See Full Team
                </span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-slate-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
             </div>
          </Link>
        </div>

        {/* Mobile View: Compact Avatar List */}
        <div className="sm:hidden flex flex-col gap-2">
          {teamMembers.map((member) => (
            <div key={member._id.toString()} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
              <Image
                src={member.image_url}
                alt={member.name}
                width={56}
                height={56}
                className="h-14 w-14 shrink-0 object-cover object-top ring-2 ring-slate-100"
                style={{ borderRadius: '50%' }}
              />
              <div className="flex flex-1 flex-col justify-center min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[14px] font-bold text-slate-900 truncate">
                    {member.name}
                  </h3>
                  {member.college && (
                    <span className="shrink-0 inline-flex items-center rounded bg-red-50 px-1 py-0.2 text-[8px] font-bold uppercase tracking-wider text-red-600 ring-1 ring-inset ring-red-600/10">
                      {member.college}
                    </span>
                  )}
                </div>
                <p className="text-[11px] font-medium text-slate-500 truncate">
                  {member.role || "Team Member"}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noreferrer" className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-[#0a66c2] transition hover:bg-slate-100">
                    <FaLinkedin size={12} />
                  </a>
                )}
                {member.instagram && (
                  <a href={member.instagram} target="_blank" rel="noreferrer" className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-50 border border-slate-200 text-[#e1306c] transition hover:bg-slate-100">
                    <FaInstagram size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}

          {/* See More Button Mobile */}
          <Link href="/iec-team" className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-red-700">
             View Full Team
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
