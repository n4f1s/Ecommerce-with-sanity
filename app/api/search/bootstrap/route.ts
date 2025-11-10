import { NextResponse } from "next/server"
import { getAllProducts } from "@/sanity/lib/products/getAllProducts"
import { getAllCategories } from "@/sanity/lib/products/getAllCategories"
import type { Product, Category } from "@/sanity.types"

export const revalidate = 600 // 10 minutes

export async function GET() {
  const [allProducts, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ])

  const products: Product[] = Array.isArray(allProducts) ? allProducts : []
  const cats: Category[] = Array.isArray(categories) ? categories : []

  const featured = products
    .filter((p) => p.featured === true)
    .sort((a, b) => Date.parse(b._createdAt || "") - Date.parse(a._createdAt || ""))
    .slice(0, 6)


  return NextResponse.json(
    { categories: cats.slice(0, 3), featured },
    { headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=60" } }
  )
}
