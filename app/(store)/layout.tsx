import type { Metadata } from "next";
import "../../app/globals.css";
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";


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
        <main>
          <Header />
          {children}
        </main>

        <SanityLive />
      </body>
    </html>
  );
}
