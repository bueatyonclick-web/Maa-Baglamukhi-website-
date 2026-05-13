"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Flame,
  Images,
  Mail,
  Phone,
  Share2,
  HeartHandshake,
  Globe,
  UserCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Puja Bookings", icon: CalendarCheck },
  { href: "/admin/packages?category=PUJA", label: "Puja packages", icon: Flame },
  { href: "/admin/packages?category=HAVAN", label: "Havan packages", icon: Flame },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/contact-settings", label: "Contact Settings", icon: Phone },
  { href: "/admin/social-settings", label: "Social Media", icon: Share2 },
  { href: "/admin/donations", label: "Donations", icon: HeartHandshake },
  { href: "/admin/website-settings", label: "Website Settings", icon: Globe },
  { href: "/admin/profile", label: "Admin Profile", icon: UserCircle },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    const [path, qs] = href.split("?");
    if (pathname !== path) return false;
    if (!qs) return true;
    const want = new URLSearchParams(qs);
    for (const [k, v] of Array.from(want.entries())) {
      if (searchParams.get(k) !== v) return false;
    }
    return true;
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    window.location.href = "/admin/login";
  }

  const nav = (
    <nav className="flex flex-1 flex-col gap-1.5 p-4">
      <p className="mb-2 px-3 font-cinzel text-xs tracking-[0.28em] text-amber-500/80">
        PEETH ADMIN
      </p>
      {links.map(({ href, label, icon: Icon }) => {
        const active = isActive(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-3 text-base transition",
              active
                ? "bg-amber-500/15 text-amber-100"
                : "text-zinc-400 hover:bg-zinc-800/80 hover:text-amber-200",
            )}
          >
            <Icon className="h-5 w-5 shrink-0 text-amber-500/80" />
            {label}
          </Link>
        );
      })}
      <button
        type="button"
        onClick={logout}
        className="mt-4 flex items-center gap-3 rounded-xl px-3 py-3 text-left text-base text-red-400/90 transition hover:bg-red-950/40"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    </nav>
  );

  return (
    <>
      <button
        type="button"
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/25 bg-zinc-900 lg:hidden"
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 border-r border-amber-500/15 bg-zinc-950/95 backdrop-blur-xl transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex min-h-[4.25rem] items-center border-b border-amber-500/10 px-5 py-2">
          <div>
            <p className="font-cinzel text-sm tracking-[0.18em] text-amber-400">
              श्री माँ बगलामुखी
            </p>
            <p className="text-base font-semibold text-zinc-100">Admin Console</p>
          </div>
        </div>
        {nav}
      </aside>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
