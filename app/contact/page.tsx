// app/contact/page.tsx
"use client";

import { useState } from "react";
import CompanyDirectory from "@/app/components/contactCompo/company";
import BranchSearch from "@/app/components/contactCompo/search";
import BranchDropdown from "../components/contactCompo/dropdown";
import { getAllBranch } from "../data/branch";
import { getAllCountry } from "../data/country";
import { getAllCompany } from "../data/company";

export default function ContactPage() {
  const [query, setQuery] = useState("");

  return (
    <main className="min-h-screen ">

      <CompanyDirectory />

      <div className="max-w-[1400px] mx-auto px-6">
        <BranchSearch value={query} onSearch={(v) => setQuery(v)} />
      </div>

      
      <BranchDropdown />

    </main>
  );
}
