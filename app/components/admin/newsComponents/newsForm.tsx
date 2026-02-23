// components/news/NewsCreateForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {BASE_API} from "@/app/data/api";

export default function NewsCreateForm() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);



    useEffect(() => {
        // cleanup object URL
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const f = e.target.files?.[0] ?? null;
        if (!f) {
            setImageFile(null);
            setPreviewUrl(null);
            return;
        }

        if (!f.type.startsWith("image/")) {
            setError("Please upload an image file (png/jpg/jpeg).");
            return;
        }
        setImageFile(f);
        const url = URL.createObjectURL(f);
        setPreviewUrl(url);
    };

    const handleRemoveImage = () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setImageFile(null);
        setPreviewUrl(null);
    };

    const validate = () => {
        if (!title.trim()) {
            setError("Title is required.");
            return false;
        }
        if (!content.trim()) {
            setError("Description / content is required.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!validate()) return;

        setSubmitting(true);
        try {
            const fd = new FormData();
            fd.append("title", title.trim());
            fd.append("content", content.trim());
            // backend createNews expects `imageNews` -> send file under that key
            if (imageFile) fd.append("imageNews", imageFile);

            const submitUrl = BASE_API ? `${BASE_API}/news` : `/api/news`; // fallback to internal API route if BASE empty
            const res = await axios.post(submitUrl, fd, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // success path: adapt if your API returns other shape
            if (res.status === 200 || res.status === 201) {
                setSuccess("News created successfully.");
                // reset
                setTitle("");
                setContent("");
                handleRemoveImage();
                // optional: call parent callback or router push
            } else {
                setError(res.data?.message ?? "Unexpected response from server.");
            }
        } catch (err: any) {
            console.error(err);
            setError(err?.response?.data?.message ?? err?.message ?? "Failed to create news.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-[900px] mx-auto p-6 bg-white border-2 border-blue-200 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image upload center */}
                <div className="flex flex-col items-center">
                    <label className="block text-sm font-medium mb-2">Image</label>

                    <div className="w-full md:w-3/4 lg:w-2/3">
                        {previewUrl ? (
                            <div className="relative">
                                <img
                                    src={previewUrl}
                                    alt="preview"
                                    className="w-full h-64 object-cover rounded-md border"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-2 right-2 bg-white/90 text-sm px-2 py-1 rounded shadow"
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <label
                                htmlFor="news-image"
                                className="w-full cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md h-44 text-center p-4 hover:border-blue-400 transition"
                            >
                                <svg className="w-10 h-10 text-gray-400 mb-2" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 3v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M5 10l7-7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-sm text-gray-500">Click to upload image (png/jpg)</span>
                                <input
                                    id="news-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </div>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter news title"
                        className="w-full rounded-md border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                {/* Description / content large */}
                <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write the news content here..."
                        rows={10}
                        className="w-full rounded-md border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-vertical min-h-[200px]"
                    />
                </div>

                {/* messages */}
                {error && <div className="text-sm text-red-600">{error}</div>}
                {success && <div className="text-sm text-green-600">{success}</div>}

                {/* actions */}
                <div className="flex items-center justify-between gap-4">
                    <div className="text-sm text-gray-500">Preview will be uploaded with the news.</div>
                    <div>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex items-center px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 disabled:opacity-60"
                        >
                            {submitting ? "Saving..." : "Create News"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}