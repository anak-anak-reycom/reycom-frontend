"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

export type NewsItem = {
  id: number | string;
  title?: string | null;
  content?: string | null;
  imageNews?: string | null;
  createdAt?: string | Date | null;
};

export default function NewsCarousel({ news }: { news: NewsItem[] }) {
  const [index, setIndex] = useState(0);

  const length = news?.length ?? 0;

  
  const at = (i: number) => {
    if (!length) return null;
    const mod = ((i % length) + length) % length;
    return news[mod];
  };

  const prevItem = at(index - 1);
  const nextItem = at(index + 1);

  const goPrev = () => setIndex((i) => (i - 1 + length) % length);
  const goNext = () => setIndex((i) => (i + 1) % length);

  const formatDate = (d?: string | Date | null) => {
    if (!d) return "";
    const dt = typeof d === "string" ? new Date(d) : d;
    if (isNaN(dt.getTime())) return "";
    return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  };

  const excerpt = (s?: string | null, max = 80) => {
    if (!s) return "";
    const t = s.replace(/\s+/g, " ").trim();
    return t.length > max ? t.slice(0, max).trim() + "…" : t;
  };

  const card = (item: NewsItem | null, label: "Prev" | "Next" = "Prev") => {
    const fallback = "/card.png"; 
    if (!item) {
      return (
        <div className="flex-1 p-4 bg-gray-50 rounded-lg shadow-sm min-h-[120px] flex items-center justify-center">
          <div className="text-center text-sm text-gray-500">No news</div>
        </div>
      );
    }
    return (
      <div className="flex-1 bg-white rounded-lg shadow-sm p-4 min-h-[140px] flex gap-4">
        <div className="flex-shrink-0 w-[90px] h-[90px] rounded-md overflow-hidden bg-gray-100">
          <Image
            src={item.imageNews || fallback}
            alt={item.title ?? "news"}
            width={90}
            height={90}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex-1">
          <div className="text-xs text-gray-400 mb-1">{label}</div>
          <h3 className="text-lg font-semibold leading-snug mb-1">{item.title ?? "Untitled"}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{excerpt(item.content, 120)}</p>
          <div className="mt-3 text-xs text-gray-400">{formatDate(item.createdAt)}</div>
        </div>
      </div>
    );
  };

  // small keyboard handlers
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  };

  return (
    <section className="w-full py-4" tabIndex={0} onKeyDown={onKey}>
      <div className="max-w-[1000px] mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">News</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          
          <div>{card(prevItem, "Prev")}</div>
          <div>{card(nextItem, "Next")}</div>

        </div>

      </div>
    </section>
  );
}