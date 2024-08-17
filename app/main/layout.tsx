"use client";

import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import { useState } from "react";
import useIsPC from "@/hooks/use-is-pc";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isPC = useIsPC();
  const [isOpen, setIsOpen] = useState(isPC);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        onSelectItem={(item) => {
          router.push(item);
          !isPC && toggleSidebar(); // 移动端切换后直接收起
        }}
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
    </div>
  );
}
