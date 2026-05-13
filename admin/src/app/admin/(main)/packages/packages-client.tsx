"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

type Pkg = {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  duration: string;
  panditName: string;
  image: string | null;
  category: string;
  isFeatured: boolean;
};

const empty: Omit<Pkg, "id"> = {
  title: "",
  slug: "",
  description: "",
  price: 0,
  duration: "",
  panditName: "",
  image: null,
  category: "PUJA",
  isFeatured: false,
};

export default function PackagesAdminPage() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category") === "HAVAN" ? "HAVAN" : "PUJA";

  const [items, setItems] = useState<Pkg[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<Pkg | null>(null);

  useEffect(() => {
    setForm((f) => ({ ...f, category: categoryFilter }));
  }, [categoryFilter]);

  const load = useCallback(async () => {
    const q = categoryFilter ? `?category=${categoryFilter}` : "";
    const res = await fetch(`/api/packages${q}`, { credentials: "include" });
    const data = await res.json();
    setItems(data.items || []);
  }, [categoryFilter]);

  useEffect(() => {
    load();
  }, [load]);

  function startEdit(p: Pkg) {
    setEditing(p);
    setForm({
      title: p.title,
      slug: p.slug,
      description: p.description,
      price: p.price,
      duration: p.duration,
      panditName: p.panditName,
      image: p.image,
      category: p.category,
      isFeatured: p.isFeatured,
    });
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const url = editing ? `/api/packages/${editing.id}` : "/api/packages";
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.error?.message || "Save failed");
      return;
    }
    toast.success(editing ? "Package updated" : "Package created");
    setEditing(null);
    setForm({ ...empty, category: categoryFilter });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this package?")) return;
    const res = await fetch(`/api/packages/${id}`, { method: "DELETE", credentials: "include" });
    if (!res.ok) toast.error("Delete failed");
    else {
      toast.success("Deleted");
      load();
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold text-zinc-100">
          {categoryFilter === "HAVAN" ? "Havan packages" : "Puja packages"}
        </h1>
        <p className="text-base text-zinc-400">Manage offerings shown on the public booking page</p>
      </div>

      <form onSubmit={submit} className="sacred-card grid gap-3 p-6 md:grid-cols-2">
        <h2 className="md:col-span-2 text-xl font-semibold text-amber-100">
          {editing ? "Edit package" : "Add package"}
        </h2>
        <label className="text-sm font-medium text-zinc-400 md:col-span-1">
          Title
          <input
            className="sacred-input mt-1"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </label>
        <label className="text-sm font-medium text-zinc-400 md:col-span-1">
          Slug (url)
          <input
            className="sacred-input mt-1"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
            required
          />
        </label>
        <label className="text-sm font-medium text-zinc-400 md:col-span-2">
          Description
          <textarea
            className="sacred-input mt-1 min-h-[80px]"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
        </label>
        <label className="text-sm font-medium text-zinc-400">
          Price (₹)
          <input
            type="number"
            className="sacred-input mt-1"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            required
          />
        </label>
        <label className="text-sm font-medium text-zinc-400">
          Duration
          <input
            className="sacred-input mt-1"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            required
          />
        </label>
        <label className="text-sm font-medium text-zinc-400">
          Pandit name
          <input
            className="sacred-input mt-1"
            value={form.panditName}
            onChange={(e) => setForm({ ...form, panditName: e.target.value })}
            required
          />
        </label>
        <label className="text-sm font-medium text-zinc-400">
          Category
          <select
            className="sacred-input mt-1"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="PUJA">Puja</option>
            <option value="HAVAN">Havan</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-base text-zinc-300 md:col-span-2">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
          />
          Featured
        </label>
        <label className="text-sm font-medium text-zinc-400 md:col-span-2">
          Image URL (upload from Gallery tab or paste URL)
          <input
            className="sacred-input mt-1"
            value={form.image || ""}
            onChange={(e) => setForm({ ...form, image: e.target.value || null })}
          />
        </label>
        <div className="flex gap-3 md:col-span-2">
          <button type="submit" className="sacred-btn">
            {editing ? "Update" : "Create"}
          </button>
          {editing ? (
            <button
              type="button"
              className="sacred-btn-ghost"
              onClick={() => {
                setEditing(null);
                setForm({ ...empty, category: categoryFilter });
              }}
            >
              Cancel edit
            </button>
          ) : null}
        </div>
      </form>

      <div className="sacred-card overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-base">
          <thead className="border-b border-amber-500/15 text-sm font-medium uppercase tracking-wide text-zinc-400">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-b border-zinc-800/80">
                <td className="p-3 text-zinc-200">{p.title}</td>
                <td className="p-3 text-amber-200/80">{p.category}</td>
                <td className="p-3 text-zinc-300">₹{p.price.toLocaleString("en-IN")}</td>
                <td className="p-3 space-x-2">
                  <button type="button" className="sacred-btn-ghost !px-4 !py-2 text-sm" onClick={() => startEdit(p)}>
                    Edit
                  </button>
                  <button type="button" className="rounded-full border border-red-500/30 px-4 py-2 text-sm text-red-400/90 hover:bg-red-950/40" onClick={() => remove(p.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
