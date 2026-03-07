// components/card/JobCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Timer, Calendar } from "lucide-react";
import jobImage from "@/public/jobImage.png";
import type { CareerItem } from "@/app/types/career-types";
import { useRouter } from "next/navigation";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API; 

export const AdminJobCard = ({
  career,
}: {
  career: CareerItem & { category?: { idCategory: number; nameCategory: string; jobType: string } };
}) => {
  const router = useRouter();

  const rawJobType = career?.category?.jobType ?? "";
  const jobTypeNormalized = (() => {
    const s = String(rawJobType || "").toLowerCase();
    if (!s) return "Full Time";
    if (s.includes("full")) return "Full Time";
    if (s.includes("part")) return "Part Time";
    return rawJobType
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  })();

  

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    const yes = confirm("Are you sure to delete this job?");
    if (!yes) return;

    try {
      const res = await fetch(`${BASE_API}/career/${career.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to delete");
      // refresh page (server component akan re-fetch data)
      router.refresh();
      alert("Deleted");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  }

  function handleEdit(e: React.MouseEvent) {
    e.preventDefault();
    // contoh: redirect ke halaman edit atau open modal client-side
    router.push(`/admin/jobs/edit/${career.id}`);
  }

  return (
    <article className="w-full">
   
        <div className="bg-white rounded-md p-5 shadow-md hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
          <div className="flex items-start gap-4 border-b border-gray-100 pb-4">
            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden bg-gray-50 flex items-center justify-center">
              <Image src={jobImage} alt={career.jobName ?? "job"} width={80} height={80} className="object-cover w-full h-full" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg md:text-xl font-semibold leading-snug">{career.jobName}</h3>
              {career.category?.nameCategory && <div className="text-sm text-gray-500 mt-1">{career.category.nameCategory}</div>}
            </div>
          </div>

          <div className="mt-4 flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Timer size={20} />
              <span className="font-semibold">{jobTypeNormalized}</span>
            </div>

            <h4 className="text-sm font-semibold mb-1">Requirement</h4>
            <p className="text-sm text-gray-600 line-clamp-3">{career.jobDescription ?? "No description"}</p>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3 text-sm text-gray-500">
            <Calendar size={18} />
            <span>{career.jobDate ? new Date(career.jobDate).toLocaleDateString() : ""}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 p-4">
            <button
              type="button"
              onClick={handleEdit}
              className="px-1 py-2 text-white font-semibold rounded-xl bg-blue-600"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="px-1 py-2 text-white font-semibold rounded-xl bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
    </article>
  );
};

export default AdminJobCard;