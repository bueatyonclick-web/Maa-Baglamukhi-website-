"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function WebsiteSettingsPage() {
  const [f, setF] = useState({
    heroTitle: "",
    heroSubtitle: "",
    footerText: "",
    logo: "",
    panditProfileImage: "",
  });
  const [uploading, setUploading] = useState(false);
  const [uploadingPandit, setUploadingPandit] = useState(false);

  useEffect(() => {
    fetch("/api/settings/website", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => d.website && setF({ ...f, ...d.website }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function uploadImage(
    e: React.ChangeEvent<HTMLInputElement>,
    field: "logo" | "panditProfileImage",
    setBusy: (v: boolean) => void,
    successMsg: string,
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", credentials: "include", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setF((prev) => ({ ...prev, [field]: data.url }));
      toast.success(successMsg);
    } catch {
      toast.error("Upload failed");
    } finally {
      setBusy(false);
    }
  }

  async function onLogo(e: React.ChangeEvent<HTMLInputElement>) {
    await uploadImage(e, "logo", setUploading, "Logo uploaded");
  }

  async function onPanditProfile(e: React.ChangeEvent<HTMLInputElement>) {
    await uploadImage(e, "panditProfileImage", setUploadingPandit, "Pandit Ji profile picture uploaded");
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

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
          <p className="text-base font-semibold text-amber-100">Pandit Ji profile picture</p>
          <p className="mt-1 text-sm text-zinc-400">
            Shown on the About page &quot;Meet Pandit Ji&quot; section. Recommended portrait photo (4:5 ratio).
          </p>
          <input
            type="file"
            accept="image/*"
            className="mt-3 block text-base text-zinc-400"
            onChange={onPanditProfile}
          />
          {f.panditProfileImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={f.panditProfileImage}
              alt="Pandit Ji preview"
              className="mt-4 max-h-72 w-auto rounded-xl border border-amber-500/25 object-cover"
            />
          ) : (
            <p className="mt-3 text-sm text-zinc-500">No profile picture uploaded yet.</p>
          )}
        </div>

        <button type="submit" className="sacred-btn" disabled={uploading || uploadingPandit}>
          Save
        </button>
      </form>
    </div>
  );
}
