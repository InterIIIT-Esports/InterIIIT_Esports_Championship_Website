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
            Core Team
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
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white truncate pr-2">
                    {member.role || "Team"}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center p-4 pt-3 text-center">
                <h3 className="text-[14px] font-bold text-[#0f172a] line-clamp-1">{member.name}</h3>
                <div className="mt-3 flex gap-3 shrink-0">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="text-[#0a66c2] hover:opacity-80 transition-opacity">
                      <FaLinkedin size={16} />
                    </a>
                  )}
                  {member.instagram && (
                    <a href={member.instagram} target="_blank" rel="noreferrer" className="text-[#e1306c] hover:opacity-80 transition-opacity">
                      <FaInstagram size={16} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}

          {/* See More Card Desktop */}
          <Link href="/iec-team" className="group flex flex-col justify-center items-center overflow-hidden rounded-[20px] bg-slate-100 border border-slate-200 border-dashed transition-all hover:bg-slate-200 hover:border-slate-300 min-h-[250px]">
             <div className="flex flex-col items-center justify-center p-6 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white mb-4 group-hover:scale-110 transition-transform">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
                <span className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  See Full Team
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
                <h3 className="text-[14px] font-bold text-slate-900 truncate">
                  {member.name}
                </h3>
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
