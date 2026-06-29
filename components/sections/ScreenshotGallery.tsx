"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/types";

export function ScreenshotGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  function close() {
    setActiveIndex(null);
  }

  function next() {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }

  function prev() {
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => (
          <motion.button
            key={img.id}
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border-subtle"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.25 }}
            aria-label={`Enlarge: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-opacity duration-300 group-hover:opacity-90"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-6"
            onClick={close}
          >
            <button
              className="absolute right-6 top-6 rounded-full bg-white/5 p-2 text-white transition-colors hover:bg-white/10"
              onClick={close}
              aria-label="Close gallery"
            >
              <X size={20} />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/5 p-2 text-white transition-colors hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/5 p-2 text-white transition-colors hover:bg-white/10"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative h-[70vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                fill
                className="rounded-2xl object-contain"
                unoptimized
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
