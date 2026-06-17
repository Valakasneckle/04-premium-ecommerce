"use client";

import { Check } from "lucide-react";
import { useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center gap-2 h-12 text-white font-medium">
        <Check className="w-5 h-5" />
        You&apos;re subscribed! Thanks for joining.
      </div>
    );
  }

  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Enter your email"
        className="flex-1 h-12 px-4 rounded-full bg-white/10 text-white placeholder:text-slate-400 border border-white/20 outline-none focus:border-white/40 focus:bg-white/15 transition-all"
        autoComplete="email"
      />
      <button
        type="submit"
        className="h-12 px-6 rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold transition-colors flex-shrink-0 cursor-pointer"
      >
        Subscribe
      </button>
    </form>
  );
}
