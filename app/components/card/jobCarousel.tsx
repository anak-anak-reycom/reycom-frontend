// app/components/card/jobCarousel.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import JobCard from "./jobCard";
import type { CareerItem } from "@/app/types/career-types";

type Props = {
  excludeId?: number | null;
  pageSize?: number; 
};

export function chunkArray<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export const JobCarousel: React.FC<Props> = ({ excludeId = null, pageSize = 3 }) => {
  const BASE_API = process.env.NEXT_PUBLIC_BASE_API ?? "";

  const [items, setItems] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        
        const res = await axios.get(`${BASE_API}/career`);
        const payload = res.data?.data ?? res.data;

        if (!mounted) return;

      
        const arr = Array.isArray(payload) ? payload : [];
       
        const careers: CareerItem[] = arr.map((c: any) => ({
          id: Number(c.id ?? c.idCareer ?? 0),
          jobName: c.jobName ?? c.title ?? "",
          jobDescription: c.jobDescription ?? c.description ?? "",
          jobDate: c.jobDate ?? c.createdAt ?? null,
          jobRequirement: c.jobRequirement ?? c.requirement ?? "",
          jobResponbilities: c.jobResponbilities ?? c.responsibilities ?? "",
          category: c.category ?? null,
          
          ...(c as object),
        }));

        
        const filtered = excludeId ? careers.filter((x) => x.id !== excludeId) : careers;

        setItems(filtered);
      } catch (err: any) {
        setError(err?.response?.data?.message ?? err?.message ?? "Failed to load jobs");
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [BASE_API, excludeId]);

  
  const pages = useMemo(() => chunkArray(items, pageSize), [items, pageSize]);
  const pageCount = pages.length;

  useEffect(() => {
  
    if (pageIndex >= pageCount) setPageIndex(Math.max(0, pageCount - 1));
  }, [pageCount, pageIndex]);

  function prev() {
    setPageIndex((p) => (p <= 0 ? pageCount - 1 : p - 1));
  }
  function next() {
    setPageIndex((p) => (p >= pageCount - 1 ? 0 : p + 1));
  }
  function goTo(i: number) {
    setPageIndex(i);
  }

  if (loading) {
    return (
      <div className="w-full max-w-[700px] mx-auto p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-24 bg-gray-200 rounded" />
          <div className="h-24 bg-gray-200 rounded" />
          <div className="h-24 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 p-4">Error loading jobs: {error}</div>;
  }

  if (!items.length) {
    return <div className="p-4 text-gray-600">No related jobs found.</div>;
  }

  return (
    <div className="w-full max-w-[700px] mx-auto">
      <div className="relative">
      
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-400 ease-in-out"
            style={{ width: `${pageCount * 100}%`, transform: `translateX(-${(pageIndex * 100) / pageCount}%)` }}
          >
            {pages.map((pageItems, idx) => (
              <div key={idx} className="w-full px-2" style={{ width: `${100 / pageCount}%` }}>
              
                <div className="flex flex-col gap-4 py-2">
                  {pageItems.map((career) => (
                    <div key={career.id}>
                      
                      <JobCard career={career as any} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* controls */}
        {pageCount > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="prev"
              className="absolute -left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="next"
              className="absolute -right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
            >
              ›
            </button>

            
            <div className="flex items-center justify-center gap-2 mt-3">
              {pages.map((_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === pageIndex ? "bg-[#214B62]" : "bg-gray-300"}`}
                  onClick={() => goTo(i)}
                  aria-label={`go-to-${i}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JobCarousel;