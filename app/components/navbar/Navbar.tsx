"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.png";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "TheCompany", href: "/company" },
  { label: "News", href: "/news" },
  { label: "Career", href: "/career" },
  { label: "Line", href: "/line" },
];

export default function Navbar() {
  return (
    <header className="w-full sticky top- z-50 bg-white border-b border-gray-200 drop-shadow-md">
      {/* container full */}
      <div className="w-full">
        <div className="flex items-center justify-between h-[80px]">

          {/* LOGO — MENTOK KIRI */}
          <Link href="/" className="ml-0 pl-7">
            <Image src={Logo} alt="Logo" width={100} height={100} />
          </Link>

          {/* NAV — MENTOK KANAN */}
          <nav className="mr-0 pr-7">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-black font-medium hover:text-gray-600 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </div>
    </header>
  );
}
