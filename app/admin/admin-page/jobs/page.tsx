// admin/job/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminJobCard from "@/app/components/admin/jobList/jobList";
import CreateJobForm from "@/app/components/admin/jobList/createJob";
import EditJobForm from "@/app/components/admin/jobList/editJob";
import type { CareerItem } from "@/app/types/career-types";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API ?? "";


function ModalWrapper({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">{title}</h2>
        {children}
      </motion.div>
    </motion.div>
  );
}

type CareerWithCategory = CareerItem & {
  category?: { idCategory: number; nameCategory: string; jobType: string };
};

export default function JobList() {
  const [careers, setCareers] = useState<CareerWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // modal create
  const [showCreate, setShowCreate] = useState(false);

  // modal edit
  const [showEdit, setShowEdit] = useState(false);
  const [editJobId, setEditJobId] = useState<number | null>(null);

  async function fetchCareers() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_API}/career`);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const json = await res.json();
      setCareers(json.data ?? json);
    } catch (err: any) {
      console.error("Failed to load careers:", err);
      setError(err?.message ?? "Failed to load careers");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCareers();
  }, []);

  // lock scroll saat modal terbuka
  useEffect(() => {
    document.body.style.overflow = showCreate || showEdit ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [showCreate, showEdit]);

  // Escape key tutup semua modal
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowCreate(false);
        setShowEdit(false);
      }
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  function openEdit(id: number) {
    setEditJobId(id);
    setShowEdit(true);
  }

  return (
    <>
      <main className="min-h-screen">
        {loading && <div className="mb-4">Loading...</div>}
        {error && <div className="mb-4 text-red-600">Error: {error}</div>}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {!loading && careers.length === 0 ? (
            <div>Career not found</div>
          ) : (
            careers.map((c) => (
              <AdminJobCard
                key={c.id}
                career={c}
                onEdit={openEdit} // ← pass callback ke card
              />
            ))
          )}
        </div>

        <div className="flex justify-start mt-8">
          <button
            onClick={() => setShowCreate(true)}
            className="bg-linear-to-br from-green-700 to-green-500 px-4 py-2 text-white font-semibold rounded-xl"
          >
            + Add Job
          </button>
        </div>
      </main>

      <AnimatePresence>
        {showCreate && (
          <ModalWrapper title="Create Job" onClose={() => setShowCreate(false)}>
            <CreateJobForm
              onCreated={async () => {
                setShowCreate(false);
                await fetchCareers();
              }}
            />
          </ModalWrapper>
        )}

        {showEdit && editJobId !== null && (
          <ModalWrapper title="Edit Job" onClose={() => setShowEdit(false)}>
            <EditJobForm
              jobId={editJobId}
              onUpdated={async () => {
                setShowEdit(false);
                await fetchCareers();
              }}
            />
          </ModalWrapper>
        )}
      </AnimatePresence>
    </>
  );
}