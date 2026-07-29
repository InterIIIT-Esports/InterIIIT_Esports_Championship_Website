import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import JoinIECForm from "@/components/join-iec/JoinIECForm";

export const metadata = {
  title: "Join the IEC Team | IEC Esports",
  description: "Apply to be part of the organizing team behind India's largest Inter-IIIT Esports Championship",
};

export default function JoinIECPage() {
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
              Join The <span className="text-red-600">IEC Team.</span>
            </h1>
            <p className="mx-auto max-w-2xl text-sm font-medium text-gray-400 sm:text-base">
              Apply to be part of the organizing team behind India&apos;s largest Inter-IIIT Esports Championship.
            </p>
          </div>

          <JoinIECForm />
        </div>

        <Footer />
      </div>
    </main>
  );
}
