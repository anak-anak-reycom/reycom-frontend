"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import NavDropdown from "./navDropdown";
import type { MenuProps } from "antd";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MenuIcon, XIcon } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "TheCompany", href: "/company" },
  { label: "News", href: "/News" },
  { label: "Career", href: "/career" },
  { label: "Line", href: "/line" },
  { label: "Contact", href: "/contact" },
];

const LINE_MENU_ITEMS = [
  { label: "Business Processing", href: "/business" },
  { label: "Printing & Creative Serve", href: "/printingServices" },
  { label: "Healthcare Management", href: "/healthComponent" },
  { label: "System Integration", href: "/line/systemIntegration/hardware" },
];

const COMPANY_MENU_ITEMS = [
  { label: "About Us", href: "/company" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Video", href: "/videos" },

];


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lineOpenMobile, setLineOpenMobile] = useState(false);

 useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 50);
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  
  useEffect(()  => {
    const body = document.body;
    if (mobileOpen) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
    return () => body.classList.remove("overflow-hidden");
  }, [mobileOpen]);

  return (
    <header
      className={`w-full fixed top-0 z-50 bg-white border-b transition-shadow duration-500 ${
        scrolled && !mobileOpen ? "drop-shadow-lg" : "shadow-none"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-20">
    
          <Link href="/" className="flex items-center gap-3">
            <Image src={Logo} alt="Logo" width={98} height={98} />
          </Link>

      
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => {
                if (item.label === "Line") {
                  
                  return (
                    <li key={item.label} className="relative group">
                      <button
                        className="flex items-center gap-2 text-black font-medium hover:text-gray-600 transition"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {item.label} 
                      </button>

                      <div className="absolute left-0 mt-3 min-w-[220px] bg-white border rounded shadow-md opacity-100 group-hover:opacity-100 invisible group-hover:visible transition-all">
                        <ul className="p-2">
                          {LINE_MENU_ITEMS.map((sub) => (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                className="block px-3 py-2 text-sm hover:bg-gray-50 rounded"
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                }

                // TheCompany text label tweak
                if (item.label === "TheCompany") {
                  return (
                     <li key={item.label} className="relative group">
                      <button
                        className="flex items-center gap-2 text-black font-medium hover:text-gray-600 transition"
                        type="button"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        The Company 
                      </button>

                      <div className="absolute left-0 mt-3 min-w-[220px] bg-white border rounded shadow-md opacity-100 group-hover:opacity-100 invisible group-hover:visible transition-all">
                        <ul className="p-2">
                          {COMPANY_MENU_ITEMS.map((sub) => (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                className="block px-3 py-2 text-sm hover:bg-gray-50 rounded"
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
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

      
          <div className=" lg:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="p-2 rounded-md ring-1 ring-gray-200"
            >
              <MenuIcon size={20} />
            </button>
          </div>
        </div>
      </div>

      
      <div
        className={` fixed inset-0 z-50 lg:hidden transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal={mobileOpen}
      >
        {/* overlay */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            mobileOpen ? "opacity-110" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* panel */}
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" className="flex items-center gap-2">
              <Image src={Logo} alt="Logo" width={84} height={84} />
            </Link>

            <button
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-md"
            >
              <XIcon size={20} />
            </button>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => {
                if (item.label === "Line") {
                  return (
                    <li key={item.label}>
                      <button
                        onClick={() => setLineOpenMobile((v) => !v)}
                        className="w-full flex items-center justify-between px-3 py-3 text-left rounded-md hover:bg-gray-50"
                      >
                        <span className="font-medium">{item.label}</span>
                        <ChevronDown
                          size={16}
                          className={`transform transition-transform ${
                            lineOpenMobile ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </button>

                    
                      <div
                        className={`mt-2 pl-4 pr-2 overflow-hidden transition-all ${
                          lineOpenMobile ? "max-h-48" : "max-h-0"
                        }`}
                      >
                        <ul className="space-y-1">
                          {LINE_MENU_ITEMS.map((sub) => (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                className="block px-3 py-2 rounded hover:bg-gray-50"
                                onClick={() => setMobileOpen(false)}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="block px-3 py-3 rounded-md font-medium hover:bg-gray-50"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

    
            <div className="mt-6">
              <Link
                href="/career"
                className="block text-center px-4 py-3 bg-slate-800 text-white rounded-md hover:opacity-95"
                onClick={() => setMobileOpen(false)}
              >
                Join Us
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );

  
}