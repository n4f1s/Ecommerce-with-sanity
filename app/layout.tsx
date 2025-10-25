import type { Metadata } from "next";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";
import ToastProvider from "@/providers/ToastProvider";
import ScrollToTop from "@/components/layout/ScrollToTop";

export const metadata: Metadata = {
  title: "E-commerce",
  description: "E-commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
