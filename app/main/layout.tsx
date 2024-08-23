import type { PropsWithChildren } from "react";
import Sidebar from "@/components/sidebar";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main
        className="flex-1 flex flex-col items-center justify-between
                   pt-[calc(1rem+env(safe-area-inset-top))]
                   pr-[calc(1rem+env(safe-area-inset-right))]
                   pb-[calc(1rem+env(safe-area-inset-bottom))]
                   pl-[calc(1rem+env(safe-area-inset-left))]"
      >
        {children}
      </main>
    </div>
  );
}
