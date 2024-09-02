"use client";

import { useState } from "react";
import {
  MessageSquare,
  Search,
  BookOpen,
  Edit,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import SidebarItem from "./sidebar-item";
import clsx from "clsx";
import User from "../user"; // 导入 User 组件

const SIDEBAR_ITEMS = [
  { path: "/main/chat", itemName: "聊天", Icon: MessageSquare },
  { path: "/main/search", itemName: "搜索", Icon: Search },
  { path: "/main/read", itemName: "阅读", Icon: BookOpen },
  { path: "/main/write", itemName: "写作", Icon: Edit },
] as const;

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <>
      <aside className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 lg:hidden">
        <nav className="flex justify-around py-4">
          {SIDEBAR_ITEMS.map(({ path, itemName, Icon }) => (
            <SidebarItem
              key={path}
              itemName={itemName}
              path={path}
              Icon={Icon}
              isExpanded={false}
            />
          ))}
        </nav>
        <div className="flex justify-center py-4">
          <User isExpanded={false} /> {/* 添加 User 组件 */}
        </div>
      </aside>
      <aside
        className={`hidden lg:block relative h-screen bg-white border-r border-gray-200 transition-all duration-300 ${
          isExpanded ? "w-[260px]" : "w-[60px]"
        }`}
      >
        <div className="h-full flex flex-col pt-8">
          <div className="flex items-center px-4 mb-8 transition-all duration-300 ease-in-out">
            <Image
              src="/logo.png"
              alt="Logo"
              width={36}
              height={36}
              className="flex-shrink-0"
            />
            <div
              className={clsx(
                "ml-3 transition-all duration-300 ease-in-out",
                isExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
              )}
            >
              <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">
                智脑
              </h1>
              <p className="text-xs text-gray-500 whitespace-nowrap">
                开启你的AI未来
              </p>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto">
            {SIDEBAR_ITEMS.map(({ path, itemName, Icon }) => (
              <SidebarItem
                key={path}
                itemName={itemName}
                path={path}
                Icon={Icon}
                isExpanded={isExpanded}
              />
            ))}
          </nav>
          <div className="px-4 py-4">
            <User isExpanded={isExpanded} /> {/* 添加 User 组件 */}
          </div>
        </div>
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className={clsx(
            "absolute top-9 transition-all duration-300 ease-in-out bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:bg-gray-100",
            isExpanded ? "-right-4" : "-right-4"
          )}
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
