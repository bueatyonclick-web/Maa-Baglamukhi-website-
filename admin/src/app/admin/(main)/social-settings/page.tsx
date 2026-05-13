"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SocialSettingsPage() {
  const [f, setF] = useState({
    instagram: "",
    facebook: "",
    youtube: "",
    whatsapp: "",
    twitter: "",
  });

  useEffect(() => {
    fetch("/api/settings/social", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => d.social && setF({ ...f, ...d.social }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/settings/social", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    if (!res.ok) toast.error("Save failed");
    else toast.success("Social links saved");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-4xl font-semibold text-zinc-100">Social media</h1>
      <form onSubmit={save} className="sacred-card space-y-4 p-6">
        {(["instagram", "facebook", "youtube", "whatsapp", "twitter"] as const).map((k) => (
          <label key={k} className="block text-sm font-medium capitalize text-zinc-400">
            {k}
            <input className="sacred-input mt-1" value={f[k] || ""} onChange={(e) => setF({ ...f, [k]: e.target.value })} />
          </label>
        ))}
        <button type="submit" className="sacred-btn">
          Save
        </button>
      </form>
    </div>
  );
}
