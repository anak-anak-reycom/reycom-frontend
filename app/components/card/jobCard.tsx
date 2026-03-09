// components/card/JobCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Timer, Calendar } from "lucide-react";
import jobImage from "@/public/jobImage.png";
import { CareerItem } from "@/app/types/career-types";

export const JobCard = ({
  career,
}: {
  career: CareerItem & { category?: { idCategory: number; nameCategory: string; jobType: string } };
}) => {
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

  const href = `/career/career-details/${career.id}`;

  return (
    <Link href={href} className="block w-full text-black">
      <article className="w-full">
        <div className="bg-white rounded-md p-5 shadow-md hover:shadow-lg transition-shadow duration-200 h-full flex flex-col">
          <div className="flex items-start gap-4 border-b border-gray-100 pb-4">
            <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden bg-gray-50 flex items-center justify-center">
              <Image src={jobImage}
                alt={career.jobName ?? "job"}
                width={80} height={80} 
                className=      "object-cover w-full h-full" />
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
        </div>
      </article>
    </Link>
  );
};

export default JobCard;