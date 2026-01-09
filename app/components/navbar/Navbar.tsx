"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.png";
import NavDropdown  from "./navDropdown";
import type { MenuProps } from "antd";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "TheCompany", href: "/company" },
  { label: "News", href: "/news" },
  { label: "Career", href: "/career" },
  { label: "Line", href: "/line" },
];

      //===NAVBAR DROPDOWN LIST===
const COMPANY_MENU_ITEMS: MenuProps["items"] = [
  { label: "About Us", key: "about" },
  { label: "Privacy Policy", key: "privacy" },
  { label: "Video's", key: "video" },
];

const LINE_MENU_ITEMS: MenuProps["items"] = [
  { label: "business outsourcing", key: "product_a" },
  { label: "Product B", key: "product_b" },
  { label: "Product C", key: "product_c" },
];


    //===NAVBAR COMPONENT===
export default function Navbar() {
  return (
    <header className="w-full fixed top- z-50 bg-white border-b border-gray-200 drop-shadow-md">
      {/* container full */}
      <div className="w-full">
        <div className="flex items-center justify-between h-[80px]">

          {/* LOGO — MENTOK KIRI */}
          <Link href="/" className="ml-0 pl-7">
            <Image src={Logo} alt="Logo" width={98} height={98} />
          </Link>

          {/* NAV — MENTOK KANAN */}
          <nav className="mr-0 pr-7">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => {

                //=== IF LABEL = THE COMPANY MUNCULKAN DROPDOWN===
                if (item.label === "TheCompany") {
                  return (
                    <li key={item.label}>
                      <NavDropdown label={item.label} menuItems={COMPANY_MENU_ITEMS} />
                    </li>
                  );
                }


                //=== IF LABEL = LINE MUNCULKAN DROPDOWN===
                if (item.label === "Line") {
                  return (
                    <li key={item.label}>
                      <NavDropdown label={item.label} menuItems={LINE_MENU_ITEMS} />
                    </li>
                  );
                }

                 return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-black font-medium hover:text-gray-600 transition"
                    >
                      {item.label}
                    </Link>
                  </li>
                );




              })}
            </ul>
          </nav>

        </div>
      </div>
    </header>
  );
}
