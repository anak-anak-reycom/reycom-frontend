// app/components/healthcare/HealthcareSlides.tsx
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {healthcareSlides } from "../../data/healthcare";

const FADE_MS = 320; // durasi fade (ms)

export default function HealthcareSlides() {
  const slides = healthcareSlides;
  const [current, setCurrent] = useState(0);

  // untuk transisi: nextIndex (null berarti tidak ada transisi berjalan)
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // keyboard nav
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
    // ensure DOM paints the next layer before toggling classes
    requestAnimationFrame(() => {
      setIsTransitioning(true);
      // after fade duration, commit the change
      setTimeout(() => {
        setCurrent(target);
        setNextIndex(null);
        setIsTransitioning(false);
      }, FADE_MS);
    });
  };

  const goNext = () => go((current + 1) % slides.length);
  const goPrev = () => go((current - 1 + slides.length) % slides.length);

  const curr = slides[current];
  const next = nextIndex != null ? slides[nextIndex] : null;

  return (
    <section className="w-full py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* LEFT: image area (two layers for crossfade) */}
          <div className="relative">
            <button
              onClick={goPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border bg-white/80 hover:bg-white flex items-center justify-center shadow"
              aria-label="previous"
            >
              ◀
            </button>

            <div className="relative rounded-2xl overflow-hidden border-2 border-[#3b8ed6]">
              {/* current layer */}
              <div
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
                aria-hidden={isTransitioning}
                key={curr.id}
              >
                <Image
                  src={curr.img}
                  alt={curr.title}
                  width={900}
                  height={540}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* next layer (rendered only when transitioning) */}
              {next && (
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isTransitioning ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden={!isTransitioning}
                  key={next.id}
                >
                  <Image
                    src={next.img}
                    alt={next.title}
                    width={900}
                    height={540}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </div>

            <button
              onClick={goNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border bg-white/80 hover:bg-white flex items-center justify-center shadow"
              aria-label="next"
            >
              ▶
            </button>
          </div>

          {/* RIGHT: text area (also crossfade) */}
          <div className="relative">
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

        {/* pagination dots (optional) */}
        <div className="flex gap-3 justify-center mt-6">
          {slides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`go to ${s.id}`}
              onClick={() => go(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === current ? "bg-blue-600 scale-110" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
