import Image from "next/image";
import { FaLinkedin, FaInstagram } from "react-icons/fa";

export default function TeamCard({ member }) {
  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-sm sm:rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="relative aspect-[4/5] w-full bg-slate-100 overflow-hidden">
        <Image
          src={member.image_url}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 50vw"
          className="object-cover object-top transition duration-500 group-hover:scale-105 overflow-hidden"
        />
        <div className="flex p-2 gap-1 sm:gap-2 shrink-0">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[#0a66c2] hover:opacity-80 transition-opacity bg-white/10 rounded-sm p-0.5 backdrop-blur-sm"
            >
              <FaLinkedin className="w-3 h-3 sm:w-5 sm:h-5" />
            </a>
          )}
          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-[#e1306c] hover:opacity-80 transition-opacity bg-white/10 rounded-sm p-0.5 backdrop-blur-sm"
            >
              <FaInstagram className="w-3 h-3 sm:w-5 sm:h-5" />
            </a>
          )}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute bottom-2 left-2 right-2 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-1 xl:gap-0">
          <span className="text-[7px] sm:text-[10px] font-bold uppercase tracking-wider text-white truncate pr-1 sm:pr-2">
            {member.role || "CONTENT TEAM"}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center p-2 pt-2 sm:p-5 sm:pt-4 text-center">
        <h3 className="text-[10px] sm:text-[15px] font-bold text-[#0f172a] line-clamp-1">
          {member.name}
        </h3>
        {/* <p className="mt-0.5 text-[11px] font-medium text-slate-500 uppercase line-clamp-1">
          {member.college || "IIIT"}
        </p> */}
      </div>
    </article>
  );
}
