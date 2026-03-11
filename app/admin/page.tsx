// app/admin/page.tsx
import React from "react";
// removed Breadcrumb import since unused
import { Users, MapPin, Newspaper, Briefcase } from "lucide-react";

import { getAllBranch } from "../data/branch";
import { getAllApplier } from "../data/apply";
import { getAllCareer } from "../data/career";
import { getAllNews } from "../data/news";

function countFrom(result: any): number {
  if (!result) return 0;
  if (Array.isArray(result)) return result.length;
  if (Array.isArray(result?.data)) return result.data.length;
  if (Array.isArray(result?.data?.data)) return result.data.data.length;
  if (typeof result.total === "number") return result.total;
  if (typeof result?.meta?.total === "number") return result.meta.total;
  return 0;
}

export default async function AdminPage() {
  let branchesCount = 0;
  let appliersCount = 0;
  let careersCount = 0;
  let newsCount = 0;

  try {
    const [branchesRes, appliersRes, careersRes, newsRes] = await Promise.all([
      getAllBranch(),
      getAllApplier(),
      getAllCareer(),
      getAllNews(),
    ]);

    branchesCount = countFrom(branchesRes);
    appliersCount = countFrom(appliersRes);
    careersCount = countFrom(careersRes);
    newsCount = countFrom(newsRes);
  } catch (err) {
  
    console.error("Failed to load admin", err);
  }

  const cardCommon =
    "rounded-2xl p-6 shadow-md text-white flex flex-col justify-between min-h-[140px]";

  
  const gradient = "bg-gradient-to-r from-[#214B62] to-[#4AA3CF]";

  return (
    <main className="min-h-screen bg-white ">
      <div className="max-w-[1200px] mx-auto px-4">
      

        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview — quick stats</p>
        </div>

        
        <div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">

           
            <div className={`${cardCommon} ${gradient}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm opacity-90">Appliers</div>
                  <div className="mt-4 text-4xl font-bold">{appliersCount}</div>
                </div>
                <div className="p-3 bg-white/10 rounded-lg">
                  <Users size={36} />
                </div>
              </div>
              <div className="text-xs opacity-90 mt-4">Total applicants submitted</div>
            </div>

           
            <div className={`${cardCommon} ${gradient}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm opacity-90">Branches</div>
                  <div className="mt-4 text-4xl font-bold">{branchesCount}</div>
                </div>
                <div className="p-3 bg-white/10 rounded-lg">
                  <MapPin size={36} />
                </div>
              </div>
              <div className="text-xs opacity-90 mt-4">Total branches / offices</div>
            </div>

            
            <div className={`${cardCommon} ${gradient}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm opacity-90">News</div>
                  <div className="mt-4 text-4xl font-bold">{newsCount}</div>
                </div>
                <div className="p-3 bg-white/10 rounded-lg">
                  <Newspaper size={36} />
                </div>
              </div>
              <div className="text-xs opacity-90 mt-4">Published news & announcements</div>
            </div>

           
            <div className={`${cardCommon} ${gradient}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm opacity-90">Jobs</div>
                  <div className="mt-4 text-4xl font-bold">{careersCount}</div>
                </div>
                <div className="p-3 bg-white/10 rounded-lg">
                  <Briefcase size={36} />
                </div>
              </div>
              <div className="text-xs opacity-90 mt-4">Open positions / careers</div>
            </div>


          </div>
        </div>
      </div>
    </main>
  );
}