"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ContactSettingsPage() {
  const [f, setF] = useState({
    templeName: "",
    address: "",
    phone1: "",
    phone2: "",
    whatsapp: "",
    email: "",
    googleMapLink: "",
  });

  useEffect(() => {
    fetch("/api/settings/contact", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => d.settings && setF({ ...f, ...d.settings }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/settings/contact", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    if (!res.ok) toast.error("Save failed");
    else toast.success("Contact settings saved");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-4xl font-semibold text-zinc-100">Contact settings</h1>
      <form onSubmit={save} className="sacred-card space-y-4 p-6">
        {(
          [
            ["templeName", "Temple name"],
            ["address", "Address"],
            ["phone1", "Phone 1"],
            ["phone2", "Phone 2"],
            ["whatsapp", "WhatsApp"],
            ["email", "Email"],
            ["googleMapLink", "Google Maps link"],
          ] as const
        ).map(([k, label]) => (
          <label key={k} className="block text-sm font-medium text-zinc-400">
            {label}
            <input
              className="sacred-input mt-1"
              value={f[k] || ""}
              onChange={(e) => setF({ ...f, [k]: e.target.value })}
            />
          </label>
        ))}
        <button type="submit" className="sacred-btn">
          Save
        </button>
      </form>
    </div>
  );
}
