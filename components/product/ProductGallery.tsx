"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ProductGradient } from "./ProductGradient";

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const count = product.images.length;

  const go = (next: number, dir: number) => {
    setDirection(dir);
    setActive(next);
  };

  const prev = () => go((active - 1 + count) % count, -1);
  const next = () => go((active + 1) % count, 1);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden aspect-square bg-[var(--color-muted)]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <ProductGradient
              gradient={product.gradient}
              name={`${product.name} — view ${active + 1}`}
              size="full"
              className="w-full h-full"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        {count > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass flex items-center justify-center text-[var(--color-foreground)] hover:bg-white/90 transition-colors cursor-pointer shadow-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass flex items-center justify-center text-[var(--color-foreground)] hover:bg-white/90 transition-colors cursor-pointer shadow-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dots */}
        {count > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => go(i, i > active ? 1 : -1)}
                className={cn(
                  "transition-all duration-200 rounded-full cursor-pointer",
                  i === active
                    ? "w-5 h-2 bg-white"
                    : "w-2 h-2 bg-white/50 hover:bg-white/75"
                )}
                aria-label={`View image ${i + 1}`}
                aria-current={i === active}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {count > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > active ? 1 : -1)}
              className={cn(
                "flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer",
                i === active
                  ? "border-[var(--color-accent)]"
                  : "border-[var(--color-border)] opacity-60 hover:opacity-100"
              )}
              aria-label={`Thumbnail ${i + 1}`}
            >
              <ProductGradient
                gradient={product.gradient}
                name={product.name}
                size="full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
