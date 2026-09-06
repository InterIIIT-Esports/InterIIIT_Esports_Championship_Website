"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CurrentTeamPage() {
  const router = useRouter();

  const [team, setTeam] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  fetchCurrentTeam();
  fetchPendingRequests();
}, []);

  const fetchCurrentTeam = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login first.");
      }

      const res = await fetch("/api/team/current", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }

      setTeam(data.team);
      setCurrentUser(data.currentUser);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingRequests = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/team/request", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setRequests(data.requests);
    }
  } catch (err) {
    console.error(err);
  }
};

  const handleDeleteTeam = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this team?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/team/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }

      alert("Team deleted successfully!");

      router.push("/team");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLeaveTeam = async () => {
    const confirmLeave = window.confirm(
      "Are you sure you want to leave this team?"
    );

    if (!confirmLeave) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/team/leave", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message);
      }

      alert("You left the team successfully!");

      router.push("/team");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAcceptRequest = async (requestId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/team/request/accept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        requestId,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message);
    }

    alert("Player added successfully!");

    fetchCurrentTeam();
    fetchPendingRequests();

  } catch (err) {
    alert(err.message);
  }
};

const handleRemoveMember = async (memberId) => {
  const confirmRemove = window.confirm(
    "Are you sure you want to remove this player?"
  );

  if (!confirmRemove) return;

  try {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/team/remove-member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        memberId,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message);
    }

    alert("Member removed successfully!");

    fetchCurrentTeam();
  } catch (err) {
    alert(err.message);
  }
};

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#121212]">
        <h1 className="text-2xl text-white">Loading Team...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#121212]">
        <h1 className="text-xl text-red-500">{error}</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#121212] py-20">
      <div className="mx-auto max-w-4xl rounded-2xl border border-zinc-800 bg-[#1A1A1A] p-10">

        <h1 className="text-4xl font-bold text-white">
          {team.name}
        </h1>

        <p className="mt-2 text-gray-400">
          Game: {team.game}
        </p>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-white">
            Team Leader
          </h2>

          <div className="mt-4 rounded-xl bg-[#242424] p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-xl text-white">
                  👑 {team.leaderId.name}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-red-600/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-300">
                    {team.college}
                  </span>

                  <span className="text-sm text-gray-400 break-all">
                    {team.leaderId.collegeEmail}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white">
            Members
          </h2>

          <div className="mt-5 space-y-4">
            {team.members.map((member) => (
              <div
                key={member._id}
                className="flex items-center justify-between rounded-xl bg-[#242424] p-5"
              >
                <div>
                  <p className="text-lg text-white">
                    {member.userId.name}
                  </p>

                  <p className="text-sm text-gray-400">
                    {member.userId.collegeEmail}
                  </p>
                </div>

                <div className="flex items-center gap-3">

  <span className="rounded-full bg-red-600/20 px-4 py-1 text-sm text-red-400">
    {member.userId.role}
  </span>

  {currentUser?.role === "LEADER" &&
    member.userId._id !== currentUser.id && (
      <button
        onClick={() => handleRemoveMember(member.userId._id)}
        className="rounded-lg bg-red-600 px-3 py-1 text-sm font-semibold text-white hover:bg-red-700"
      >
        Remove
      </button>
    )}

</div>
              </div>
            ))}
          </div>
        </div>

            {currentUser?.role === "LEADER" && (
  <div className="mt-12">
    <h2 className="text-2xl font-semibold text-white">
      Pending Join Requests
    </h2>

    {requests.length === 0 ? (
      <p className="mt-4 text-gray-400">
        No pending requests.
      </p>
    ) : (
      <div className="mt-5 space-y-4">
        {requests.map((request) => (
          <div
            key={request._id}
            className="flex items-center justify-between rounded-xl bg-[#242424] p-5"
          >
            <div>
              <p className="text-lg text-white">
                {request.userId.name}
              </p>

              <p className="text-sm text-gray-400">
                {request.userId.collegeEmail}
              </p>
            </div>

            <button
              onClick={() => handleAcceptRequest(request._id)}
              className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
            >
              Accept
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
)}

        <div className="mt-10 flex justify-end">
          {currentUser?.role === "LEADER" ? (
            <button
              onClick={handleDeleteTeam}
              className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Delete Team
            </button>
          ) : (
            <button
              onClick={handleLeaveTeam}
              className="rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-white transition hover:bg-yellow-700"
            >
              Leave Team
            </button>
          )}
        </div>

      </div>
    </main>
  );
}
