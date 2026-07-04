"use client";

import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";

import Hero from "./components/Hero";
import SupportCategories from "./components/SupportCategories";
import ContactForm from "./components/ContactForm";
import ContactCards from "./components/ContactCards";
import EmergencyHelp from "./components/EmergencyHelp";

// import Footer from "@/components/Footer";

export default function SupportPage() {
  return (
    <StarsBackground className="min-h-screen w-full">
      <Hero />
      <SupportCategories />
      <ContactForm />
      <ContactCards />
      <EmergencyHelp />

      {/* <Footer /> */}
    </StarsBackground>
  );
}