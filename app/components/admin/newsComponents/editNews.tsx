// components/admin/newsComponents/editNews.tsx
'use client';

import React, { useState, useEffect } from "react";

const MAX_BYTES = 8 * 1024 * 1024;

export default function EditNews({
    newsId,
    adminTokenProp,
    onSuccess,
}: {
    newsId: number;
    adminTokenProp?: string;
    onSuccess?: () => void;
}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [existingImage, setExistingImage] = useState<string | null>(null);

    const [errors, setErrors] = useState<{ [k: string]: string }>({});
    const [sending, setSending] = useState(false);
    const [loading, setLoading] = useState(true);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const BASE_API = process.env.NEXT_PUBLIC_BASE_API ?? "";

    useEffect(() => {
        async function fetchNews() {
            try {
                const res = await fetch(`${BASE_API}/news/${newsId}`);
                const data = await res.json();
                const news = data.data;
                setTitle(news.title);
                setContent(news.content);
                setExistingImage(news.imageNews);
            } catch (err) {
                setErrorMsg("Failed to load news data.");
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, [newsId]);

    useEffect(() => {
        if (imageFile) {
            const url = URL.createObjectURL(imageFile);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
        }
        setPreview(null);
    }, [imageFile]);

    function validate() {
        const e: { [k: string]: string } = {};
        if (!title.trim()) e.title = "Title is required";
        if (!content.trim()) e.content = "Content is required";
        if (imageFile && imageFile.size > MAX_BYTES)
            e.image = `File too large. Max ${(MAX_BYTES / (1024 * 1024)).toFixed(0)} MB.`;
        return e;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrorMsg(null);
        setSuccessMsg(null);

        const v = validate();
        if (Object.keys(v).length > 0) {
            setErrors(v);
            return;
        }
        setErrors({});
        setSending(true);

        try {
            const fd = new FormData();
            fd.append("title", title);
            fd.append("content", content);
            if (imageFile) fd.append("image", imageFile, imageFile.name);

            const token =
                adminTokenProp ??
                (typeof window !== "undefined" ? localStorage.getItem("token") : null);

            const headers: Record<string, string> = {};
            if (token) headers["Authorization"] = `Bearer ${token}`;

            const res = await fetch(`${BASE_API}/news/${newsId}`, {
                method: "PATCH",
                headers,
                body: fd,
            });

            if (!res.ok) {
                const text = await res.text();
                try {
                    const j = JSON.parse(text);
                    throw new Error(j?.message || JSON.stringify(j));
                } catch {
                    throw new Error(text || res.statusText || "Request failed");
                }
            }

            const data = await res.json();
            setSuccessMsg("News updated successfully.");
            if (data?.data?.imageNews) setExistingImage(data.data.imageNews);
            setImageFile(null);
            onSuccess?.();
        } catch (err: any) {
            setErrorMsg(err?.message ?? "Failed to update news");
        } finally {
            setSending(false);
        }
    }

    const inputClass =
        "w-full rounded-full border-2 border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#214B62]";
    const textareaClass =
        "w-full rounded-xl border-2 border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#214B62] min-h-[200px]";
    const labelClass = "block mb-2 font-medium";

    if (loading) return <p className="text-center py-10">Loading...</p>;

    return (
        <section className="flex justify-center py-10">
            <form className="w-full max-w-[720px] px-4" onSubmit={handleSubmit} noValidate>
                {errorMsg && <div className="mb-4 text-sm text-red-600">{errorMsg}</div>}
                {successMsg && <div className="mb-4 text-sm text-green-600">{successMsg}</div>}

                {/* Image */}
                <div className="mb-6">
                    <label htmlFor="image" className={labelClass}>Image</label>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={(ev) => {
                            setImageFile(ev.target.files?.[0] ?? null);
                            setErrors(prev => ({ ...prev, image: "" }));
                        }}
                        className="block w-full"
                    />
                    {errors.image && <p className="text-sm text-red-600 mt-2">{errors.image}</p>}
                    {(preview || existingImage) && (
                        <div className="mt-3">
                            <div className="text-sm mb-2">
                                {preview ? "New image preview:" : "Current image:"}
                            </div>
                            <img
                                src={preview ?? existingImage!}
                                alt="preview"
                                className="max-h-48 rounded"
                            />
                        </div>
                    )}
                </div>

                {/* Title */}
                <div className="mb-6">
                    <label htmlFor="title" className={labelClass}>News Title</label>
                    <input
                        id="title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); setErrors(prev => ({ ...prev, title: "" })); }}
                        placeholder="Enter news title"
                        className={inputClass}
                    />
                    {errors.title && <p className="text-sm text-red-600 mt-2">{errors.title}</p>}
                </div>

                {/* Content */}
                <div className="mb-6">
                    <label htmlFor="content" className={labelClass}>News Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => { setContent(e.target.value); setErrors(prev => ({ ...prev, content: "" })); }}
                        placeholder="Enter news content here"
                        className={textareaClass}
                    />
                    {errors.content && <p className="text-sm text-red-600 mt-2">{errors.content}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-[#214B62] text-white text-lg font-medium py-3 disabled:opacity-60"
                    disabled={sending}
                >
                    {sending ? "Updating..." : "Update"}
                </button>
            </form>
        </section>
    );
}