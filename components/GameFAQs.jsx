"use client";

import { useState } from "react";

const themes = {
  amber: {
    border: "border-amber-400/50",
    label: "text-amber-300",
    panel: "hover:bg-amber-400/[0.04]",
    icon: "text-amber-300",
  },
  red: {
    border: "border-red-500/50",
    label: "text-red-300",
    panel: "hover:bg-red-500/[0.04]",
    icon: "text-red-300",
  },
  blue: {
    border: "border-sky-400/50",
    label: "text-sky-300",
    panel: "hover:bg-sky-400/[0.04]",
    icon: "text-sky-300",
  },
};

export default function GameFAQs({ faqs = [], theme = "red" }) {
  const colors = themes[theme] || themes.red;
  const fallbackFaqs = [
    {
      question: "Who can participate?",
      answer:
        "Registered students from eligible IIIT teams can participate after completing the team registration process.",
    },
    {
      question: "Where will match updates be shared?",
      answer:
        "All match timings, lobby details, and important updates will be shared through official event channels.",
    },
    {
      question: "Can team members be changed later?",
      answer:
        "Roster changes are allowed only before verification closes and must be approved by the organizers.",
    },
  ];

  const items = faqs.length ? faqs : fallbackFaqs;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-black py-16 text-white sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className={`max-w-2xl border-l pl-4 ${colors.border}`}>
          <p className={`text-[10px] font-semibold uppercase tracking-[0.45em] ${colors.label}`}>
            FAQs
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            Player Questions
          </h2>
        </div>

        <div className="mt-10 divide-y divide-white/10 border border-white/10 bg-white/[0.03]">
          {items.map((faq, index) => {
            const open = openIndex === index;

            return (
              <div key={faq.question} className={`px-5 py-4 transition sm:px-6 ${colors.panel}`}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="text-sm font-medium leading-6 text-white sm:text-base">
                    {faq.question}
                  </span>
                  <span className={`text-lg ${open ? colors.icon : "text-white/45"}`}>
                    {open ? "-" : "+"}
                  </span>
                </button>

                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    open ? "grid-rows-[1fr] pt-3" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl text-sm leading-7 text-white/60 sm:text-[15px]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
