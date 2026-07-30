import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import CollegeRegistrationForm from "@/components/college-registration/CollegeRegistrationForm";

export const metadata = {
  title: "Register College | IEC Esports",
  description:
    "Register your college esports club for IEC Esports, the Inter IIIT Esports Championship by IIITians Network.",
  keywords: [
    "register college esports",
    "IIIT college registration",
    "Inter IIIT esports college",
    "IIITians Network college registration",
    "college esports club registration",
  ],
  alternates: {
    canonical: "/register-college",
  },
};

export default function RegisterCollegePage() {
  return (
    <main className="relative flex min-h-[100svh] flex-col overflow-hidden bg-black">
      <div className="fixed inset-0 z-0">
        <Image
          src="/register.png"
          alt="IEC esports background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        <div className="grunge-noise" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <Navbar />

        <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-12 sm:px-6 lg:py-20">
          <div className="mb-10 text-center">
            <h1 className="mb-3 text-3xl font-[family-name:var(--font-display)] tracking-wider text-white sm:text-5xl uppercase">
              Register Your <span className="text-red-600">College.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-sm font-medium text-gray-400 sm:text-base">
              Official clubs from participating IIITs must register their college for IEC.
              Every registration request will be reviewed by the IIITians Network admin.
            </p>
          </div>

          <CollegeRegistrationForm />
        </div>

        <Footer />
      </div>
    </main>
  );
}
