"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

type G = { id: string; type: string; title: string; fileUrl: string; createdAt: string };

export default function GalleryAdminPage() {
  const [items, setItems] = useState<G[]>([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"IMAGE" | "VIDEO">("IMAGE");
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  async function load() {
    const res = await fetch("/api/gallery", { credentials: "include" });
    const data = await res.json();
    setItems(data.items || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", f);
      const res = await fetch("/api/upload", { method: "POST", credentials: "include", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setFileUrl(data.url);
      toast.success("File uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function addItem(e: React.FormEvent) {
    e.preventDefault();
    if (!fileUrl) {
      toast.error("Upload a file or enter URL");
      return;
    }
    const res = await fetch("/api/gallery", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, title, fileUrl }),
    });
    if (!res.ok) {
      toast.error("Failed to add");
      return;
    }
    toast.success("Gallery item added");
    setTitle("");
    setFileUrl("");
    load();
  }

  async function del(id: string) {
    if (!confirm("Remove this item?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE", credentials: "include" });
    load();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold text-zinc-100">Gallery</h1>
        <p className="text-base text-zinc-400">Upload images; use public URL for external videos</p>
      </div>

      <form onSubmit={addItem} className="sacred-card space-y-4 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-zinc-400">
            Title
            <input className="sacred-input mt-1" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label className="text-sm font-medium text-zinc-400">
            Type
            <select className="sacred-input mt-1" value={type} onChange={(e) => setType(e.target.value as "IMAGE" | "VIDEO")}>
              <option value="IMAGE">Image</option>
              <option value="VIDEO">Video</option>
            </select>
          </label>
        </div>
        <label className="text-sm font-medium text-zinc-400">
          Upload file
          <input type="file" className="mt-2 block text-base text-zinc-400" accept="image/*,video/*" onChange={onFile} />
        </label>
        <label className="text-sm font-medium text-zinc-400">
          File URL (from upload or external)
          <input className="sacred-input mt-1" value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} />
        </label>
        <button type="submit" className="sacred-btn" disabled={uploading}>
          {uploading ? "Uploading…" : "Add to gallery"}
        </button>
      </form>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g) => (
          <div key={g.id} className="sacred-card overflow-hidden">
            <div className="aspect-video bg-zinc-900">
              {g.type === "IMAGE" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={g.fileUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <video src={g.fileUrl} className="h-full w-full object-cover" controls muted />
              )}
            </div>
            <div className="flex items-center justify-between p-4">
              <p className="text-base font-medium text-zinc-200">{g.title}</p>
              <button type="button" className="rounded-full border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:bg-red-950/40" onClick={() => del(g.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
