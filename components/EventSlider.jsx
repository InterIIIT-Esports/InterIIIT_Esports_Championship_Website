"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function EventSlider({
  slides = [],
  title = "India's Biggest",
  subtitle = "Inter-IIIT Esports League",
  description = "",
  primaryBtn = {
    text: "Register Now",
    href: "/register",
  },
  secondaryBtn = {
    text: "Event Details",
    href: "/event-details",
  },
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <section className="bg-slate-950 text-white">
      {/* Banner */}
      <div className="relative overflow-hidden">
        <section className="relative bg-slate-950 overflow-hidden">
          {/* Changing Banner */}
          <img
            src={slides[active].image}
            alt={slides[active].title || title}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-100/10 to-transparent" />

          {/* Content */}
          <div className="relative mx-auto max-w-7xl min-h-[650px] flex items-center px-6">
            <div className="max-w-xl">
              {/* <p className="uppercase tracking-[0.35em] text-white text-sm mb-4">
                INTER IIIT ESPORTS CHAMPIONSHIP
              </p> */}

              <h1 className="text-4xl md:text-5xl font-black leading-tight">
                {title}
                <span className="block text-3xl md:text-4xl text-white">
                  {subtitle}
                </span>
              </h1>

              <p className="mt-6 text-lg text-gray-300">
                {description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={primaryBtn.href}
                  className="rounded bg-red-600 px-6 py-3 font-semibold hover:bg-red-500"
                >
                  {primaryBtn.text}
                </Link>

                <Link
                  href={secondaryBtn.href}
                  className="rounded border border-white/20 bg-white/10 px-6 py-3 font-semibold hover:border-red-500"
                >
                  {secondaryBtn.text}
                </Link>
              </div>

              {/* Indicators */}
              <div className="mt-10 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActive(index)}
                    className={`h-2 rounded-full transition-all ${
                      active === index ? "w-2 bg-white" : "w-2 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-200/10 to-transparent" />
      </div>
    </section>
  );
}