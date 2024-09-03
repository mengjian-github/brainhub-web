import React from "react";
import Chat from "@/components/chat";

interface AIChatSidebarProps {
  isOpen: boolean;
}

const AIChatSidebar: React.FC<AIChatSidebarProps> = ({ isOpen }) => {
  return (
    <div
      className={`fixed right-0 top-0 h-full w-1/3 bg-background shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full overflow-auto pt-14">
        <Chat />
      </div>
    </div>
  );
};

export default AIChatSidebar;
