// components/CreateNews.tsx
'use client';

import React, { useState, useEffect } from "react";

const MAX_BYTES = 8 * 1024 * 1024; // optional UX check (8MB)

export default function CreateNews({ adminTokenProp }: { adminTokenProp?: string }) {


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [errors, setErrors] = useState<{ [k: string]: string }>({});
    const [sending, setSending] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const BASE_API = process.env.NEXT_PUBLIC_BASE_API ?? "";

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
        if (!imageFile) e.image = "Please choose an image file";
        if (imageFile && imageFile.size > MAX_BYTES) e.image = `File too large. Max ${(MAX_BYTES / (1024 * 1024)).toFixed(0)} MB.`;
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

            const url = `${BASE_API}/news`.replace("//news", "/news");


            const token =
                adminTokenProp ??
                (typeof window !== "undefined" ? localStorage.getItem("token") : null);

            const headers: Record<string, string> = {};
            if (token) headers["Authorization"] = `Bearer ${token}`;

            const res = await fetch(url, {
                method: "POST",
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
            setSuccessMsg("News created successfully.");
            setTitle("");
            setContent("");
            setImageFile(null);
            setPreview(null);
            setErrors({});
            console.log("createNews response:", data);
        } catch (err: any) {
            console.error("Create news failed:", err);
            setErrorMsg(err?.message ?? "Failed to create news");
        } finally {
            setSending(false);
        }
    }

    const inputClass =
        "w-full rounded-full border-2 border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#214B62]";
    const textareaClass =
        "w-full rounded-xl border-2 border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#214B62] min-h-[200px]";
    const labelClass = "block mb-2 font-medium";

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
                            const f = ev.target.files?.[0] ?? null;
                            setImageFile(f);
                            setErrors(prev => ({ ...prev, image: "" }));
                            setErrorMsg(null);
                            setSuccessMsg(null);
                        }}
                        className="block w-full"
                    />
                    {errors.image && <p id="err-image" className="text-sm text-red-600 mt-2">{errors.image}</p>}
                    {preview && (
                        <div className="mt-3">
                            <div className="text-sm mb-2">Preview:</div>
                            <img src={preview} alt="preview" className="max-h-48 rounded" />
                        </div>
                    )}
                </div>

                {/* Title */}
                <div className="mb-6">
                    <label htmlFor="title" className={labelClass}>News Title</label>
                    <input
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); setErrors(prev => ({ ...prev, title: "" })); setErrorMsg(null); setSuccessMsg(null); }}
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
                        name="content"
                        value={content}
                        onChange={(e) => { setContent(e.target.value); setErrors(prev => ({ ...prev, content: "" })); setErrorMsg(null); setSuccessMsg(null); }}
                        placeholder="Enter news content here"
                        className={textareaClass}
                    />
                    {errors.content && <p className="text-sm text-red-600 mt-2">{errors.content}</p>}
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#214B62] text-white text-lg font-medium py-3 disabled:opacity-60"
                        disabled={sending}
                    >
                        {sending ? "Creating..." : "Create"}
                    </button>
                </div>
            </form>
        </section>
    );
}