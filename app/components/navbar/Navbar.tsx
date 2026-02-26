"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import NavDropdown from "./navDropdown";
import type { MenuProps } from "antd";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "TheCompany", href: "/company" },
  { label: "News", href: "/News" },
  { label: "Line", href: "/line" },
  { label: "Career", href: "/career" },
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

// variants for the hamburger animation
const topBarVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: 45, y: 6 },
};
const middleBarVariants = {
  closed: { opacity: 1 },
  open: { opacity: 0 },
};
const bottomBarVariants = {
  closed: { rotate: 0, y: 0 },
  open: { rotate: -45, y: -6 },
};

export default function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
          <Link href="/" className="ml-0 pl-7 md:pl-0">
            <Image src={Logo} alt="Logo" width={98} height={98} />
          </Link>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            <motion.div
              className="space-y-1"
              initial="closed"
              animate={mobileOpen ? "open" : "closed"}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                className="block h-0.5 w-6 bg-black"
                variants={topBarVariants}
              />
              <motion.span
                className="block h-0.5 w-6 bg-black"
                variants={middleBarVariants}
              />
              <motion.span
                className="block h-0.5 w-6 bg-black"
                variants={bottomBarVariants}
              />
            </motion.div>
          </button>

          {/* NAV — RIGHT */}
          <nav className="hidden md:block mr-0 pr-7">
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

        {/* MOBILE MENU */}
        {mobileOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200">
            <ul className="flex flex-col space-y-4 p-4">
              {NAV_ITEMS.map((item) => {
                if (item.label === "TheCompany") {
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="block text-black font-medium hover:text-gray-600 transition"
                        onClick={() => setMobileOpen(false)}
                      >
                        The Company
                      </Link>
                    </li>
                  );
                }

                if (item.label === "Line") {
                  return (
                    <li key={item.label}>
                      {/* for simplicity we just link to base page on mobile. dropdowns can be expanded later */}
                      <Link
                        href="/line"
                        className="block text-black font-medium hover:text-gray-600 transition"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="block text-black font-medium hover:text-gray-600 transition"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
