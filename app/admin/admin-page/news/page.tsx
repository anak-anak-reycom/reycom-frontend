import React from 'react'
import Image from 'next/image'
import Card from '@/public/card.png'
import { NewsItem } from '@/app//types/news-types'
import {  getAllNews } from '@/app/data/news'


const NewsData = async () => {
  const news = await getAllNews()
  const data = news as NewsItem[]

  return (
    <section className="py-10">
      <div className="mx-auto max-w-[1400px] px-4">
        {/* title */}
        <h2 className="mb-8 text-5xl font-sans font-semibold">
          News <span className="text-secondary">Features</span>
        </h2>

        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3">
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
                className="w-full object-cover"
              />

              <div className="p-5">
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>

                <p className="mb-4 text-sm text-secondary line-clamp-3">
                  {item.content}
                </p>

                

              </div>

               <div className="grid grid-cols-2 gap-3">
                <button className="bg-linear-to-br from-blue-700 to-blue-500 px-1 py-2 text-white font-semibold rounded-xl"> Edit </button>
                <button className="bg-linear-to-br from-red-700 to-red-500 px-1 py-2 text-white font-semibold rounded-xl"> Delete </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-start mt-8">
          <button className="bg-linear-to-br from-green-700 to-green-500 px-4 py-2 text-white font-semibold rounded-xl">+ Add News</button>
        </div>

    </section>
  )
}

export default NewsData
