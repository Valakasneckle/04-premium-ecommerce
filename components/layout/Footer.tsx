import { Globe, Rss, Share2, Zap } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  Shop: [
    { href: "/products", label: "All Products" },
    { href: "/products?category=headphones", label: "Headphones" },
    { href: "/products?category=monitors", label: "Monitors" },
    { href: "/products?category=keyboards", label: "Keyboards" },
  ],
  Support: [
    { href: "#", label: "Help Center" },
    { href: "#", label: "Returns & Warranty" },
    { href: "#", label: "Track Order" },
    { href: "#", label: "Contact Us" },
  ],
  Company: [
    { href: "#", label: "About LumaGear" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Press" },
    { href: "#", label: "Partners" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[var(--color-primary)] text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-accent)] text-white">
                <Zap className="w-4 h-4" strokeWidth={2.5} />
              </span>
              <span className="text-lg font-bold tracking-tight">LumaGear</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Premium electronics and smart home devices for the modern workspace. Built for people who care about quality.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { href: "#", icon: Share2, label: "Social" },
                { href: "#", icon: Rss, label: "Blog" },
                { href: "#", icon: Globe, label: "Web" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-slate-400 hover:bg-white/20 hover:text-white transition-colors duration-150"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} LumaGear Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map((text) => (
              <a
                key={text}
                href="#"
                className="text-xs text-slate-500 hover:text-white transition-colors"
              >
                {text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
