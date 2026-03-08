// app/components/jobDetails/jobDetails.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Timer, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import jobImage from "@/public/jobImage.png";
import JobCard from "../card/jobCard";
import ApplyForm from "../card/applyCard";
import type { CareerItem } from "@/app/types/career-types";
import type { CategoryItem } from "@/app/types/category-types";
import JobCarousel from "../card/jobCarousel";

export default function JobDetails({
  career,
}: {
  career: CareerItem & { category?: { idCategory: number; nameCategory: string; jobType: string } };
}) {
  const [showApply, setShowApply] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showApply ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [showApply]);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setShowApply(false);
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const jobTypeNormalized = (() => {
    const rawJobType = career?.category?.jobType ?? "";
    const s = String(rawJobType).toLowerCase();
    if (!s) return "Full Time";
    if (s.includes("full")) return "Full Time";
    if (s.includes("part")) return "Part Time";
    return rawJobType.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  })();

  return (
    <>
      <div className='mx-auto max-w-[1400px] grid grid-cols-1 md:grid-cols-2 p-4  '>
        <div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="w-[120px] h-[120px] md:w-[110px] md:h-[110px] flex-shrink-0 flex items-center">
              <Image src={jobImage} alt={career.jobName ?? "job"} width={110} height={110} className="object-cover rounded" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-semibold">{career.jobName}</h3>
              {career.category?.nameCategory && <div className="text-sm text-gray-500 mt-1">{career.category.nameCategory}</div>}
            </div>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-2 gap-4 max-w-[420px] mx-auto md:mx-0">
              <div className="flex items-center justify-center gap-3 px-5 py-2 border-2 rounded-full border-[#214B62]">
                <Timer size={18} />
                <span className="text-sm font-medium">{jobTypeNormalized}</span>
              </div>
              <div className="flex items-center justify-center gap-3 px-5 py-2 border-2 rounded-full border-[#214B62]">
                <Calendar size={18} />
                <span className="text-sm font-medium">Date Release</span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-1 gap-5">
            <div>
              <h4 className="text-2xl font-semibold mb-4">Responsibilities</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                {(career.jobResponbilities || "")
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean)
                  .map((it, i) => <li key={i}>{it}</li>)
                }
              </ul>
            </div>

            <div>
              <h4 className="text-2xl font-semibold mb-4">Job Requirements</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                {(career.jobRequirement || "")
                  .split(",")
                  .map((x) => x.trim())
                  .filter(Boolean)
                  .map((it, i) => <li key={i}>{it}</li>)
                }
              </ul>
            </div>
          </div>

          <div className="mt-6 flex justify-center md:justify-start">
            <button onClick={() => setShowApply(true)} className="px-6 py-2 text-sm font-medium rounded-full border-2 border-[#214B62] min-w-[140px] text-black bg-white hover:bg-[#214B62] hover:text-white transition">
              Apply Now
            </button>
          </div>
        </div>

        <div>
          <JobCarousel excludeId={career.id} />
        </div>
      </div>

      <AnimatePresence>
        {showApply && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={() => setShowApply(false)}>
            <motion.div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto" initial={{ scale: 0.8, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 40 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setShowApply(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl">✕</button>
              <h2 className="text-2xl font-semibold mb-6 text-center">Apply for this Position</h2>
              <ApplyForm jobId={career.id} onSubmitted={() => setShowApply(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}