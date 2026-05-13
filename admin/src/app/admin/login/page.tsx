"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@baglamukhi.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Login failed");
        return;
      }
      toast.success("Welcome, " + data.admin.name);
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050302] px-4">
      <div className="sacred-card w-full max-w-md p-8">
        <p className="text-center font-cinzel text-xs tracking-[0.32em] text-amber-500/85">TEMPLE ADMIN</p>
        <h1 className="mt-2 text-center text-3xl font-semibold text-zinc-100">Shree Maa Baglamukhi Peeth</h1>
        <p className="mt-2 text-center text-base text-zinc-400">Sign in to manage the website</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-zinc-400">Email</label>
            <input
              className="sacred-input mt-1"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-400">Password</label>
            <input
              className="sacred-input mt-1"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="sacred-btn w-full">
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-zinc-500">
          Default: admin@baglamukhi.com — change password after first login.
        </p>
      </div>
    </div>
  );
}
