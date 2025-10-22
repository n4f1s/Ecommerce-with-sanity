import type { Metadata } from "next";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";
import ToastProvider from "@/providers/ToastProvider";

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
          {children}
        </main>
        <SanityLive />
      </body>
    </html>
  );
}
