"use client";

import Chat from "@/components/chat";
import Sidebar from "@/components/sidebar";
import { useState, useEffect } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(window.innerWidth >= 640);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <main
        className={`flex-1 flex flex-col items-center justify-between p-4 transition-all duration-300 ${
          isOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        <Chat />
      </main>
    </div>
  );
}
