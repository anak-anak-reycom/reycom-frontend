// app/news-content/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getNewsById, getAllNews } from "@/app/data/news";
import { toSlug, extractIdFromSlug } from "@/lib/slug";
import type { Metadata } from "next";
import NewsHeader from "@/app/components/news-contentCompo/newsHeader";
import NewsDescription from "@/app/components/news-contentCompo/newsDescription";
import NewsCarousel from "@/app/components/news-contentCompo/newsCarousel";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; 
  const id = extractIdFromSlug(slug);
  if (Number.isNaN(id)) return { title: "News" };
  const news = await getNewsById(id);
  return {
    title: news?.title ?? "News",
    description: (news as any)?.summary ?? "",
  };
}

export default async function NewsContentPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;  
  const id = extractIdFromSlug(slug);

  if (Number.isNaN(id)) return notFound();

  try {
    const [news, all] = await Promise.all([getNewsById(id), getAllNews()]);

    if (!news) return notFound();

    const expectedSlug = `${id}-${toSlug(news.title ?? "")}`;
    if (slug !== expectedSlug) {
      
    }

    return (
      <main className="min-h-screen">
        <NewsHeader news={news} />
        <NewsDescription news={news} />
        <NewsCarousel news={all} />
      </main>
    );
  } catch (err: any) {
    return notFound();
  }
}