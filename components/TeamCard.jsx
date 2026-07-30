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
        <div className="absolute left-2 top-2 z-20 flex gap-1.5 sm:left-3 sm:top-3 sm:gap-2">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex h-6 w-6 items-center justify-center text-[#0a66c2] transition-opacity hover:opacity-80 sm:h-8 sm:w-8"
            >
              <FaLinkedin className="h-3 w-3 sm:h-4 sm:w-4" />
            </a>
          )}
          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noreferrer"
              className="flex h-6 w-6 items-center justify-center text-[#e1306c] transition-opacity hover:opacity-80 sm:h-8 sm:w-8"
            >
              <FaInstagram className="h-3 w-3 sm:h-4 sm:w-4" />
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
        {member.college && (
          <span className="mt-1 inline-flex items-center rounded-md bg-red-50 px-1.5 py-0.5 text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-red-600 ring-1 ring-inset ring-red-600/10">
            {member.college}
          </span>
        )}
      </div>
    </article>
  );
}
