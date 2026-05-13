"use client";

import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        theme="dark"
        richColors
        position="top-center"
        toastOptions={{
          classNames: {
            toast: "sacred-card border-amber-500/30 bg-zinc-900 text-zinc-100",
          },
        }}
      />
    </>
  );
}
