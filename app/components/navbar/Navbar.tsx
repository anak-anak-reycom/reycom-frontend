"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.png";
import NavDropdown from "./navDropdown";
import type { MenuProps } from "antd";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "TheCompany", href: "/company" },
  { label: "News", href: "/News" },
  { label: "Career", href: "/career" },
  { label: "Line", href: "/line" },
];

// NAVBAR DROPDOWN LIST
const SYSTEM_INTEGRATION_SUBMENU: MenuProps["items"] = [
  { label: "Hardware Infrastructure", key: "submenu_1" },
  { label: "Software and Applivation", key: "submenu_2" },
  { label: "Services", key: "submenu_3" },
];

const COMPANY_MENU_ITEMS: MenuProps["items"] = [
  { label: "About Us", key: "about" },
  { label: "Privacy Policy", key: "privacy" },
  { label: "Video's", key: "video" },
];


const LINE_MENU_ITEMS: MenuProps["items"] = [
  { label:  <Link href="\business">Business Processing</Link>, key: "product_a" },
  { label: "Printing & Creative Serve", key: "product_b" },
  { label: "Healthcare Management", key: "product_c" },
  {  label: <Link href="\line\systemIntegration">System Integration</Link>, key: "product_d"},
];

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 z-50 bg-white border-b border-gray-200 drop-shadow-md">
      <div className="w-full">
        <div className="flex items-center justify-between h-[80px]">

          {/* LOGO — LEFT */}
          <Link href="/" className="ml-0 pl-7">
            <Image src={Logo} alt="Logo" width={98} height={98} />
          </Link>

          {/* NAV — RIGHT */}
          <nav className="mr-0 pr-7">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => {
                // For TheCompany: render direct Link to /company (no dropdown for now)
                if (item.label === "TheCompany") {
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-black font-medium hover:text-gray-600 transition"
                      >
                        The Company
                      </Link>
                    </li>
                  );
                }

                // For Line: keep dropdown (unchanged)
                if (item.label === "Line") {
                  return (
                    <li key={item.label}>
                      <NavDropdown label={item.label} menuItems={LINE_MENU_ITEMS} />
                    </li>
                  );
                }

                // Default: normal Link
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
