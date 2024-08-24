import type { PropsWithChildren } from "react";
import Sidebar from "@/components/sidebar";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
    </div>
  );
}
