"use client";

import { StarsBackground } from "@/components/animate-ui/components/backgrounds/stars";
import RegisterCard from "@/components/RegisterCard";

export default function RegisterPage() {
  return (
    <main className="h-screen">
      <StarsBackground className="h-full w-full">
        <div className="relative z-10 flex h-full items-center justify-center">
          <RegisterCard />
        </div>
      </StarsBackground>
    </main>
  );
}