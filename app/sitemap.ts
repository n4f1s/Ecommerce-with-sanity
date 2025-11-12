import { Category, Product } from "@/sanity.types";
import type { MetadataRoute } from "next";
import "server-only";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://shophikes.com";

async function getCategorySlugs(): Promise<string[]> {
  // If you have a server helper, import it instead:
  // const cats = await getAllCategories(); return cats.map(c => c.slug.current);
  const res = await fetch(`${base}/api/search/bootstrap`, { next: { revalidate: 86400 } });
  if (!res.ok) return [];
  const data = await res.json().catch(() => ({} as Category));
  // Expecting data.categories: { slug: string }[]; adjust to your shape
  const cats: Array<{ slug?: string }> = data?.categories || [];
  return cats.map((c) => c.slug!).filter(Boolean);
}

async function getProductSlugs(): Promise<Array<{ slug: string; updatedAt?: string }>> {
  // Prefer a direct Sanity GROQ server function if you have one (e.g., sanity/lib/products/getAllProducts)
  // Example using public API route if you expose it:
  try {
    const res = await fetch(`${base}/api/search/bootstrap`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const data = await res.json().catch(() => ({} as Product));
    // Expecting data.products: { slug: string; updatedAt?: string }[]
    const prods: Array<{ slug?: string; updatedAt?: string }> = data?.products || [];
    return prods
      .filter((p) => p.slug)
      .map((p) => ({ slug: p.slug!, updatedAt: p.updatedAt }));
  } catch {
    return [];
  }
}

export const revalidate = 86400; // re-generate daily

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/products`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/search`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/orders`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/shipping`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/return-refund-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const [categorySlugs, productSlugs] = await Promise.all([
    getCategorySlugs(),
    getProductSlugs(),
  ]);

  const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${base}/categories/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
