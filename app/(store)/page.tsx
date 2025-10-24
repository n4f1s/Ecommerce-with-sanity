import BlackFridayBanner from "@/components/BlackFridayBanner";
import HeroBanner from "@/components/HeroBanner";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";




// export const dynamic = "force-static";
// export const revalidate = 60; // Check for updates after 60 sec

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <>
      <HeroBanner />

      <BlackFridayBanner />

      <div id="products" className="flex flex-col items-center justify-top bg-gray-100">
        <div className="wrapper">
          <ProductsView products={products} categories={categories} />
        </div>
      </div>
    </>
  );
}
