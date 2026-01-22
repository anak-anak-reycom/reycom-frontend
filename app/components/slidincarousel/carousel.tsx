'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image, { StaticImageData } from 'next/image'

interface CarouselProps {
  items: {
    id: string | number
    title: string
    description?: string
    image: string | StaticImageData
  }[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showDots?: boolean
  showArrows?: boolean
}

export function Carousel({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragTranslate, setDragTranslate] = useState(0)

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const startX = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  /* ================= AUTOPLAY ================= */
  useEffect(() => {
    if (!autoPlay || isDragging) return

    autoPlayRef.current = setTimeout(goToNext, autoPlayInterval)

    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current)
    }
  }, [currentIndex, autoPlay, autoPlayInterval, isDragging])

  /* ================= CONTROLS ================= */
  const goToNext = () =>
    setCurrentIndex((prev) => (prev + 1) % items.length)

  const goToPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)

  const goToSlide = (index: number) => setCurrentIndex(index)

  /* ================= DRAG ================= */
  const getX = (e: TouchEvent | MouseEvent) =>
    'touches' in e ? e.touches[0].clientX : e.clientX

  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true)
    startX.current = getX(e.nativeEvent)
  }

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    const currentX = getX(e.nativeEvent)
    const diff = currentX - startX.current
    const width = containerRef.current.offsetWidth

    setDragTranslate((diff / width) * 100)
  }

  const handleEnd = () => {
    if (dragTranslate < -15) goToNext()
    else if (dragTranslate > 15) goToPrev()

    setIsDragging(false)
    setDragTranslate(0)
  }

  /* ================= RENDER ================= */
  return (
    <div className="w-full overflow-hidden">
      <div
        ref={containerRef}
        className=" relative h-80 md:h-96 lg:h-[600px] lg:w-full rounded-4xl overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${dragTranslate}%))`,
          }}
        >
          {items.map((item, index) => (
            <div key={item.id} className="relative min-w-full h-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority={index === 0}
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 flex flex-col justify-end">
                <h2 className="text-white text-2xl font-bold mb-2">
                  {item.title}
                </h2>
                {item.description && (
                  <p className="text-white/90 max-w-lg">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {showArrows && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/70 p-2 rounded-full"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/40 hover:bg-white/70 p-2 rounded-full"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {showDots && (
        <div className="flex justify-center gap-3 py-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 h-3 bg-primary'
                  : 'w-3 h-3 bg-gray-400 hover:bg-primary'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
