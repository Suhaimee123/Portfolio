'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface ProjectImageCarouselProps {
  images: string[];
  title: string;
}

export default function ProjectImageCarousel({ images, title }: ProjectImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const canUseDOM = typeof window !== 'undefined';

  useEffect(() => {
    if (images.length <= 1 || isLightboxOpen) return;

    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length, isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsLightboxOpen(false);
      if (event.key === 'ArrowLeft') setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      if (event.key === 'ArrowRight') setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length, isLightboxOpen]);

  useEffect(() => {
    if (!canUseDOM) return;
    if (!isLightboxOpen) return;

    const { style } = document.body;
    const prevOverflow = style.overflow;
    style.overflow = 'hidden';

    return () => {
      style.overflow = prevOverflow;
    };
  }, [canUseDOM, isLightboxOpen]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mb-8">
      <div
        className="relative h-56 md:h-80 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 cursor-zoom-in"
        onClick={() => setIsLightboxOpen(true)}
      >
        <Image
          src={images[activeIndex]}
          alt={`ภาพโปรเจกต์ ${title} ${activeIndex + 1}`}
          fill
          className="object-cover"
          priority
        />

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            goPrev();
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/80 transition-colors"
          aria-label="รูปก่อนหน้า"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            goNext();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/80 transition-colors"
          aria-label="รูปถัดไป"
        >
          ›
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {images.map((imageSrc, index) => (
          <button
            type="button"
            key={imageSrc}
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 rounded-full transition-all ${index === activeIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/30 hover:bg-white/60'}`}
            aria-label={`ไปยังรูปที่ ${index + 1}`}
          />
        ))}
      </div>

      {canUseDOM && isLightboxOpen
        ? createPortal(
        <div
          className="fixed inset-0 z-[9999] bg-black/90 p-4 md:p-8"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`ภาพโปรเจกต์ ${title}`}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setIsLightboxOpen(false);
            }}
            className="absolute top-3 right-3 z-[10000] h-12 w-12 rounded-full bg-white/10 border border-white/20 text-white text-2xl leading-none hover:bg-white/20 transition-colors"
            aria-label="ปิดรูป"
          >
            ×
          </button>

          <div
            className="relative z-10 w-full h-full flex items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative w-full max-w-6xl h-[70vh] md:h-[80vh]">
              <Image
                src={images[activeIndex]}
                alt={`ภาพโปรเจกต์ ${title} ${activeIndex + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goPrev();
              }}
              className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label="รูปก่อนหน้า"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goNext();
              }}
              className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label="รูปถัดไป"
            >
              ›
            </button>
          </div>
        </div>,
        document.body
      )
        : null}
    </div>
  );
}
