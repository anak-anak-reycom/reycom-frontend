'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Card from "@/public/card.png";
import { motion, AnimatePresence } from "framer-motion";
import CreateNews from "@/app/components/admin/newsComponents/newsForm";
import EditNews from "@/app/components/admin/newsComponents/editNews";

type NewsItem = {
    id: number;
    title: string;
    content: string;
    imageNews?: string | null;
    imageNewsPublicId?: string | null;
};

// reusable modal wrapper supaya tidak duplikat JSX
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

export default function NewsDataClientPage() {
    const BASE_API = process.env.NEXT_PUBLIC_BASE_API ?? "";

    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // modal create
    const [showCreate, setShowCreate] = useState(false);

    // modal edit
    const [showEdit, setShowEdit] = useState(false);
    const [editNewsId, setEditNewsId] = useState<number | null>(null);

    async function fetchNews() {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${BASE_API}/news`);
            if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
            const json = await res.json();
            setNews(json.data ?? json);
        } catch (err: any) {
            setError(err?.message ?? "Failed to fetch news");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNews();
    }, []);

    // lock scroll saat salah satu modal terbuka
    useEffect(() => {
        document.body.style.overflow = (showCreate || showEdit) ? "hidden" : "auto";
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
        setEditNewsId(id);
        setShowEdit(true);
    }

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
            await fetchNews();
        } catch (err: any) {
            alert(err?.message ?? "Delete failed");
        }
    }

    const adminToken =
        typeof window !== "undefined"
            ? localStorage.getItem("token") ?? undefined
            : undefined;

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
                                        onClick={() => openEdit(item.id)}
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

            <AnimatePresence>
                {showCreate && (
                    <ModalWrapper title="Create News" onClose={() => setShowCreate(false)}>
                        <CreateNews
                            adminTokenProp={adminToken}
                            onSuccess={async () => {
                                setShowCreate(false);
                                await fetchNews();
                            }}
                        />
                    </ModalWrapper>
                )}

                {showEdit && editNewsId !== null && (
                    <ModalWrapper title="Edit News" onClose={() => setShowEdit(false)}>
                        <EditNews
                            newsId={editNewsId}
                            adminTokenProp={adminToken}
                            onSuccess={async () => {
                                setShowEdit(false);
                                await fetchNews();
                            }}
                        />
                    </ModalWrapper>
                )}
            </AnimatePresence>
        </>
    );
}