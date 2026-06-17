"use client";

import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, X, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/products", label: "Shop" },
  { href: "/products?badge=bestseller", label: "Bestsellers" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, openCart } = useCartStore();
  const count = itemCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "glass shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="LumaGear home"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-accent)] text-white shadow-sm group-hover:shadow-md transition-shadow duration-200">
              <Zap className="w-4 h-4" strokeWidth={2.5} />
            </span>
            <span className="text-lg font-bold tracking-tight text-[var(--color-foreground)]">
              LumaGear
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href.split("?")[0] + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-full text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "bg-[var(--color-muted)] text-[var(--color-foreground)]"
                      : "text-[var(--color-secondary)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/products"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-[var(--color-secondary)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors duration-150"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>

            <button
              onClick={openCart}
              className="relative flex items-center justify-center w-10 h-10 rounded-full text-[var(--color-secondary)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors duration-150 cursor-pointer"
              aria-label={`Shopping cart${count > 0 ? `, ${count} items` : ""}`}
            >
              <ShoppingBag className="w-5 h-5" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-accent)] text-white text-[10px] font-bold tabular"
                    aria-hidden="true"
                  >
                    {count > 99 ? "99+" : count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-[var(--color-secondary)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors duration-150 cursor-pointer"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass border-t border-[var(--color-border)]"
          >
            <nav className="flex flex-col p-4 gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 rounded-xl text-base font-medium text-[var(--color-foreground)] hover:bg-[var(--color-muted)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
