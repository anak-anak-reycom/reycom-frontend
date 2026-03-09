// components/news-contentCompo/newsDescription.tsx
"use client";

import React from "react";
import { NewsItem } from "@/app/types/news-types";

export default function NewsDescription({ news }: { news: NewsItem }) {
  const isHtml = typeof news.content === "string" && /<\/?[a-z][\s\S]*>/i.test(news.content);

  if (isHtml) {
    return (
      <section className="max-w-[900px] mx-auto px-4 pb-16">
        <div className="prose prose-lg mx-auto" dangerouslySetInnerHTML={{ __html: news.content as string }} />
      </section>
    );
  }

  
  return (
    <section className="max-w-[900px] mx-auto px-4 pb-16\\">
      <div className="mx-auto">
        <div style={{ whiteSpace: "pre-line"  }} className="text-base leading-relaxed">
          {news.content}
        </div>
      </div>
    </section>
  );
}