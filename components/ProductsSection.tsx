import { Suspense } from "react";
import ProductsView from "./ProductsView";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import Loader from "./loader";

export default async function ProductsSection() {
  return (
    <Suspense fallback={<Loader />}>
      <ProductsFetcher />
    </Suspense>
  );
}

async function ProductsFetcher() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  return <ProductsView products={products} categories={categories} />;
}
