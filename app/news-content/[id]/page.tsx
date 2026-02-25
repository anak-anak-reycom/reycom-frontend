// app/news-content/[id]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import { getNewsById } from "@/app/data/news";
import NewsHeader from "@/app/components/news-contentCompo/newsHeader";
import NewsDescription from "@/app/components/news-contentCompo/newsDescription";

export default async function NewsContentPage({ params }: { params: any }) {

    const resolvedParams = await params;
    const rawId = resolvedParams?.id;
    const id = Number(rawId);

    if (Number.isNaN(id)) {
        console.error(`[news-content] invalid id param: "${rawId}"`);
        return notFound();
    }

    try {
        const news = await getNewsById(id);
        if (!news) {
            console.warn(`[news-content] no news found for id=${id}`);
            return notFound();
        }

        return (
            <main className="min-h-screen">
                <NewsHeader news={news} />
                <NewsDescription news={news} />
            </main>
        );
    } catch (err: any) {
        console.error("[news-content] failed to load news:", err?.message ?? err, err?.response ?? err);
        return (
            <main className="min-h-screen flex items-center justify-center p-8">
                <div className="max-w-xl text-center">
                    <h2 className="text-2xl font-semibold mb-4">Failed to load news</h2>
                    <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto">
            {String(err?.message ?? JSON.stringify(err?.response ?? err))}
          </pre>
                    <p className="mt-4 text-sm text-gray-600">
                        Cek terminal dev server & network/backend. Jika backend ada di host/port lain, pastikan BASE_API benar.
                    </p>
                </div>
            </main>
        );
    }
}