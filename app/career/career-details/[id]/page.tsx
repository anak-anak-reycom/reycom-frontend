// app/career/career-details/[id]/page.tsx
import React from "react";
import JobDetails from "@/app/components/jobDetails/jobDetails"; // client component
import { getCareerById } from "@/app/data/career";

export const metadata = { title: "Career Details" };

type Props = {
  params: any | Promise<any>;
};

export default async function CareerDetailsPage({ params }: Props) {

  const p = await params;


  const idStr = p?.id ?? "";
  if (!idStr) {
    return (
      <main className="min-h-screen p-8">
        <div className="text-center text-gray-600">
          <p><strong>Invalid career id</strong></p>
          <p className="mt-2 text-sm">Received: <code>{JSON.stringify(p)}</code></p>
          <p className="mt-2 text-sm">Make sure URL is /career/career-details/&lt;numeric id&gt;</p>
        </div>
      </main>
    );
  }

  const id = Number(idStr);
  if (Number.isNaN(id)) {
    return <main className="min-h-screen p-8">Invalid numeric id: {String(idStr)}</main>;
  }


  try {
    const career = await getCareerById(id);
    if (!career) {
      return <main className="min-h-screen p-8">Career not found (id: {id})</main>;
    }


    return (
      <main className="min-h-screen">
        <JobDetails career={career} />
      </main>
    );
  } catch (err: any) {
    console.error("Failed to fetch career:", err);
    return <main className="min-h-screen p-8">Failed to load career: {String(err?.message ?? err)}</main>;
  }
}