// components/news-contentCompo/newsDescription.tsx
"use client";

import React from "react";
import { NewsItem } from "@/app/types/news-types";

export default function NewsDescription({ news }: { news: NewsItem }) {
    // jika konten adalah HTML (rich text) — gunakan dangerouslySetInnerHTML
    const isHtml = typeof news.content === "string" && /<\/?[a-z][\s\S]*>/i.test(news.content);

    return (
        <section className="max-w-[900px] mx-auto px-4 pb-16">
            <div className="prose prose-lg mx-auto">
                {isHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: news.content as string }} />
                ) : (
                    <p className="text-base leading-relaxed">{news.content}</p>
                )}
            </div>
        </section>
    );
}