import type { PropsWithChildren } from "react";
import Sidebar from "@/components/sidebar";
import { AuthProvider } from "@/hooks/auth-context";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
      </div>
    </AuthProvider>
  );
}
