import ProductDetailTabs from "@/components/product/ProductDetailTabs";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { CreditCard, LifeBuoy, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import ProductDetailSection from "@/components/product/ProductDetailSection";
import BreadcrumbsBar from "@/components/layout/Breadcrumb";



const features = [
    {
        icon: Truck,
        title: "দ্রুত ডেলিভারি",
        description: "২-৩ কার্যদিবসের মধ্যেই আপনার কাছে পৌছে যাবে।",
    },
    {
        icon: CreditCard,
        title: "ক্যাশ অন ডেলিভারি",
        description: "আপনার অর্ডার পাওয়ার পরই মূল্য পরিশোধ করুন।",
    },
    {
        icon: LifeBuoy,
        title: "২৪/৭ ডেডিকেটেড সাপোর্ট",
        description: "আমরা আপনাকে যেকোনো সময় সাহায্য করার জন্য প্রস্তুত।",
    },
];

// product.price?.toFixed(2)

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return notFound();
    }

    const isOutOfStock = product.stock != null && product.stock <= 0;

    return (
        <>
            <BreadcrumbsBar />
            <div className="sm:px-16 px-4 pt-4 pb-10 sm:pb-16 max-w-[1500px] w-full h-full mx-auto relative">

                <ProductDetailSection product={product} isOutOfStock={isOutOfStock} />

                <div className="bg-gray-200 mt-10 py-8 px-6 rounded">
                    <div className="flex flex-wrap gap-5 sm:gap-8 justify-center items-center">
                        {features.map((e) => (
                            <div key={e.title} className="flex flex-nowrap gap-4 justify-center items-center sm:w-[300px]">
                                <e.icon size={40} className="text-theme-primary shrink-0" />
                                <div>
                                    <h1 className="text-lg font-semibold text-gray-800">{e.title}</h1>
                                    <p className="text-base font-medium text-gray-500 mt-2">{e.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tabs Component */}
                <ProductDetailTabs product={product} />
            </div>
        </>
    )
}

export default ProductPage;