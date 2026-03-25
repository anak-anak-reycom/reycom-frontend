import React from 'react'
import Image from 'next/image'
import Card from '@/public/card.png'
import { NewsItem } from '@/app//types/news-types'
import {  getAllNews } from '../data/news'
import Link from 'next/link'
import { toSlug } from '@/lib/slug'

export const metadata = { title: "News" };


const Page = async () => {
  const news = await getAllNews()
  const data = news as NewsItem[]

  

  return (
    <section className="py-10">
      <div className="mx-auto max-w-[1400px] px-4">
        {/* title */}
        <h2 className="mb-8 text-5xl font-sans font-semibold">
          News <span className="text-secondary">Features</span>
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <Image
                src={item.imageNews || Card} // fallback img 0
                alt={item.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>

                <p className="mb-4 text-sm text-secondary line-clamp-3">
                  {item.content}
                </p>

                <Link
                    href={`/news-content/${item.id}-${toSlug(item.title ?? "")}`}
                    className="text-primary text-sm font-medium hover:underline"
                >
                  Visit News
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Page
