"use client";

import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  Search,
  BookOpen,
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarItemType {
  path: string;
  itemName: string;
  Icon: React.ComponentType;
}

interface SidebarProps {
  onSelectItem: (item: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const sidebarItems: SidebarItemType[] = [
  { path: "/main/chat", itemName: "聊天", Icon: MessageSquare },
  { path: "/main/search", itemName: "搜索", Icon: Search },
  { path: "/main/read", itemName: "阅读", Icon: BookOpen },
  { path: "/main/write", itemName: "写作", Icon: Edit },
];

const Sidebar: React.FC<SidebarProps> = ({
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
          {sidebarItems.map(({ path, itemName, Icon }: SidebarItemType) => (
            <SidebarItem
              key={path}
              itemName={itemName}
              path={path}
              onSelectItem={onSelectItem}
              Icon={Icon}
            />
          ))}
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
