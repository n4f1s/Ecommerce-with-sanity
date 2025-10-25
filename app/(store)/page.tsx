import HeroBanner from "@/components/common/HeroBanner";
import BlackFridayBanner from "@/components/common/BlackFridayBanner";
import ProductsSection from "@/components/common/ProductsSection";


export const dynamic = "force-static";
export const revalidate = 60; // Check for updates after 60 sec

export default function Home() {
  return (
    <>
      <HeroBanner />

      <BlackFridayBanner />
      
      <div id="products" className="flex flex-col items-center bg-gray-100">
        <div className="wrapper">
          <ProductsSection />
        </div>
      </div>
    </>
  );
}
