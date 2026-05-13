"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function WebsiteSettingsPage() {
  const [f, setF] = useState({ heroTitle: "", heroSubtitle: "", footerText: "", logo: "" });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/settings/website", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => d.website && setF({ ...f, ...d.website }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", credentials: "include", body: fd });
    const data = await res.json();
    setUploading(false);
    if (res.ok) {
      setF((prev) => ({ ...prev, logo: data.url }));
      toast.success("Logo uploaded");
    } else toast.error("Upload failed");
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/settings/website", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    if (!res.ok) toast.error("Save failed");
    else toast.success("Website settings saved");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-4xl font-semibold text-zinc-100">Website settings</h1>
      <form onSubmit={save} className="sacred-card space-y-4 p-6">
        <label className="block text-sm font-medium text-zinc-400">
          Hero title
          <input className="sacred-input mt-1" value={f.heroTitle} onChange={(e) => setF({ ...f, heroTitle: e.target.value })} required />
        </label>
        <label className="block text-sm font-medium text-zinc-400">
          Hero subtitle
          <textarea className="sacred-input mt-1" value={f.heroSubtitle} onChange={(e) => setF({ ...f, heroSubtitle: e.target.value })} required />
        </label>
        <label className="block text-sm font-medium text-zinc-400">
          Footer text
          <textarea className="sacred-input mt-1" value={f.footerText} onChange={(e) => setF({ ...f, footerText: e.target.value })} required />
        </label>
        <div>
          <p className="text-sm font-medium text-zinc-400">Logo</p>
          <input type="file" accept="image/*" className="mt-2 text-base text-zinc-400" onChange={onLogo} />
          {f.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={f.logo} alt="" className="mt-3 h-16 w-auto rounded border border-amber-500/20" />
          ) : null}
        </div>
        <button type="submit" className="sacred-btn" disabled={uploading}>
          Save
        </button>
      </form>
    </div>
  );
}
