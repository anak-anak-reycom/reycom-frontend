'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselProps {
  items: {
    id: string | number
    title: string
    description?: string
    image: string
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
  const [isTransitioning, setIsTransitioning] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return

    const resetAutoPlay = () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current)
      autoPlayRef.current = setTimeout(() => {
        goToNext()
      }, autoPlayInterval)
    }

    resetAutoPlay()

    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current)
    }
  }, [currentIndex, autoPlay, autoPlayInterval])

  const goToSlide = (index: number) => {
    setIsTransitioning(true)
    setCurrentIndex(index % items.length)
  }

  const goToNext = () => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const goToPrev = () => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-4xl bg-background">
      {/* Main carousel container */}
      <div className="relative h-80 md:h-96 lg:h-[500px] overflow-hidden">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {items.map((item) => (
            <div key={item.id} className="min-w-full h-full flex-shrink-0">
              <div className="relative w-full h-full">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {/* Content overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4 md:p-8">
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">
                    {item.title}
                  </h2>
                  {item.description && (
                    <p className="text-white/90 text-sm md:text-base max-w-lg">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Left arrow */}
        {showArrows && (
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
        )}

        {/* Right arrow */}
        {showArrows && (
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all duration-200"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>

      {/* Dots indicator */}
      {showDots && (
        <div className="flex justify-center gap-2 py-4 ">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary w-8'
                  : 'bg-muted-foreground/50 w-2 hover:bg-muted-foreground'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
