// app/admin/branches/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BranchCard, { Branch } from "@/app/components/admin/branches/branchCard";
import CreateBranchCard from "@/app/components/admin/branches/createBranch";
import { BASE_API } from "@/app/data/api";

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

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showCreate, setShowCreate] = useState(false);

  async function fetchBranches() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_API}/branch`);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const json = await res.json();
      setBranches(json?.data ?? json);
    } catch (err: any) {
      setError(err?.message ?? "Gagal memuat data branches");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    document.body.style.overflow = showCreate ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [showCreate]);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setShowCreate(false);
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  if (loading) return <div className="min-h-screen p-8">Loading...</div>;
  if (error) return <div className="min-h-screen p-8 text-red-600">{error}</div>;

  return (
    <>
      <main className="min-h-screen p-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 gap-4">
          {branches.length === 0 ? (
            <div>Tidak ada branch.</div>
          ) : (
            branches.map((b) => <BranchCard key={b.id} branch={b} />)
          )}
        </div>

        <div className="flex justify-start mt-8">
          <button
            onClick={() => setShowCreate(true)}
            className="bg-linear-to-br from-green-700 to-green-500 px-4 py-2 text-white font-semibold rounded-xl"
          >
            + Add Branch
          </button>
        </div>
      </main>

      <AnimatePresence>
        {showCreate && (
          <ModalWrapper title="Create Branch" onClose={() => setShowCreate(false)}>
            <CreateBranchCard
              onCreated={async () => {
                setShowCreate(false);
                await fetchBranches();
              }}
            />
          </ModalWrapper>
        )}
      </AnimatePresence>
    </>
  );
}