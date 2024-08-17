import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface SidebarItemProps {
  itemName: string;
  path: string;
  onSelectItem: (item: string) => void;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  itemName,
  onSelectItem,
  path,
  Icon,
}) => {
  const pathname = usePathname();
  return (
    <Link
      key={path}
      href={path}
      passHref
      className={`flex items-center py-2.5 px-6 hover:bg-gray-200 ${
        pathname === path ? "bg-gray-300" : ""
      }`}
      onClick={() => onSelectItem(path)}
    >
      <Icon className="w-5 h-5 mr-3" />
      {itemName}
    </Link>
  );
};

export default SidebarItem;
