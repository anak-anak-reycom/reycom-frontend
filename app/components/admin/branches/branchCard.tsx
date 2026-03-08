// app/components/admin/branches/BranchCard.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Calendar, X } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import jobImage from "@/public/jobImage.png";
import EditBranchCard from "@/app/components/admin/branches/editBranch";

export type Branch = {
  id: number;
  companyId?: number;
  nameBranch: string;
  streetAddress?: string;
  linkMap?: string | null;
  phone?: string;
  email?: string;
  website?: string;
  createdAt?: string;
  updatedAt?: string;
};

export default function BranchCard({ branch }: { branch: Branch }) {
  const router = useRouter();
  const BASE_API = process.env.NEXT_PUBLIC_BASE_API ?? "";
  const [isEditing, setIsEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    const ok = confirm(`Delete branch "${branch.nameBranch}"?`);
    if (!ok) return;

    setError(null);
    setDeleting(true);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const headers: any = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      // endpoint assumed: DELETE /branch/:id
      const res = await axios.delete(`${BASE_API}/branch/${branch.id}`, { headers });
      // check success loosely
      if (res.status >= 200 && res.status < 300) {
        // refresh parent page so server-side list re-fetches (if using app router server fetch)
        router.refresh();
      } else {
        throw new Error(`Delete failed (status ${res.status})`);
      }
    } catch (err: any) {
      console.error("Delete failed", err);
      setError(err?.response?.data?.message ?? err?.message ?? "Failed to delete branch");
    } finally {
      setDeleting(false);
    }
  }

  function onUpdated() {
    // close modal and refresh list
    setIsEditing(false);
    router.refresh();
  }

  return (
    <>
      <article className="py-5 px-5 rounded-md bg-white hover:bg-gray-100 duration-300 shadow-[0px_0px_10px_1px_#cbd5e0]">
        <div className="grid grid-cols-1 text-center">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex gap-4 border-b-2 border-gray-200 pb-3 w-full">
              <div className="w-[120px] h-[120px] md:w-[70px] md:h-[70px] flex-shrink-0 flex items-center">
                <Image
                  src={jobImage}
                  alt={branch.nameBranch || "branch"}
                  width={70}
                  height={70}
                  className="object-cover rounded"
                />
              </div>

              <div className="flex-1 flex flex-col justify-center text-center md:text-left">
                <h3 className="text-lg md:text-2xl font-semibold">{branch.nameBranch}</h3>
                {branch.streetAddress && <p className="text-sm text-gray-600">{branch.streetAddress}</p>}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col md:flex-row md:justify-between gap-2 text-sm w-full">
            <div className="space-y-1 text-left">
              {branch.phone && (
                <div>
                  <span className="font-semibold">Phone: </span>
                  {branch.phone}
                </div>
              )}
              {branch.email && (
                <div>
                  <span className="font-semibold">Email: </span>
                  {branch.email}
                </div>
              )}
              {branch.website && (
                <div>
                  <span className="font-semibold">Website: </span>
                  <a
                    className="text-blue-600"
                    href={branch.website.startsWith("http") ? branch.website : `https://${branch.website}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {branch.website}
                  </a>
                </div>
              )}
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
                <Calendar size={18} />
                <span>{branch.createdAt ? new Date(branch.createdAt).toLocaleDateString() : ""}</span>
              </div>
            </div>
          </div>

          {/* Map / embed */}
          <div className="mt-4">
            {branch.linkMap ? (
              <iframe
                title={`map-${branch.id}`}
                className="border-2 w-full h-48"
                src={branch.linkMap}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="border-2 w-full h-48 flex items-center justify-center text-gray-400">No map available</div>
            )}
          </div>

          {/* actions */}
          <div className="grid grid-cols-2 gap-3 p-4">
            <button
              className="bg-blue-600 px-2 py-2 text-white font-semibold rounded-xl"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button
              className="bg-red-600 px-2 py-2 text-white font-semibold rounded-xl"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>

          {error && <div className="text-sm text-red-600 px-4 pb-4">{error}</div>}
        </div>
      </article>

      {/* Modal for edit */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsEditing(false)}
            aria-hidden
          />
          <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 z-10 overflow-auto max-h-[90vh]">
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-full hover:bg-gray-100"
                aria-label="Close edit"
              >
                <X size={18} />
              </button>
            </div>

            <EditBranchCard
              branchId={branch.id}
              onUpdated={onUpdated}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}