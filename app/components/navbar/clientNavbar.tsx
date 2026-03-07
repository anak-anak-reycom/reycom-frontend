// app/components/navbar/ClientNavbar.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ClientNavbar() {
  const pathname = usePathname() ?? "";

  if (pathname.startsWith("/admin")) return null;

  return <Navbar />;
}