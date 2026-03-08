// app/video/page.tsx
import React from "react";
import VideoGallery from "@/app/components/video/VideoGallery";
import { BASE_API } from "../data/api";

type VideoItem = {
  id: number;
  titleVideo: string;
  linkVideo: string;
  createdAt?: string;
  updatedAt?: string;
};

export default async function VideoPage() {
 
  const res = await fetch(`${BASE_API}/videos`, { cache: "no-store" }); // ganti endpoint jika berbeda
  if (!res.ok) {
    return (
      <main className="min-h-screen p-8">
        <div className="text-red-600">Gagal memuat videos (status {res.status})</div>
      </main>
    );
  }

  const json = await res.json();
  const videos: VideoItem[] = (json?.data ?? []) as VideoItem[];

  return (
    <main className="min-h-screen p-6 bg-zinc-50">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Videos</h1>
        <VideoGallery videos={videos} />
      </div>
    </main>
  );
}