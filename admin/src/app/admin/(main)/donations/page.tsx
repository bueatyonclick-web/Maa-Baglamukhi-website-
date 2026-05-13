"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type D = { id: string; donorName: string; amount: number; paymentId: string | null; createdAt: string };

export default function DonationsAdminPage() {
  const [items, setItems] = useState<D[]>([]);
  const [form, setForm] = useState({ donorName: "", amount: "", paymentId: "" });

  const load = useCallback(async () => {
    const res = await fetch("/api/donations?page=1&limit=50", { credentials: "include" });
    const data = await res.json();
    setItems(data.items || []);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/donations", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        donorName: form.donorName,
        amount: Number(form.amount),
        paymentId: form.paymentId || undefined,
      }),
    });
    if (!res.ok) toast.error("Failed");
    else {
      toast.success("Donation recorded");
      setForm({ donorName: "", amount: "", paymentId: "" });
      load();
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-semibold text-zinc-100">Donations</h1>
      <form onSubmit={add} className="sacred-card flex flex-wrap gap-3 p-6">
        <input
          className="sacred-input min-w-[160px] flex-1"
          placeholder="Donor name"
          value={form.donorName}
          onChange={(e) => setForm({ ...form, donorName: e.target.value })}
          required
        />
        <input
          type="number"
          className="sacred-input w-32"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
        <input
          className="sacred-input min-w-[140px] flex-1"
          placeholder="Payment ID (optional)"
          value={form.paymentId}
          onChange={(e) => setForm({ ...form, paymentId: e.target.value })}
        />
        <button type="submit" className="sacred-btn">
          Add
        </button>
      </form>
      <div className="sacred-card overflow-x-auto">
        <table className="w-full text-left text-base">
          <thead className="border-b border-amber-500/15 text-sm font-medium uppercase tracking-wide text-zinc-400">
            <tr>
              <th className="p-3">Donor</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {items.map((d) => (
              <tr key={d.id} className="border-b border-zinc-800/80 text-zinc-300">
                <td className="p-3">{d.donorName}</td>
                <td className="p-3">₹{d.amount.toLocaleString("en-IN")}</td>
                <td className="p-3">{new Date(d.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
