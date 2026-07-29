"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      question: "Who can participate in the tournament?",
      answer: "The tournament is strictly for college students currently enrolled in any IIIT across India. Furthermore, your IIIT must be officially registered and approved on our platform. You will need to verify your student status using your official college email ID.",
    },
    {
      question: "Can I participate in multiple games?",
      answer: "No. A single user can only join and play for ONE team. Furthermore, a single team can only register and participate in ONE game. If you wish to play a different game, you must leave or delete your current team and join another one.",
    },
    {
      question: "My college is not registered. How do I register my college?",
      answer: "If your college is not on the participating list, a representative from your official college esports club (or a student coordinator) must visit the 'College Registration' page on our website, fill out the details, and wait for admin approval.",
    },
    {
      question: "Is there any registration fee?",
      answer: "No, participation in the Inter-IIIT Esports League is completely free of charge.",
    },
    {
      question: "What is the format of the tournament?",
      answer: "The tournament consists of online qualifiers followed by semi-finals and a grand finale. Specific formats vary by game and will be announced on the official Discord server.",
    },
    {
      question: "Do I need to be in the same college as my teammates?",
      answer: "Yes, all team members must be enrolled in the same IIIT to represent their college. Mixed-college teams are not permitted.",
    },
    {
      question: "How are the prize pools distributed?",
      answer: "Prize pools will be distributed among the top 3 teams for each game. The specific breakdown will be shared on our Discord server before the semi-finals.",
    },
    {
      question: "How do I join the official Discord server?",
      answer: "Once your team is registered and verified, the official Discord link will be available on your team dashboard and sent to your registered email.",
    },
    {
      question: "Are emulators allowed for mobile games?",
      answer: "No, emulators are strictly prohibited for BGMI and Free Fire. Any player found using an emulator will result in immediate disqualification of their entire team.",
    },
    {
      question: "Can we change our team roster after registration?",
      answer: "Rosters can be modified only before the registration deadline. Once the tournament brackets are locked, no roster changes or substitutions are allowed.",
    },
    {
      question: "What happens if a player disconnects during a match?",
      answer: "If a player disconnects, the game will be paused (if the game supports it) for a maximum of 10 minutes. If the player cannot reconnect within the allotted time, the team must continue playing shorthanded.",
    },
    {
      question: "Do we need to stream or record our matches?",
      answer: "Recording is not mandatory for early qualifiers, but semi-finals and finals may require at least one player from each team to record their POV for fair play verification.",
    },
    {
      question: "How do we report match scores?",
      answer: "After the match concludes, the winning team's captain must immediately submit a screenshot of the end-game scoreboard in the designated Discord channel for verification.",
    },
    {
      question: "What happens if the opposing team doesn't show up?",
      answer: "Teams are given a strict 15-minute grace period from the scheduled start time. If the opposing team fails to show up, your team will be awarded a default win (walkover).",
    },
    {
      question: "Can B.Tech and M.Tech students from the same IIIT play together?",
      answer: "Yes, as long as all players are currently enrolled students of the same registered IIIT, any mix of degree programs (B.Tech, M.Tech, PhD) is allowed.",
    },
    {
      question: "Are iPads or tablets allowed for BGMI or Free Fire?",
      answer: "No, the mobile tournaments are strictly for smartphones. iPads, tablets, and any similar large-screen devices are not permitted to ensure a level playing field.",
    },
    {
      question: "Who do I contact for technical issues on the website?",
      answer: "You can visit the 'Contact' page on our website to submit a support ticket, use the WhatsApp button for urgent issues, or ping our moderators directly on the Discord server.",
    },
  ];

  return (
    <section className="relative py-10 sm:py-12 lg:py-16 bg-black text-white">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-6 sm:mb-8">
          {/* <p className="text-[0.5rem] sm:text-xs tracking-[0.25em] uppercase text-slate-400 font-medium mb-1">Help</p> */}
          <h2 className="text-3xl sm:text-6xl font-[family-name:var(--font-display)] tracking-wide text-white leading-none uppercase">
            FAQ<span className="text-red-600">S.</span>
          </h2>
          {/* <p className="mt-2 text-[11px] sm:mt-3 sm:text-sm text-slate-400">
            Got questions? We&apos;ve got answers.
          </p> */}
        </div>

        <div className="space-y-2 sm:space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/5 bg-white/[0.02] overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex w-full items-center justify-between p-3 sm:p-5 text-left"
              >
                <span className="font-semibold text-[13px] sm:text-base text-slate-200">
                  {faq.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-slate-400 transition-transform duration-300 ${
                    openIdx === idx ? "rotate-180 text-red-500" : ""
                  }`}
                />
              </button>
              
              <div
                className={`px-3 sm:px-5 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIdx === idx ? "max-h-40 pb-4 sm:pb-5 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-[11px] sm:text-sm text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


