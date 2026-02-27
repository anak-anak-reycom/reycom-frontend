'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Card from "@/public/card.png";
import { Timer, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CreateNews from "@/app/components/admin/newsComponents/newsForm"; // sesuaikan path bila perlu

type NewsItem = {
    id: number;
    title: string;
    content: string;
    imageNews?: string | null;
    imageNewsPublicId?: string | null;
};

export default function NewsDataClientPage() {
    const BASE_API = process.env.NEXT_PUBLIC_BASE_API ?? "";

    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // modal
    const [showCreate, setShowCreate] = useState(false);

    // fetch news
    async function fetchNews() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${BASE_API}/news`);
            if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
            const json = await res.json();
            // expected shape: { success, message, data: [...] }
            setNews(json.data ?? json);
        } catch (err: any) {
            console.error("fetchNews error:", err);
            setError(err?.message ?? "Failed to fetch news");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNews();
    }, []);

    // lock scroll when modal open
    useEffect(() => {
        document.body.style.overflow = showCreate ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showCreate]);

    // close on ESC
    useEffect(() => {
        function handleEsc(e: KeyboardEvent) {
            if (e.key === "Escape") setShowCreate(false);
        }
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    // client delete (calls backend DELETE /news/:id) — needs token
    async function handleDelete(id: number) {
        if (!confirm("Delete this news?")) return;
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        try {
            const res = await fetch(`${BASE_API}/news/${id}`, {
                method: "DELETE",
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            });
            if (!res.ok) {
                const txt = await res.text();
                throw new Error(txt || res.statusText || "Delete failed");
            }
            // refetch
            await fetchNews();
        } catch (err: any) {
            console.error("Delete failed:", err);
            alert(err?.message ?? "Delete failed");
        }
    }


    return (
        <>
            <section className="py-10">
                <div className="mx-auto max-w-[1400px] px-4">
                    <h2 className="mb-8 text-5xl font-sans font-semibold">
                        News <span className="text-secondary">Features</span>
                    </h2>

                    {loading && <div className="mb-4">Loading...</div>}
                    {error && <div className="mb-4 text-red-600">Error: {error}</div>}

                    <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
                        {news.map((item) => (
                            <div key={item.id} className="overflow-hidden rounded-xl bg-white shadow-sm">
                                {/* Next Image: external domains must be configured in next.config.js for remote images */}
                                <Image
                                    src={item.imageNews || Card}
                                    alt={item.title}
                                    width={400}
                                    height={250}
                                    className="w-full object-cover"
                                />

                                <div className="p-5">
                                    <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>

                                    <p className="mb-4 text-sm text-secondary line-clamp-3">
                                        {item.content}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3 p-4">
                                    <button
                                        className="bg-linear-to-br from-blue-700 to-blue-500 px-1 py-2 text-white font-semibold rounded-xl"
                                        // editing could open another modal; not implemented here
                                        onClick={() => alert("Edit not implemented in this example")}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="bg-linear-to-br from-red-700 to-red-500 px-1 py-2 text-white font-semibold rounded-xl"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Add News button - opens modal (inline CreateNews) */}
                    <div className="flex justify-start mt-8">
                        <button
                            onClick={() => setShowCreate(true)}
                            className="bg-linear-to-br from-green-700 to-green-500 px-4 py-2 text-white font-semibold rounded-xl"
                        >
                            + Add News
                        </button>
                    </div>
                </div>
            </section>

            {/* modal using framer-motion (like JobDetails example) */}
            <AnimatePresence>
                {showCreate && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setShowCreate(false)}
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
                                onClick={() => setShowCreate(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl"
                            >
                                ✕
                            </button>

                            <h2 className="text-2xl font-semibold mb-6 text-center">Create News</h2>

                            {/* CreateNews component will POST to backend and handle upload.
                  We pass admin token (from localStorage) and onSuccess to close modal + refetch */}
                            <CreateNews
                                adminTokenProp={typeof window !== "undefined" ? localStorage.getItem("token") ?? undefined : undefined}
                                onSuccess={async () => {
                                    setShowCreate(false);
                                    await fetchNews(); // refresh list after create
                                }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}