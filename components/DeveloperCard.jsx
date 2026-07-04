import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Globe } from "lucide-react";

export default function DeveloperCard({
  image,
  name,
  role,
  quote,
  github,
  linkedin,
  website,
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(239,68,68,0.18)]">
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-xl font-bold text-white">{name}</h3>

          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-red-400">
            {role}
          </p>
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-slate-400">
          {quote}
        </p>

        {/* Divider */}
        <div className="h-px w-full bg-white/10" />

        {/* Social Links */}
        <div className="flex items-center gap-3">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-lg border border-white/10 p-2 text-slate-400 transition-all duration-300 hover:border-red-500 hover:bg-red-500/10 hover:text-red-400"
            >
              <FaGithub size={18} />
            </a>
          )}

          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-lg border border-white/10 p-2 text-slate-400 transition-all duration-300 hover:border-red-500 hover:bg-red-500/10 hover:text-red-400"
            >
              <FaLinkedin size={18} />
            </a>
          )}

          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
              className="rounded-lg border border-white/10 p-2 text-slate-400 transition-all duration-300 hover:border-red-500 hover:bg-red-500/10 hover:text-red-400"
            >
              <Globe size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}