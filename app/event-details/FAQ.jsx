"use client";

import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "Who can participate in the tournament?",
      answer:
        "The tournament is open to all eligible college students. Each participant must register before the deadline.",
    },
    {
      question: "Is there any registration fee?",
      answer:
        "No, participation is completely free. Simply register your team through the registration portal.",
    },
    {
      question: "Which games are included?",
      answer:
        "The tournament features BGMI, Free Fire, and Valorant. Each game has its own format and schedule.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-black py-16 text-white sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl border-l border-white/20 pl-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.45em] text-white/40">
            FAQ
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm leading-7 text-white/55 sm:text-base">
            Clear answers for teams and participants before the event begins.
          </p>
        </div>

        <div className="mt-10 divide-y divide-white/10 border border-white/10 bg-white/[0.03]">
          {faqs.map((faq, index) => {
            const open = openIndex === index;

            return (
              <div key={faq.question} className="px-5 py-4 sm:px-6">
                <button
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="text-sm font-medium leading-6 text-white sm:text-base">
                    {faq.question}
                  </span>
                  <span className="text-lg text-white/45">
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
