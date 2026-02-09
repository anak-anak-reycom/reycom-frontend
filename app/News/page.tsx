import React from 'react'
import Image from 'next/image'
import Card from '@/public/card.png'

interface NewsItem {
  id: number
  title: string
  content: string
  imageNews: string
}

async function getNews(): Promise<NewsItem[]> {
  const res = await fetch('https://backend-prod-testing.vercel.app/news', {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch news')
  }

  const json = await res.json()
  return json.data 
}

const Page = async () => {
  const news = await getNews()

  return (
    <section className="py-10">
      <div className="mx-auto max-w-[1400px] px-4">
        {/* title */}
        <h2 className="mb-8 text-5xl font-sans font-semibold">
          News <span className="text-secondary">Features</span>
        </h2>

        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <Image
                src={item.imageNews || Card} // fallback img 0
                alt={item.title}
                width={400}
                height={250}
                className="w-full object-cover"
              />

              <div className="p-5">
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>

                <p className="mb-4 text-sm text-secondary line-clamp-3">
                  {item.content}
                </p>

                <a
                  href={`/news/${item.id}`}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  Visit News
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Page
