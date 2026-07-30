"use client";

import { motion } from "framer-motion";
import { Download, ChevronRight, Mail } from "lucide-react";

export default function EventIntro() {
  const organisers = [
    {
      name: "IIITians Network",
      role: "Founder",
      logo: "/logos/iiitians-network.png",
      email: "iiitians.network@gmail.com",
      social: {
        instagram: "https://www.instagram.com/iiitiansnetwork",
        discord: "https://discord.gg/iiitiansnetwork",
      },
    },
    {
      name: "Clutch IIIT Kota",
      role: "Organising Partner BGMI",
      logo: "/logos/clutch.jpg",
      email: "clutch.iiitkota@gmail.com",
      social: {
        instagram: "https://www.instagram.com/clutch.iiitkota",
        discord: "https://discord.gg/clutchiiitkota",
      },
    },
    {
      name: "Synergy IIIT Nagpur",
      role: "Organising Partner Valo",
      logo: "/logos/synergy.png",
      email: "synergy.iiitnagpur@gmail.com",
      social: {
        instagram: "https://www.instagram.com/synergy.iiitnagpur",
        discord: "https://discord.gg/synergyiiitnagpur",
      },
    },
    {
      name: "Sports Club IIIT Kalyani",
      role: "Community Partner FF",
      logo: "/logos/SportsClubKalyani.jpg",
      email: "sportsclub.iiitkalyani@gmail.com",
      social: {
        instagram: "https://www.instagram.com/sportsclub.iiitkalyani",
        discord: "https://discord.gg/sportsclubiiitkalyani",
      },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section className="relative overflow-hidden bg-black md:h-screen flex justify-center items-center py-12 lg:py-24 text-white">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-900/10 blur-[100px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-start">
          {/* Left Column: Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-4">
              <p className="text-[0.5rem] sm:text-xs tracking-[0.25em] uppercase text-slate-400 font-medium mb-1">
                About
              </p>
              <h2 className="text-3xl lg:text-6xl font-[family-name:var(--font-display)] tracking-wide text-white leading-none">
                What is IEC?
              </h2>
              {/* <div className="mt-2 h-[2px] w-12 bg-red-600" /> */}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="space-y-3 text-xs sm:text-base text-slate-300/80 leading-relaxed"
            >
              <p>
                The <strong>Inter-IIIT Esports Championship (IEC)</strong> is a
                nationwide esports competition uniting students from IIITs
                across India through professional gaming and healthy
                competition.
                
                Organised by{" "}
                <strong>
                  <a
                    href="https://iiitiansnetwork.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    IIITians Network
                  </a>
                </strong>
                , in collaboration with gaming and student clubs across IIITs,
                IEC delivers professionally managed tournaments, high production
                quality, and a platform for collaboration across campuses.
              
                Featuring <strong>BGMI</strong>, <strong>Valorant</strong>, and{" "}
                <strong>Free Fire</strong>, the championship combines online
                qualifiers, competitive league stages, and exciting grand finals
                into one unified esports experience.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="mt-8 flex w-full flex-row flex-nowrap items-center justify-start gap-2 sm:w-auto  sm:gap-3"
            >
              <a
                href="/register"
                className="group relative hidden sm:flex flex-none items-left justify-start gap-1.5 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-500 whitespace-nowrap"
              >
                <span>Register Now</span>
                
              </a>

              <a
                href="/docs/IEC_Brochure_Final.pdf"
                className="group flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 sm:px-5 sm:py-2.5 text-[13px] sm:text-sm font-semibold text-white transition-all hover:bg-white/10 whitespace-nowrap"
              >
                <Download
                  size={14}
                  className="sm:w-4 sm:h-4 text-slate-400 transition-colors group-hover:text-white"
                />
                <span className="sm:hidden">Brochure</span>
                <span className="hidden sm:inline">Download Brochure</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Partners */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="relative"
          >
            <motion.div variants={itemVariants} className="mb-5">
              <p className="text-[0.5rem] sm:text-xs tracking-[0.25em] uppercase text-slate-400 font-medium mb-1">
                Partners
              </p>
              <h3 className="text-3xl font-[family-name:var(--font-display)] tracking-wide text-white leading-none">
                Official Partners
              </h3>
            </motion.div>

            <div className="grid grid-cols-4 sm:grid-cols-2 gap-1 sm:gap-3">
              {organisers.map((item, idx) => (
                <motion.div
                  variants={itemVariants}
                  key={item.name}
                  className="group relative flex flex-col overflow-hidden sm:rounded-xl sm:border border-white/5  p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-500/30 hover:bg-slate-800/60"
                >
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="mx-auto h-14 object-contain mb-3 transition-transform duration-300 group-hover:scale-105"
                  />

                  <h4 className="text-left sm:text-center text-[10px] font-semibold text-slate-100 sm:text-sm line-clamp-1">
                    {item.name}
                  </h4>

                  <p className="mt-1  text-left sm:text-center text-[8px] font-medium uppercase tracking-wider text-slate-400 line-clamp-1">
                    {item.role}
                  </p>

                  {/* Social Icons */}
                  <div className="mt-3 flex items-center justify-center gap-2">
                    {/* Instagram */}
                    <a
                      href={item.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Instagram"
                      className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>

                    {/* Discord */}
                    <a
                      href={item.social.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Discord"
                      className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.101 18.08.114 18.102.136 18.116a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                    </a>

                    {/* Email */}
                    <a
                      href={`mailto:${item.email}`}
                      title={item.email}
                      className="flex h-6 w-6 items-center justify-center rounded-md bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-white"
                    >
                      <Mail size={11} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

