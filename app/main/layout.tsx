"use client";

import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar";
import { useEffect, useState } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsOpen(window.innerWidth >= 640);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        onSelectItem={(item) => {
          router.push(item);
        }}
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
      />
      <main
        className={`flex-1 flex flex-col items-center justify-between p-4 transition-all duration-300 ${
          isOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
