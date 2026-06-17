import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "LumaGear — Premium E-commerce Store",
    template: "%s | LumaGear",
  },
  description:
    "Premium e-commerce storefront for electronics, smart home devices, and modern workspace accessories.",
  metadataBase: new URL("https://premium-e-commerce-store-ten.vercel.app"),
  keywords: ["electronics", "smart home", "headphones", "monitor", "laptop", "keyboard"],
  openGraph: {
    title: "LumaGear — Premium Electronics & Smart Home",
    description: "Discover the finest electronics and smart home devices.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full`}>
      <body className="min-h-dvh flex flex-col antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
