// app/components/news/NewsDetail.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import CardFallback from "../../../public/news-img.png";
import { getAllNews } from "@/app/data/news";
import type { NewsItem } from "@/app/types/news-types";

function getDateValue(item: any) {
  return (
    new Date(item.createdAt ?? item.created_at ?? item.date ?? item.publishedAt ?? null).getTime() ||
    0
  );
}

function formatShortDate(d?: string | Date | null) {
  if (!d) return "";
  const dt = typeof d === "string" ? new Date(d) : d instanceof Date ? d : new Date(String(d));
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export const NewsDetail = async () => {
  
  const raw = await getAllNews();
  const arr: NewsItem[] = Array.isArray(raw) ? (raw as NewsItem[]) : (raw?.data ?? []);

 
  const latest = [...arr]
    .sort((a: any, b: any) => getDateValue(b) - getDateValue(a))
    .slice(0, 3);

  return (
    <section className="py-10">
      <div className="max-w-[1400px] mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-8">
          Read our other <span className="text-primary">News</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((item) => {
            const imgSrc = (item as any).imageNews ?? (item as any).image ?? CardFallback;
            const title = item.title ?? (item as any).newsTitle ?? "Untitled";
            const excerpt =
              (item as any).content ??
              (item as any).summary ??
              (item as any).description ??
              "";
            const dateRaw = (item as any).createdAt ?? (item as any).created_at ?? (item as any).date ?? null;

            return (
              <Link
                key={(item as any).id ?? title}
                href={`news-content/${(item as any).id}`}
                className="block bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
              >
                <div className="w-full h-[180px] relative">
                  <Image
                    src={imgSrc as any}
                    alt={title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover"
                    
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>

                  <p className="text-secondary text-sm mb-4 line-clamp-3">
                    {excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatShortDate(dateRaw)}</span>
                    <span className="uppercase tracking-wider">Read →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NewsDetail;