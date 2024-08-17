import React from "react";

interface SidebarItemProps {
  active: boolean;
  itemName: string;
  path: string;
  onSelectItem: (item: string) => void;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  active,
  itemName,
  onSelectItem,
  path,
  Icon,
}) => {
  return (
    <a
      href="#"
      className={`flex items-center py-2.5 px-6 hover:bg-gray-200 ${
        active ? "bg-gray-300" : ""
      }`}
      onClick={() => onSelectItem(path)}
    >
      <Icon className="w-5 h-5 mr-3" />
      {itemName}
    </a>
  );
};

export default SidebarItem;
