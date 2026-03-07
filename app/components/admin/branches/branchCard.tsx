// app/components/admin/branches/BranchCard.tsx
"use client"
import Image from "next/image";
import { Calendar } from "lucide-react";
import jobImage from "@/public/jobImage.png";

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

export type Country = {

}

export default function BranchCard({ branch }: { branch: Branch }) {
  return (
    <article className="py-5 px-5 rounded-md bg-white hover:bg-gray-100 duration-300 shadow-[0px_0px_10px_1px_#cbd5e0]">
      <div className="grid grid-cols-1 text-center">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex gap-4 border-b-2 border-gray-200 pb-3 w-full">
            

            <div className="flex-1 flex flex-col justify-center text-center md:text-left">
              <h3 className="text-lg md:text-2xl font-semibold">
                {branch.nameBranch}
              </h3>
              {branch.streetAddress && (
                <p className="text-sm text-gray-600">{branch.streetAddress}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col md:flex-row md:justify-between gap-2 text-sm w-full">
          <div className="space-y-1 text-left">
            {branch.phone && <div><span className="font-semibold">Phone: </span>{branch.phone}</div>}
            {branch.email && <div><span className="font-semibold">Email: </span>{branch.email}</div>}
            {branch.website && (
              <div>
                <span className="font-semibold">Website: </span>
                <a className="text-blue-600" href={branch.website.startsWith("http") ? branch.website : `https://${branch.website}`} target="_blank" rel="noreferrer">
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
            <div className="border-2 w-full h-48 flex items-center justify-center text-gray-400">
              No map available
            </div>
          )}
        </div>

        {/* actions */}
        <div className="grid grid-cols-2 gap-3 p-4">
          <button
            className="bg-blue-600 px-2 py-2 text-white font-semibold rounded-xl"
            onClick={() => alert("Edit not implemented in this example")}
          >
            Edit
          </button>

          <button
            className="bg-red-600 px-2 py-2 text-white font-semibold rounded-xl"
            onClick={() => alert("Delete not implemented in this example")}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}