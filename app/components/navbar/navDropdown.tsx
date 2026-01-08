"use client";

import { MenuProps } from "antd";
import { Dropdown, Menu } from "antd";

type NavDropdownProps = {
  label: string;
  menuItems: MenuProps["items"];
  trigger?: ("click" | "hover")[];
};

export default function NavDropdown({label, menuItems, trigger = ["hover"]}: NavDropdownProps) {
  return (
    <Dropdown
      menu ={{ items: menuItems }}
      trigger= {trigger}
      placement="bottom"
      >

        <span className="cursor-pointer hover:text-gray-600 transition"
              onClick={e => e.preventDefault()}>
            {label}
        </span>
     
    </Dropdown>
  );
}