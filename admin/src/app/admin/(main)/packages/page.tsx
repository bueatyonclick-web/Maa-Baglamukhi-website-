import { Suspense } from "react";
import PackagesAdminPage from "./packages-client";

export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-zinc-500">Loading packages…</div>}>
      <PackagesAdminPage />
    </Suspense>
  );
}
