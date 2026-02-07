"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import NavDropdown from "./navDropdown";
import type { MenuProps } from "antd";
import { useState , useEffect } from "react";
import React from "react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "TheCompany", href: "/company" },
  { label: "News", href: "/News" },
  { label: "Career", href: "/career" },
  { label: "Line", href: "/line" },
  { label: "Contact", href: "/contact" },
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
  { label:  <Link href="\business"> Business Processing </Link>, key: "product_a" },
  { label: <Link href="\printingServices" > Printing & Creative Serve</Link>, key: "product_b" },
  { label: <Link href="\healthComponent"> Healthcare Management </Link>, key: "product_c" },
  {  label: <Link href="\line\systemIntegration\hardware"> System Integration </Link>, key: "product_d"},
];

export default function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);

 useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <header     className={`
        w-full fixed top-0 z-50 bg-white border-b border-white transition-shadow duration-500
        ${scrolled ? 'drop-shadow-lg' : 'shadow-none'}
      `}>
      <div className="w-full">
        <div className="flex items-center justify-between h-20">

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
