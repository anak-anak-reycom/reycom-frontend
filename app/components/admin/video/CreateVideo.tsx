// app/components/admin/video/CreateVideoCard.tsx
"use client";

import React, { useState } from "react";
import axios from "axios";

function parseYouTubeId(url: string): string | null {
  try {
    const u = url.trim();
    const patterns = [
      /(?:v=|\/embed\/|youtu\.be\/|v\/|\/watch\?v=)([A-Za-z0-9_-]{6,})/,
      /youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/,
    ];
    for (const p of patterns) {
      const m = u.match(p);
      if (m && m[1]) return m[1];
    }
    return new URL(u).searchParams.get("v");
  } catch {
    return null;
  }
}

export default function CreateVideoCard({ onCreated }: { onCreated?: () => void }) {
  const BASE_API = process.env.NEXT_PUBLIC_BASE_API ?? "";

  const [titleVideo, setTitleVideo] = useState("");
  const [linkVideo, setLinkVideo] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const inputClass =
    "w-full rounded-full border-2 border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#214B62]";
  const labelClass = "block mb-2 font-medium";

  
  const previewId = linkVideo.trim() ? parseYouTubeId(linkVideo) : null;

  function validate() {
    if (!titleVideo.trim()) return "Title is required";
    if (!linkVideo.trim()) return "YouTube link is required";
    if (!parseYouTubeId(linkVideo)) return "Link YouTube tidak valid";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const v = validate();
    if (v) { setErrorMsg(v); return; }

    setSubmitting(true);
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      await axios.post(
        `${BASE_API}/videos`,
        { title_video: titleVideo.trim(), link_video: linkVideo.trim() },
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );

      setSuccessMsg("Video added successfully.");
      setTitleVideo("");
      setLinkVideo("");
      onCreated?.();
    } catch (err: any) {
      const srv = err?.response?.data;
      let message = "Failed to add video";
      if (srv) {
        if (typeof srv === "string") message = srv;
        else if (srv.message) message = srv.message;
        else message = JSON.stringify(srv);
      } else if (err?.message) message = err.message;
      setErrorMsg(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-[560px] mx-auto">
      {errorMsg && <div className="mb-4 text-sm text-red-600">{errorMsg}</div>}
      {successMsg && <div className="mb-4 text-sm text-green-600">{successMsg}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className={labelClass}>Video Title</label>
          <input
            value={titleVideo}
            onChange={(e) => setTitleVideo(e.target.value)}
            placeholder="e.g. Company Profile 2025"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>YouTube Link</label>
          <input
            value={linkVideo}
            onChange={(e) => setLinkVideo(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className={inputClass}
          />
          {/* preview thumbnail otomatis */}
          {previewId && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Preview:</p>
              <img
                src={`https://img.youtube.com/vi/${previewId}/hqdefault.jpg`}
                alt="thumbnail preview"
                className="w-full max-h-48 object-cover rounded-xl border"
              />
            </div>
          )}
          {linkVideo.trim() && !previewId && (
            <p className="text-xs text-red-500 mt-1">Link YouTube tidak dikenali</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-[#214B62] text-white text-lg font-medium py-3 disabled:opacity-60"
        >
          {submitting ? "Adding..." : "Add Video"}
        </button>
      </form>
    </div>
  );
}