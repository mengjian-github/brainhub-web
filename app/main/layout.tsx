"use client";

import Sidebar from "@/components/sidebar";
import NoSSR from "@/components/no-ssr";
import { SidebarProvider } from "@/providers/sidebar";
import { useSidebar } from "@/hooks/use-sidebar";

const Main = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isOpen, toggleSidebar, onSidebarSelected } = useSidebar();

  return (
    <div className="flex min-h-screen">
      <NoSSR>
        <Sidebar
          onSelectItem={onSidebarSelected}
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
        />

        <main
          className={`flex-1 flex flex-col items-center justify-between p-4 transition-all duration-300 ${
            isOpen ? "md:ml-64" : "ml-0"
          }`}
          style={{
            paddingTop: `calc(1rem + env(safe-area-inset-top))`,
            paddingRight: `calc(1rem + env(safe-area-inset-right))`,
            paddingBottom: `calc(1rem + env(safe-area-inset-bottom))`,
            paddingLeft: `calc(1rem + env(safe-area-inset-left))`,
          }}
        >
          {children}
        </main>
      </NoSSR>
    </div>
  );
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <Main>{children}</Main>
    </SidebarProvider>
  );
}
