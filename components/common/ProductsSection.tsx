import { Suspense } from "react";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import Loader from "./loader";
import ProductsView from "../product/ProductsView";

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
