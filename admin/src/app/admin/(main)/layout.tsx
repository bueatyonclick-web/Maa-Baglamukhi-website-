import { Suspense } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminMainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050302]">
      <Suspense fallback={<div className="fixed inset-y-0 left-0 z-40 w-72 border-r border-amber-500/15 bg-zinc-950" />}>
        <AdminSidebar />
      </Suspense>
      <div className="lg:pl-72">
        <div className="min-h-screen px-4 pb-10 pt-16 text-base leading-relaxed lg:px-10 lg:pt-10">{children}</div>
      </div>
    </div>
  );
}
