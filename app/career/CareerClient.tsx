// app/career/CareerClient.tsx
"use client";

import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { JobCard } from "@/app/components/card/jobCard";
import type { CareerItem } from "@/app/types/career-types";

function normalizeCategoryName(raw: string | undefined) {
  if (!raw) return "";
  const s = raw.toLowerCase();
  if (s.includes("admin")) return "Admin";
  if (s.includes("it")) return "IT";
  if (s.includes("market")) return "Marketing";
  return raw.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

export default function CareerClient({ careers }: { careers: (CareerItem & { category?: any })[] }) {
  const searchParams = useSearchParams();
  const search = (searchParams?.get("search") ?? "").trim().toLowerCase();
  const catsParam = searchParams?.get("cats") ?? "";
  const jobTypesParam = searchParams?.get("jobTypes") ?? "";

  const selectedCats = catsParam ? catsParam.split(",").map(decodeURIComponent).map((s) => normalizeCategoryName(s)) : [];
  const selectedJobTypes = jobTypesParam ? jobTypesParam.split(",") : [];

  const filtered = useMemo(() => {
    return careers.filter((c) => {
      
      if (search) {
        const name = String(c.jobName ?? "").toLowerCase();
        if (!name.includes(search)) return false;
      }

     
      if (selectedCats.length) {
        const rawCat = c?.category?.nameCategory ?? c?.category?.name ?? "";
        const norm = normalizeCategoryName(rawCat);
        if (!selectedCats.includes(norm)) return false;
      }


      if (selectedJobTypes.length) {
        const jt = String(c?.category?.jobType ?? "").toLowerCase();
        const wantsPart = selectedJobTypes.includes("parttime");
        const wantsFull = selectedJobTypes.includes("fulltime");
        if (!( (wantsPart && jt.includes("part")) || (wantsFull && jt.includes("full")) || (wantsFull && wantsPart) )) {
          
          if (!(wantsPart && wantsFull)) return false;
        }
      }

      return true;
    });
  }, [careers, search, selectedCats.join(","), selectedJobTypes.join(",")]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
        {filtered.length === 0 ? (
          <div className="text-gray-500">No career found.</div>
        ) : (
          filtered.map((c) => <JobCard key={c.id} career={c as any} />)
        )}
      </div>
    </div>
  );
}