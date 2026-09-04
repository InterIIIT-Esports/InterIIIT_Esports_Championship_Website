"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";
import CollegeCard from "@/components/college-registration/CollegeCard";
import CollegeTeamsModal from "@/components/college-registration/CollegeTeamsModal";
import TeamDetailsModal from "@/components/TeamDetailsModal";

export default function ParticipatingCollegesPage() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [isCollegeModalOpen, setIsCollegeModalOpen] = useState(false);

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);

  useEffect(() => {
    async function fetchColleges() {
      try {
        const res = await fetch("/api/college-requests?limit=100", { cache: "no-store" }); // Fetch approved by default
        const data = await res.json();
        if (data.success) {
          setColleges(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch colleges:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchColleges();
  }, []);

  const filteredColleges = colleges.filter((c) =>
    c.college_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.club_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenTeams = (college) => {
    setSelectedCollege(college);
    setIsCollegeModalOpen(true);
  };

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
    setIsTeamModalOpen(true);
  };

  return (
    <main className="relative flex min-h-[100svh] flex-col overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 via-white to-gray-50 opacity-80" />
        <div className="grunge-noise opacity-30" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col">
        <Navbar />

        <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:py-20">
          <div className="mb-8 sm:mb-12 flex flex-col items-center justify-between gap-4 sm:gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="mb-2 sm:mb-3 text-3xl font-[family-name:var(--font-display)] tracking-wider text-slate-900 sm:text-5xl uppercase">
                Participating <span className="text-red-600">Colleges.</span>
              </h1>
              <p className="max-w-2xl text-[13px] leading-relaxed font-medium text-gray-500 sm:text-base">
                Discover the official esports clubs representing IIITs across India in the upcoming championship.
              </p>
            </div>

            <div className="relative w-full max-w-sm">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search colleges or clubs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white shadow-sm py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition-colors focus:border-red-500 focus:bg-gray-50 placeholder:text-gray-400"
              />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="h-36 sm:h-48 animate-pulse rounded-xl bg-gray-100" />
              ))}
            </div>
          ) : filteredColleges.length > 0 ? (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {filteredColleges.map((college) => (
                <CollegeCard key={college._id} college={college} onOpenTeams={handleOpenTeams} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full border border-gray-200 bg-gray-50 shadow-sm p-6 text-gray-400">
                <Search size={48} />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">No colleges found</h3>
              <p className="text-gray-500">
                {searchQuery
                  ? `No results for "${searchQuery}". Try a different search term.`
                  : "No colleges have been approved yet. Check back later!"}
              </p>
            </div>
          )}

          {/* CTA Banner */}
          <div className="border border-dashed border-red-300 bg-red-50/50 rounded-xl p-6 sm:p-8 text-center mt-8 sm:mt-12">
            <h2 className="mb-1 sm:mb-2 text-xl sm:text-2xl font-bold text-slate-900">
              Can&apos;t find your college here?
            </h2>
            <p className="mb-4 sm:mb-6 text-[13px] sm:text-base text-gray-600">
              If your IIIT isn&apos;t listed, you can register your college&apos;s esports club to participate.
            </p>
            <Link
              href="/register-college"
              className="inline-block bg-red-600 hover:bg-red-500 text-white rounded-lg px-4 py-2 text-[12px] sm:text-[14px] sm:px-6 sm:py-3 font-semibold transition-colors"
            >
              Register Your College →
            </Link>
          </div>
        </div>

        {/* Modal for College Qualified Teams */}
        <CollegeTeamsModal
          isOpen={isCollegeModalOpen}
          onClose={() => setIsCollegeModalOpen(false)}
          college={selectedCollege}
          onSelectTeam={handleSelectTeam}
        />

        {/* Modal for Team Details */}
        <TeamDetailsModal
          isOpen={isTeamModalOpen}
          onClose={() => setIsTeamModalOpen(false)}
          team={selectedTeam}
        />

        <Footer />
      </div>
    </main>
  );
}
