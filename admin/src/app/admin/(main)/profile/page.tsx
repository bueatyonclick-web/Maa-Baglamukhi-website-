"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ProfilePage() {
  const [admin, setAdmin] = useState<{ name: string; email: string } | null>(null);
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    fetch("/api/admin/me", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => {
        if (d.admin) {
          setAdmin(d.admin);
          setName(d.admin.name);
        }
      });
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const body: Record<string, string> = { name };
    if (newPassword) {
      body.currentPassword = currentPassword;
      body.newPassword = newPassword;
    }
    const res = await fetch("/api/admin/profile", {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.error || "Update failed");
      return;
    }
    toast.success("Profile updated");
    setAdmin(data.admin);
    setCurrentPassword("");
    setNewPassword("");
  }

  if (!admin) return <div className="text-base text-zinc-400">Loading…</div>;

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="text-4xl font-semibold text-zinc-100">Admin profile</h1>
      <form onSubmit={save} className="sacred-card space-y-4 p-6">
        <p className="text-base text-zinc-400">Signed in as {admin.email}</p>
        <label className="block text-sm font-medium text-zinc-400">
          Display name
          <input className="sacred-input mt-1" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label className="block text-sm font-medium text-zinc-400">
          Current password (required to change password)
          <input
            type="password"
            className="sacred-input mt-1"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-zinc-400">
          New password (min 8 chars)
          <input
            type="password"
            className="sacred-input mt-1"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <button type="submit" className="sacred-btn w-full">
          Save changes
        </button>
      </form>
    </div>
  );
}
