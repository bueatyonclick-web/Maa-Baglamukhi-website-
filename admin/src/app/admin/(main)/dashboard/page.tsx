"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Stats = {
  totals: { bookings: number; messages: number; gallery: number; donations: number };
  recentBookings: Array<{
    id: string;
    userName: string;
    status: string;
    createdAt: string;
    package: { title: string };
  }>;
  recentMessages: Array<{ id: string; name: string; email: string; createdAt: string; isRead: boolean }>;
  chart: Array<{ key: string; label: string; bookings: number }>;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats", { credentials: "include" })
      .then((r) => r.json())
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  if (!stats) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="sacred-card h-28 animate-pulse bg-zinc-900/50" />
        ))}
      </div>
    );
  }

  const cards = [
    { label: "Bookings", value: stats.totals.bookings },
    { label: "Messages", value: stats.totals.messages },
    { label: "Gallery", value: stats.totals.gallery },
    { label: "Donations", value: stats.totals.donations },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-semibold text-zinc-100">Dashboard</h1>
        <p className="text-base text-zinc-400">Overview of temple digital activity</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="sacred-card p-6">
            <p className="font-cinzel text-xs tracking-[0.22em] text-amber-500/85">{c.label}</p>
            <p className="mt-2 text-4xl font-semibold text-amber-100">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="sacred-card p-6">
          <h2 className="text-xl font-semibold text-zinc-100">Bookings (6 months)</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.chart}>
                <XAxis dataKey="label" stroke="#a1a1aa" fontSize={14} />
                <YAxis stroke="#a1a1aa" fontSize={14} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    background: "#18181b",
                    border: "1px solid rgba(245,158,11,0.3)",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="bookings" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="sacred-card p-6">
          <h2 className="text-xl font-semibold text-zinc-100">Recent bookings</h2>
          <ul className="mt-4 space-y-3 text-base">
            {stats.recentBookings.map((b) => (
              <li
                key={b.id}
                className="flex justify-between border-b border-zinc-800/80 pb-2 text-zinc-300"
              >
                <span>{b.userName}</span>
                <span className="text-amber-500/80">{b.status}</span>
              </li>
            ))}
            {stats.recentBookings.length === 0 ? (
              <li className="text-zinc-400">No bookings yet.</li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="sacred-card p-6">
        <h2 className="text-xl font-semibold text-zinc-100">Recent messages</h2>
        <ul className="mt-4 space-y-3 text-base">
          {stats.recentMessages.map((m) => (
            <li key={m.id} className="flex justify-between border-b border-zinc-800/80 pb-2">
              <span className="text-zinc-300">
                {m.name} <span className="text-zinc-400">{m.email}</span>
              </span>
              <span className={m.isRead ? "text-zinc-500" : "text-amber-400"}>
                {m.isRead ? "Read" : "New"}
              </span>
            </li>
          ))}
          {stats.recentMessages.length === 0 ? (
            <li className="text-zinc-400">No messages.</li>
          ) : null}
        </ul>
      </div>
    </div>
  );
}
