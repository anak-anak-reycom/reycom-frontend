// app/components/slide/Slides.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { healthcareSlides } from "@/app/data/healthcare"; 
const FADE_MS = 320; 

type SlideItem = {
  id: string;
  title: string;
  body: string;
  img: StaticImageData;
  link?: string;
};

export default function HealthcareSlides() {
  const items: SlideItem[] = healthcareSlides as SlideItem[];

  const [current, setCurrent] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current]);

  const go = (target: number) => {
    if (isTransitioning || target === current) return;
    setNextIndex(target);

  
    requestAnimationFrame(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(target);
        setNextIndex(null);
        setIsTransitioning(false);
      }, FADE_MS);
    });
  };

  const goNext = () => go((current + 1) % items.length);
  const goPrev = () => go((current - 1 + items.length) % items.length);

  const curr = items[current];
  const next = nextIndex != null ? items[nextIndex] : null;

  return (
    <section className="w-full py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-50 items-center">

          {/* LEFT: image crossfade container */}
          <div className="relative">
            <button
              onClick={goPrev}
              aria-label="previous"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border bg-white/80 hover:bg-white flex items-center justify-center shadow"
            >
              <ChevronLeft />
            </button>

            <div className="relative rounded-2xl overflow-hidden border-2 border-[#3b8ed6] h-[320px] md:h-[420px] lg:h-[540px]">
              {/* current */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
                key={curr.id}
                aria-hidden={isTransitioning}
              >
                <Image
                  src={curr.img}
                  alt={curr.title}
                  fill
                  sizes="(min-width:1024px) 900px, 100vw"
                  className="object-contain"
                />
              </div>

            
              {next && (
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isTransitioning ? "opacity-100" : "opacity-0"
                  }`}
                  key={next.id}
                  aria-hidden={!isTransitioning}
                >
                  <Image
                    src={next.img}
                    alt={next.title}
                    fill
                    sizes="(min-width:1024px) 900px, 100vw"
                    className="object-contain"
                  />
                </div>
              )}
            </div>

            <button
              onClick={goNext}
              aria-label="next"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border bg-white/80 hover:bg-white flex items-center justify-center shadow"
            >
              <ChevronRight />
            </button>
          </div>

          {/* RIGHT: text area (crossfade in sync) */}
          <div className="relative min-h-[140px]">
            {/* current text */}
            <div
              className={`transition-opacity duration-300 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
              key={curr.id + "-text"}
            >
              <h2 className="text-2xl font-semibold mb-4">{curr.title}</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{curr.body}</p>
              {curr.link && (
                <p className="mt-4">
                  <a href={curr.link} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                    Learn more
                  </a>
                </p>
              )}
            </div>

            {/* next text overlay while transitioning */}
            {next && (
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isTransitioning ? "opacity-100" : "opacity-0"
                }`}
                key={next.id + "-text"}
              >
                <h2 className="text-2xl font-semibold mb-4">{next.title}</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{next.body}</p>
                {next.link && (
                  <p className="mt-4">
                    <a href={next.link} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                      Learn more
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

       
      </div>
    </section>
  );
}
