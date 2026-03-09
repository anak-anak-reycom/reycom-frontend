// components/news-contentCompo/newsDescription.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { NewsItem } from "@/app/types/news-types";

type Props = { news: NewsItem };

export default function NewsDescription({ news }: Props) {

  const isHtml = typeof news.content === "string" && /<\/?[a-z][\s\S]*>/i.test(news.content);

 
  const idKey = useMemo(() => {
    return String((news as any).id ?? (news as any)._id ?? (news as any).slug ?? (news.title ?? "unknown")).replace(/\s+/g, "_");
  }, [news]);

 
  const serverViews = Number((news as any).views ?? 0);
  const localDeltaKey = `news_local_delta_${idKey}`; 
  const localPersistCountKey = `news_local_count_${idKey}`; 

  const [localDelta, setLocalDelta] = useState<number>(() => {
    
    try {
      if (typeof window === "undefined") return 0;
      const v = localStorage.getItem(localDeltaKey);
      return v ? Number(v) : 0;
    } catch {
      return 0;
    }
  });

  
  const displayedCount = serverViews > 0 ? serverViews + localDelta : (() => {
    
    try {
      if (typeof window === "undefined") return 0;
      const v = localStorage.getItem(localPersistCountKey);
      return v ? Number(v) : 0;
    } catch {
      return 0;
    }
  })();

 
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (serverViews > 0) {
        
        const seenFlag = localStorage.getItem(`news_seen_flag_${idKey}`);
        if (!seenFlag) {
          
          const newDelta = (Number(localStorage.getItem(localDeltaKey) ?? 0) || 0) + 1;
          localStorage.setItem(localDeltaKey, String(newDelta));
          localStorage.setItem(`news_seen_flag_${idKey}`, String(Date.now()));
          setLocalDelta(newDelta);
        }
      } else {
        
        const seenFlag = localStorage.getItem(`news_seen_flag_${idKey}`);
        if (!seenFlag) {
          const prev = Number(localStorage.getItem(localPersistCountKey) ?? 0) || 0;
          const next = prev + 1;
          localStorage.setItem(localPersistCountKey, String(next));
          localStorage.setItem(`news_seen_flag_${idKey}`, String(Date.now()));
          setLocalDelta(0); 
        }
      }
    } catch (e) {
    
    }
    
  }, [idKey, serverViews]); 

  
  const formattedDate = useMemo(() => {
    const raw = (news as any).date ?? (news as any).publishedAt ?? (news as any).createdAt ?? (news as any).publishDate ?? null;
    if (!raw) return "";
    const d = new Date(raw);
    
    try {
      return d.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" });
    } catch {
      return d.toLocaleDateString();
    }
  }, [news]);

  return (
    <section className="max-w-[900px] mx-auto px-4 pb-16">
      
      {isHtml ? (
        <div className="prose prose-lg mx-auto" dangerouslySetInnerHTML={{ __html: news.content as string }} />
      ) : (
        <div className="mx-auto">
          <div style={{ whiteSpace: "pre-line" }} className="text-base leading-relaxed">
            {news.content}
          </div>
        </div>
      )}

      
      <div className="mt-8 flex items-center gap-6 text-sm">
        <div className="font-semibold">{(news as any).location ?? "—"}, {formattedDate}</div>
        <div className="text-gray-600">Post View : <span className="font-medium text-gray-800">{displayedCount}</span></div>
      </div>
    </section>
  );
}