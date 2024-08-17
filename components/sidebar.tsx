"use client";

import { FC } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Search,
  BookOpen,
  Edit,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="flex">
      <div
        className={`fixed inset-y-0 z-10 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out bg-gray-100 text-gray-900 w-64`}
      >
        <div className="flex items-center justify-between p-4 bg-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold">智脑</span>
            <span>开启你的AI未来</span>
          </div>
          <button onClick={toggleSidebar}>
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-4">
          <a
            href="#"
            className="flex items-center py-2.5 px-6 hover:bg-gray-300"
          >
            <MessageSquare className="w-5 h-5 mr-3" />
            聊天
          </a>
          <a
            href="#"
            className="flex items-center py-2.5 px-6 hover:bg-gray-300"
          >
            <Search className="w-5 h-5 mr-3" />
            搜索
          </a>
          <a
            href="#"
            className="flex items-center py-2.5 px-6 hover:bg-gray-300"
          >
            <BookOpen className="w-5 h-5 mr-3" />
            阅读
          </a>
          <a
            href="#"
            className="flex items-center py-2.5 px-6 hover:bg-gray-300"
          >
            <Edit className="w-5 h-5 mr-3" />
            写作
          </a>
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
