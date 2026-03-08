// app/components/video/VideoGallery.tsx
"use client";

import React, { useMemo, useState } from "react";

type VideoItem = {
  id: number;
  titleVideo: string;
  linkVideo: string;
  createdAt?: string;
  updatedAt?: string;
};

function parseYouTubeId(url: string | undefined): string | null {
  if (!url) return null;
  try {
    
    const u = url.trim();
    
    const patterns = [
      /(?:v=|\/embed\/|youtu\.be\/|v\/|\/watch\?v=)([A-Za-z0-9_-]{6,})/, // generic
      /youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/,
    ];
    for (const p of patterns) {
      const m = u.match(p);
      if (m && m[1]) return m[1];
    }
    
    const parsed = new URL(u);
    const v = parsed.searchParams.get("v");
    if (v) return v;
    return null;
  } catch {
    return null;
  }
}

export default function VideoGallery({ videos }: { videos: VideoItem[] }) {
  
  const items = useMemo(() => {
    return videos
      .map((v) => {
        const id = parseYouTubeId(v.linkVideo);
        return { ...v, ytId: id };
      })
      .filter((v) => v.ytId); 
  }, [videos]);

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  
  if (!items.length) {
    return <div className="p-4 text-gray-600">No videos available.</div>;
  }

  const selected = items[selectedIndex] ?? items[0];
  const embedUrl = `https://www.youtube.com/embed/${selected.ytId}?autoplay=1&rel=0`;

  return (
    <div className="space-y-6">
     
      <div className="w-full aspect-[16/9] bg-black rounded-lg overflow-hidden shadow">
        <iframe
          title={selected.titleVideo || `video-${selected.id}`}
          src={embedUrl}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

     
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{selected.titleVideo}</h2>
          <p className="text-sm text-gray-500">{selected.createdAt ? new Date(selected.createdAt).toLocaleDateString() : ""}</p>
        </div>
        <div className="text-sm text-gray-600">{items.length} videos</div>
      </div>

      {/* ----------------Thumbnail-------------------- */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((it, i) => {
          const thumb = `https://img.youtube.com/vi/${it.ytId}/hqdefault.jpg`;
          const isActive = i === selectedIndex;
          return (
            <button
              key={it.id}
              onClick={() => setSelectedIndex(i)}
              className={`flex flex-col items-center text-left rounded-lg overflow-hidden shadow-sm transition transform hover:scale-[1.02] focus:outline-none ${isActive ? "ring-2 ring-[#214B62]" : "bg-white"}`}
            >
              <div className="w-full h-24 md:h-20 lg:h-24 relative">
                <img src={thumb} alt={it.titleVideo} className="object-cover w-full h-full" />
              </div>
              <div className="px-2 py-2 text-xs md:text-sm w-full">
                <div className="truncate">{it.titleVideo}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}