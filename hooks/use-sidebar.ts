import { SidebarContext } from "@/providers/sidebar";
import { useContext } from "react";
import useIsPC from "./use-is-pc";

export const useSidebar = () => {
  const isPC = useIsPC();
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }

  const onSidebarSelected = () => {
    !isPC && context.toggleSidebar(); // 移动端切换后直接收起
  };

  return { ...context, onSidebarSelected };
};
