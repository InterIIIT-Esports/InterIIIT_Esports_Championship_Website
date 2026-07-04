export const metadata = {
  title: "BGMI | IEC Championship",
  description:
    "Battle for glory in the BGMI tournament at the Inter IIIT E-Sports Championship.",
};

export default function BGMILayout({ children }) {
  return (
    <main className="min-h-screen bg-black text-white">
      {children}
    </main>
  );
}