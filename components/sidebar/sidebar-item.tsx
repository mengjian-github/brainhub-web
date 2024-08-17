import React from "react";

interface SidebarItemProps {
  selectedItem: string;
  itemName: string;
  onSelectItem: (item: string) => void;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  selectedItem,
  itemName,
  onSelectItem,
  Icon,
}) => {
  return (
    <a
      href="#"
      className={`flex items-center py-2.5 px-6 hover:bg-gray-200 ${
        selectedItem === itemName ? "bg-gray-300" : ""
      }`}
      onClick={() => onSelectItem(itemName)}
    >
      <Icon className="w-5 h-5 mr-3" />
      {itemName}
    </a>
  );
};

export default SidebarItem;
