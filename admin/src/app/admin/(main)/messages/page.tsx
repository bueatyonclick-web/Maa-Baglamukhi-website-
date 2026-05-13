"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type Msg = { id: string; name: string; email: string; phone: string | null; message: string; isRead: boolean; createdAt: string };

export default function MessagesAdminPage() {
  const [items, setItems] = useState<Msg[]>([]);
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    const q = new URLSearchParams({ limit: "30" });
    if (search.trim()) q.set("search", search.trim());
    const res = await fetch(`/api/messages?${q}`, { credentials: "include" });
    const data = await res.json();
    setItems(data.items || []);
  }, [search]);

  useEffect(() => {
    load();
  }, [load]);

  async function markRead(id: string, isRead: boolean) {
    await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead }),
    });
    load();
  }

  async function del(id: string) {
    if (!confirm("Delete message?")) return;
    await fetch(`/api/messages/${id}`, { method: "DELETE", credentials: "include" });
    toast.success("Removed");
    load();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-semibold text-zinc-100">Contact messages</h1>
        <p className="text-base text-zinc-400">From the public contact form</p>
      </div>
      <div className="flex gap-3">
        <input
          className="sacred-input max-w-md"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="button" className="sacred-btn" onClick={() => load()}>
          Search
        </button>
      </div>
      <div className="space-y-4">
        {items.map((m) => (
          <div key={m.id} className={`sacred-card p-5 ${m.isRead ? "opacity-80" : "ring-1 ring-amber-500/30"}`}>
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="text-lg font-medium text-zinc-100">{m.name}</p>
                <p className="text-sm text-zinc-400">{m.email}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="sacred-btn-ghost !px-4 !py-2 text-sm" onClick={() => markRead(m.id, !m.isRead)}>
                  {m.isRead ? "Mark unread" : "Mark read"}
                </button>
                <button type="button" className="rounded-full border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:bg-red-950/40" onClick={() => del(m.id)}>
                  Delete
                </button>
              </div>
            </div>
            <p className="mt-4 text-base leading-relaxed text-zinc-200">{m.message}</p>
            <p className="mt-3 text-sm text-zinc-500">{new Date(m.createdAt).toLocaleString()}</p>
          </div>
        ))}
        {items.length === 0 ? <p className="text-base text-zinc-400">No messages.</p> : null}
      </div>
    </div>
  );
}
