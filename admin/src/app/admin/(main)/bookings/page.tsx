"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type Booking = {
  id: string;
  userName: string;
  email: string;
  phone: string;
  address: string | null;
  bookingDate: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
  package: { title: string; id: string };
};

export default function BookingsAdminPage() {
  const [items, setItems] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sel, setSel] = useState<Booking | null>(null);

  const load = useCallback(async () => {
    const q = new URLSearchParams({ page: String(page), limit: "15" });
    if (search.trim()) q.set("search", search.trim());
    if (status) q.set("status", status);
    const res = await fetch(`/api/bookings?${q}`, { credentials: "include" });
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.error || "Failed to load");
      return;
    }
    setItems(data.items);
    setTotal(data.total);
  }, [page, search, status]);

  useEffect(() => {
    load();
  }, [load]);

  async function saveBooking() {
    if (!sel) return;
    const res = await fetch(`/api/bookings/${sel.id}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: sel.status,
        paymentStatus: sel.paymentStatus,
        userName: sel.userName,
        email: sel.email,
        phone: sel.phone,
        address: sel.address,
        bookingDate: sel.bookingDate.slice(0, 10),
      }),
    });
    if (!res.ok) {
      toast.error("Update failed");
      return;
    }
    toast.success("Booking updated");
    setSel(null);
    load();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-semibold text-zinc-100">Puja bookings</h1>
        <p className="text-base text-zinc-400">Search, filter, and update booking status</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          className="sacred-input max-w-xs"
          placeholder="Search name, email, phone…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (setPage(1), load())}
        />
        <select
          className="sacred-input max-w-[200px]"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All statuses</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <button type="button" className="sacred-btn" onClick={() => load()}>
          Refresh
        </button>
      </div>

      <div className="sacred-card overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-base">
          <thead className="border-b border-amber-500/15 text-sm font-medium uppercase tracking-wide text-zinc-400">
            <tr>
              <th className="p-4">Devotee</th>
              <th className="p-4">Package</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Payment</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {items.map((b) => (
              <tr key={b.id} className="border-b border-zinc-800/80 text-zinc-300">
                <td className="p-4">
                  <div className="font-medium text-zinc-100">{b.userName}</div>
                  <div className="text-sm text-zinc-400">{b.email}</div>
                </td>
                <td className="p-4">{b.package.title}</td>
                <td className="p-4">{new Date(b.bookingDate).toLocaleDateString()}</td>
                <td className="p-4 text-amber-200/90">{b.status}</td>
                <td className="p-4">{b.paymentStatus}</td>
                <td className="p-4">
                  <button type="button" className="sacred-btn-ghost !px-4 !py-2 text-sm" onClick={() => setSel(b)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 ? <p className="p-6 text-center text-base text-zinc-400">No bookings found.</p> : null}
        <div className="flex items-center justify-between border-t border-amber-500/10 p-4 text-base text-zinc-400">
          <span>Total: {total}</span>
          <div className="flex gap-2">
            <button
              type="button"
              className="sacred-btn-ghost !px-4 !py-2 text-sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>
            <button type="button" className="sacred-btn-ghost !px-4 !py-2 text-sm" onClick={() => setPage((p) => p + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>

      {sel ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
          <div className="sacred-card max-h-[90vh] w-full max-w-lg overflow-y-auto p-6">
            <h2 className="text-xl font-semibold text-zinc-100">Booking details</h2>
            <div className="mt-4 grid gap-3 text-base">
              <label className="text-zinc-400">
                Name
                <input
                  className="sacred-input mt-1"
                  value={sel.userName}
                  onChange={(e) => setSel({ ...sel, userName: e.target.value })}
                />
              </label>
              <label className="text-zinc-400">
                Email
                <input
                  className="sacred-input mt-1"
                  value={sel.email}
                  onChange={(e) => setSel({ ...sel, email: e.target.value })}
                />
              </label>
              <label className="text-zinc-400">
                Phone
                <input
                  className="sacred-input mt-1"
                  value={sel.phone}
                  onChange={(e) => setSel({ ...sel, phone: e.target.value })}
                />
              </label>
              <label className="text-zinc-400">
                Puja date
                <input
                  className="sacred-input mt-1"
                  type="date"
                  value={sel.bookingDate.slice(0, 10)}
                  onChange={(e) => setSel({ ...sel, bookingDate: e.target.value })}
                />
              </label>
              <label className="text-zinc-400">
                Status
                <select
                  className="sacred-input mt-1"
                  value={sel.status}
                  onChange={(e) => setSel({ ...sel, status: e.target.value })}
                >
                  {["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-zinc-400">
                Payment
                <select
                  className="sacred-input mt-1"
                  value={sel.paymentStatus}
                  onChange={(e) => setSel({ ...sel, paymentStatus: e.target.value })}
                >
                  {["PENDING", "PAID", "REFUNDED"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-6 flex gap-3">
              <button type="button" className="sacred-btn flex-1" onClick={saveBooking}>
                Save
              </button>
              <button type="button" className="sacred-btn-ghost flex-1" onClick={() => setSel(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
