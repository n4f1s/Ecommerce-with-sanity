import type { Metadata } from "next";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";
import ToastProvider from "@/providers/ToastProvider";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { GoogleTagManager } from '@next/third-parties/google'


export const metadata: Metadata = {
  title: "ShopHikes | Online Shopping in Bangladesh",
  description: "One-stop marketplace for chargers, clothing, electronics, home & kitchen, beauty, toys, and more. Fast nationwide delivery and secure payments.",
  keywords: [
    "online shopping Bangladesh",
    "ShopHikes",
    "chargers",
    "clothing",
    "electronics",
    "home and kitchen",
    "beauty",
    "toys",
    "gifts"
  ],
  metadataBase: new URL("https://shophikes.com"),
  alternates: {
    canonical: "https://shophikes.com",
  },
  openGraph: {
    title: "ShopHikes | Online Shopping in Bangladesh",
    description: "Shop chargers, clothing, electronics, home essentials, beauty, toys, and more with fast delivery in Bangladesh.",
    url: "https://shophikes.com",
    siteName: "ShopHikes",
    locale: "en_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShopHikes | Online Shopping in Bangladesh",
    description: "Everything you need—chargers, clothing, gadgets, home & kitchen, beauty, toys, and more. Fast delivery nationwide.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProd = process.env.NODE_ENV === "production";

  return (
    <html lang="en">
      {isProd ? <GoogleTagManager gtmId="GTM-5KZM98ZZ" /> : null}
      <body>
        <ToastProvider />
        <main>
          <ScrollToTop />
          {children}
        </main>
        <SanityLive />
      </body>
    </html>
  );
}
