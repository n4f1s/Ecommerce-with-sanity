import { getAllCategories } from "@/sanity/lib/products/getAllCategories"
import { getAllProducts } from "@/sanity/lib/products/getAllProducts"
import type { Category, Product } from "@/sanity.types"

export type SearchBootstrap = {
  categories: Category[]
  featured: Product[]
}

export async function getSearchBootstrap(): Promise<SearchBootstrap> {
  const [allProducts, categories] = await Promise.all([getAllProducts(), getAllCategories()])
  const products = Array.isArray(allProducts) ? allProducts : []
  const cats: Category[] = Array.isArray(categories) ? categories : []

  // Single source: use featured flag as the only list
  const featured = products
    .filter((p) => p.featured === true)
    .sort((a, b) => Date.parse(b._createdAt || "") - Date.parse(a._createdAt || ""))
    .slice(0, 10)

  return { categories: cats.slice(0, 8), featured }
}
