import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import ScrollToTop from "@/components/ScrollToTop";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.buybound.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "BuyBound | Luxury Artisanal Digital Bindings & Rare Editions",
    template: "%s | BuyBound",
  },
  description: "BuyBound offers luxury digital bookcraft, rare leather-bound aesthetics, and curated artisanal EPUB editions for the discerning collector.",
  keywords: ["BuyBound", "Artisanal eBooks", "Rare Bindings", "Luxury Digital Books", "Gold Foil Books"],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "BuyBound | Luxury Artisanal Digital Bindings & Rare Editions",
    description: "Curated rare digital bindings and artisanal bookcraft at BuyBound.",
    url: siteUrl,
    siteName: "BuyBound",
    images: [{ url: "/icon.svg", width: 1200, height: 630, alt: "BuyBound" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body 
        className="min-h-full flex flex-col font-manrope bg-[#FBF9F5] text-[#0A192F]"
        suppressHydrationWarning
      >
        <CartProvider>
          <ScrollToTop />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
