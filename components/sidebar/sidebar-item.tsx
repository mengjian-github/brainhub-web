"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentType, SVGProps } from "react";
import clsx from "clsx";

interface SidebarItemProps {
  itemName: string;
  path: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  isExpanded: boolean;
}

const SidebarItem = ({
  itemName,
  path,
  Icon,
  isExpanded,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(path);

  return (
    <Link
      href={path}
      className={clsx(
        "flex items-center rounded-lg transition-all duration-300 ease-in-out overflow-hidden",
        {
          "bg-gray-100 text-gray-900": isActive,
          "text-gray-600 hover:bg-gray-50 hover:text-gray-900": !isActive,
          "px-4 py-3": isExpanded,
          "px-2 py-3 justify-center w-12 mx-auto": !isExpanded,
        }
      )}
    >
      <Icon
        className={clsx(
          "flex-shrink-0 transition-all duration-300 ease-in-out",
          {
            "w-6 h-6 mr-4": isExpanded,
            "w-6 h-6": !isExpanded,
            "text-blue-500": isActive,
            "text-gray-400": !isActive,
          }
        )}
      />
      <span
        className={clsx(
          "whitespace-nowrap transition-all duration-300 ease-in-out",
          {
            "opacity-100 w-auto": isExpanded,
            "opacity-0 w-0": !isExpanded,
          }
        )}
      >
        {itemName}
      </span>
    </Link>
  );
};

export default SidebarItem;
