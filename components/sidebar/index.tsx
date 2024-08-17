"use client";

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Search,
  BookOpen,
  Edit,
} from "lucide-react";
import SidebarItem from "./sidebar-item";

interface SidebarProps {
  selectedItem: string;
  onSelectItem: (item: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedItem,
  onSelectItem,
  isOpen,
  toggleSidebar,
}) => {
  return (
    <div className="flex">
      <div
        className={`fixed inset-y-0 z-10 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-gray-100 text-gray-900 w-64`}
      >
        <div className="flex items-center justify-between p-6 pr-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">智脑</span>
            <span>开启你的AI未来</span>
          </div>
          <button onClick={toggleSidebar}>
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <nav>
          <SidebarItem
            selectedItem={selectedItem}
            itemName="聊天"
            onSelectItem={onSelectItem}
            Icon={MessageSquare}
          />
          <SidebarItem
            selectedItem={selectedItem}
            itemName="搜索"
            onSelectItem={onSelectItem}
            Icon={Search}
          />
          <SidebarItem
            selectedItem={selectedItem}
            itemName="阅读"
            onSelectItem={onSelectItem}
            Icon={BookOpen}
          />
          <SidebarItem
            selectedItem={selectedItem}
            itemName="写作"
            onSelectItem={onSelectItem}
            Icon={Edit}
          />
        </nav>
      </div>
      <button
        className={`fixed top-4 left-4 z-50 ${isOpen ? "hidden" : "block"}`}
        onClick={toggleSidebar}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Sidebar;
