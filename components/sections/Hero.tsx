"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Zap } from "lucide-react";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const heroProduct = products[1];

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center pt-16">
      <div className="blob w-[600px] h-[600px] bg-indigo-200/50 -top-40 -right-40 opacity-60" />
      <div className="blob w-[400px] h-[400px] bg-violet-200/50 top-1/2 -left-20 opacity-50" />
      <div className="blob w-[300px] h-[300px] bg-cyan-200/40 bottom-0 right-1/4 opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-6">
              <Zap className="w-3.5 h-3.5" />
              Premium Tech Essentials
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[var(--color-foreground)] leading-[1.08] tracking-tight mb-6">
              Upgrade your workspace with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600">
                premium tech essentials
              </span>
            </h1>

            <p className="text-lg text-[var(--color-muted-foreground)] leading-relaxed max-w-lg mb-8">
              LumaGear offers modern electronics, smart home products, and workspace accessories designed for better focus, comfort, and productivity.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/products">
                <Button variant="accent" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Shop Collection
                </Button>
              </Link>
              <Link href="/products?badge=bestseller">
                <Button variant="outline" size="lg">
                  View Bestsellers
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 blur-2xl opacity-20 scale-105" />
              <div
                className="relative bg-[var(--color-card)] rounded-3xl overflow-hidden border border-[var(--color-border)] p-6 space-y-4"
                style={{ boxShadow: "var(--shadow-glass)" }}
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-white/60 text-sm font-medium text-center px-4">
                    {heroProduct.name}
                  </div>
                </div>
                <div>
                  <Badge variant="bestseller" className="mb-2">Bestseller</Badge>
                  <h3 className="font-bold text-[var(--color-foreground)]">{heroProduct.name}</h3>
                  <p className="text-sm text-[var(--color-muted-foreground)] line-clamp-2">{heroProduct.tagline}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-2xl font-bold tabular">${heroProduct.price}</span>
                    <Link href={`/products/${heroProduct.slug}`}>
                      <Button variant="accent" size="sm" rightIcon={<ChevronRight className="w-3.5 h-3.5" />}>
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
