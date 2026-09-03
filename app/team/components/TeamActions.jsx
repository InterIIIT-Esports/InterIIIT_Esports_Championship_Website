"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check, X as XIcon } from "lucide-react";
import { toast } from "sonner";

import CreateTeamCard from "./CreateTeamCard";
import JoinTeamCard from "./JoinTeamCard";
import CurrentTeamCard from "./CurrentTeamCard";
import CreateTeamModal from "./CreateTeamModal";
import JoinTeamModal from "./JoinTeamModal";

export default function TeamActions() {
  const [openModal, setOpenModal] = useState(false);
  const [joinModal, setJoinModal] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [invitations, setInvitations] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch("/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
          if (data.user.teamId) {
            router.push("/team/current");
            return;
          } else {
            fetch("/api/team/invitations", {
              headers: { Authorization: `Bearer ${token}` }
            })
            .then(r => r.json())
            .then(invData => {
              if (invData.success) setInvitations(invData.invitations);
            })
            .catch(() => {});
          }
        }
      } catch (err) {
        console.error("Failed to fetch user state", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleCardClick = (action) => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }
    action();
  };

  const handleRespond = async (invitationId, accept) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/team/invite/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ invitationId, accept }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(accept ? "Joined team successfully!" : "Invitation declined");
        if (accept) {
          router.push("/team/current");
        } else {
          setInvitations(invitations.filter(inv => inv._id !== invitationId));
        }
      } else {
        toast.error(data.message || "Failed to respond");
      }
    } catch {
      toast.error("Failed to respond");
    }
  };

  return (
    <>
      <section id="team-actions" className="bg-black min-h-[calc(100vh-140px)] flex flex-col justify-center pt-20 pb-16 border-b border-white/10 relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-0 h-px bg-red-600/60" />
        <div className="absolute right-0 top-0 h-72 w-72 bg-red-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl w-full">
          {loading ? (
            <div className="flex h-48 w-full items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Loader2 className="h-8 w-8 animate-spin text-red-500" />
            </div>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              {!user?.teamId && (
                <div className="text-center px-4 py-6 max-w-2xl mx-auto">
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide">
                    Team Registrations Are Closed Now
                  </h2>
                  <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed">
                    Public team registration is currently closed. If your squad needs to be added, please contact a tournament administrator.
                  </p>
                </div>
              )}
              {/* Create/Join Team cards hidden while registration is closed
              <div className="grid gap-4 md:grid-cols-2">
                {!user?.teamId && (
                  <>
                    <CreateTeamCard onClick={() => handleCardClick(() => setOpenModal(true))} />
                    <JoinTeamCard onClick={() => handleCardClick(() => setJoinModal(true))} />
                  </>
                )}
              </div>
              */}
            </div>
          )}

          {!loading && invitations.length > 0 && (
            <div className="mt-12 max-w-4xl mx-auto">
              <h3 className="mb-4 text-xl font-semibold">Pending Invitations</h3>
              <div className="flex flex-col gap-3">
                {invitations.map(inv => (
                  <div key={inv._id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                    <div>
                      <p className="font-medium text-lg text-white">{inv.teamId?.name || "Unknown Team"}</p>
                      <p className="text-sm text-gray-400">Invited by {inv.inviterId?.name}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleRespond(inv._id, true)} className="flex items-center gap-1.5 rounded-lg bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400 hover:bg-green-500/30 transition-colors">
                        <Check size={16} /> Accept
                      </button>
                      <button onClick={() => handleRespond(inv._id, false)} className="flex items-center gap-1.5 rounded-lg bg-red-500/20 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/30 transition-colors">
                        <XIcon size={16} /> Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {openModal ? <CreateTeamModal onClose={() => setOpenModal(false)} /> : null}
      {joinModal ? <JoinTeamModal onClose={() => setJoinModal(false)} /> : null}
    </>
  );
}
