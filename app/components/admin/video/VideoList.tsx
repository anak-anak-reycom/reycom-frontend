// app/components/admin/video/AdminVideoList.tsx
"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CreateVideo from "./CreateVideo";

type VideoItem = {
  id: number;
  titleVideo: string;
  linkVideo: string;
  createdAt?: string;
  updatedAt?: string;
};

function parseYouTubeId(url: string): string | null {
  if (!url) return null;
  try {
    const patterns = [
      /(?:v=|\/embed\/|youtu\.be\/|v\/|\/watch\?v=)([A-Za-z0-9_-]{6,})/,
      /youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/,
    ];
    for (const p of patterns) {
      const m = url.trim().match(p);
      if (m && m[1]) return m[1];
    }
    const parsed = new URL(url);
    return parsed.searchParams.get("v");
  } catch {
    return null;
  }
}

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
        className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl p-6"
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

export default function AdminVideoList() {
  const BASE_API = process.env.NEXT_PUBLIC_BASE_API ?? "";

  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  async function fetchVideos() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_API}/videos`);
      if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
      const json = await res.json();
      setVideos(json?.data ?? json);
    } catch (err: any) {
      setError(err?.message ?? "Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVideos();
  }, []);

 
  useEffect(() => {
    document.body.style.overflow = showCreate ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCreate]);

  
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setShowCreate(false);
    }
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Delete this video?")) return;
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    try {
      const res = await fetch(`${BASE_API}/video/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      if (!res.ok) throw new Error("Delete failed");
      await fetchVideos();
    } catch (err: any) {
      alert(err?.message ?? "Delete failed");
    }
  }

  return (
    <>
      <section className="py-10">
        <div className="mx-auto max-w-[1400px] px-4">
          <h2 className="mb-8 text-5xl font-sans font-semibold">
            Video <span className="text-secondary">Features</span>
          </h2>

          {loading && <div className="mb-4 text-gray-500">Loading...</div>}
          {error && <div className="mb-4 text-red-600">Error: {error}</div>}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((item) => {
              const ytId = parseYouTubeId(item.linkVideo);
              const thumb = ytId
                ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
                : null;

              return (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-xl bg-white shadow-sm flex flex-col"
                >
           
                  <div className="w-full h-48 bg-gray-100 relative overflow-hidden">
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={item.titleVideo}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        No preview
                      </div>
                    )}
                
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/40 rounded-full w-12 h-12 flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-white ml-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                 
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-base mb-1 line-clamp-2">
                      {item.titleVideo}
                    </h3>
                   
                    <a
                      href={item.linkVideo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:underline truncate mb-3"
                    >
                      {item.linkVideo}
                    </a>
                    <p className="text-xs text-gray-400 mt-auto">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : ""}
                    </p>
                  </div>

                
                  <div className="grid grid-cols-1 gap-3 p-4 pt-0">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-gradient-to-br from-red-700 to-red-500 px-1 py-2 text-white font-semibold rounded-xl"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {!loading && videos.length === 0 && (
            <div className="text-center py-12 text-gray-500">No videos yet.</div>
          )}

          <div className="flex justify-start mt-8">
            <button
              onClick={() => setShowCreate(true)}
              className="bg-gradient-to-br from-green-700 to-green-500 px-4 py-2 text-white font-semibold rounded-xl"
            >
              + Add Video
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showCreate && (
          <ModalWrapper title="Add Video" onClose={() => setShowCreate(false)}>
            <CreateVideo
              onCreated={async () => {
                setShowCreate(false);
                await fetchVideos();
              }}
            />
          </ModalWrapper>
        )}
      </AnimatePresence>
    </>
  );
}
