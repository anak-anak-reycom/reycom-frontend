// components/news-contentCompo/newsHeader.tsx
"use client";

import React from "react";
import Image from "next/image";
import { NewsItem } from "@/app/types/news-types";

export default function NewsHeader({ news }: { news: NewsItem }) {
    return (
        <section className="w-full py-10">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 gap-3">
                    <div className="mx-auto w-full flex justify-center">
                        <div className="relative w-full mx-auto max-w-[720px]">
                            <Image
                                src={news.imageNews || "/news-img.png"}
                                alt={news.title}
                                width={700}
                                height={400}
                                className="rounded-3xl shadow-2xl object-cover w-180 h-auto"
                                priority
                                sizes="(min-width:1024px) 700px, 100vw"
                            />
                        </div>
                    </div>

                    <div className="text-center mx-auto max-w-[700px]">
                        <div className="mx-auto w-24 h-0.5 rounded mb-1 bg-gray-300" />

                        <h1 className="text-3xl font-semibold mb-4">{news.title}</h1>

                        
                    </div>
                </div>
            </div>
        </section>
    );
}