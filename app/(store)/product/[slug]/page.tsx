import AddToBasketButton from "@/components/AddToBasketButton";
import AddToBasketQuantity from "@/components/AddToBasketQuantity";
import OrderNowButton from "@/components/OrderNowButton";
import ProductDetailTabs from "@/components/ProductDetailTabs";
import ProductImageGallery from "@/components/ProductImageGallery";
import { urlFor } from "@/sanity/lib/image";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { CreditCard, LifeBuoy, Truck } from "lucide-react";
import { PortableText, PortableTextComponents } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";


// ✅ Add custom components for PortableText
const components: PortableTextComponents = {
    types: {
        image: ({ value }) => (
            <div className="my-6 flex justify-center">
                <Image
                    src={urlFor(value).width(800).format("webp").url()}
                    alt={value.alt || "Product image"}
                    width={800}
                    height={500}
                    className="rounded-lg shadow-md object-cover"
                />
            </div>
        ),
    },
};

const features = [
    // {
    //     icon: Rocket,
    //     title: "ফ্রি শিপিং",
    //     description: "২০০০ টাকা-এর বেশি সব অর্ডারে কোনো ডেলিভারি চার্জ নেই।",
    // },
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

    const save = 300;

    const isOutOfStock = product.stock != null && product.stock <= 0;
    return (
        <div className="wrapper">
            <div className="flex flex-row lg:flex-nowrap flex-wrap gap-8">
                <div className="w-full lg:w-[340px] h-auto">
                    <ProductImageGallery product={product} isOutOfStock={isOutOfStock} />
                </div>

                <div className="lg:w-[580px]">
                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">
                                {product.name}
                            </h1>

                            <div className="w-full h-[1px] bg-gray-300 my-4" />

                            {!isOutOfStock && (
                                <p className="text-theme-primary text-xl font-semibold">
                                    In Stock
                                </p>
                            )}

                            <div className="prose max-w-none mt-4">
                                {Array.isArray(product.features) && (
                                    <PortableText value={product.features} components={components} />
                                )}
                            </div>
                        </div>

                        {/* <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
                            <AddToBasketQuantity product={product} disabled={isOutOfStock} />

                            <CheckoutButtonWithModal isOutOfStock={isOutOfStock} />
                        </div> */}
                    </div>
                </div>

                <div className="w-auto space-y-4">
                    <div className="flex flex-wrap gap-4 text-xl font-bold mb-4">
                        <p className="text-black text-nowrap">
                            Tk {product.price}
                        </p>
                        <div className="text-nowrap text-gray-500 relative">
                            <span className="absolute top-1/2 w-full h-[2px] bg-gray-500" />
                            Tk {Number(product.price) + save}
                        </div>
                        <div className="px-2 py-1 bg-theme-primary text-white text-sm rounded">
                            SAVE TK {save}
                        </div>
                    </div>

                    <div className="flex justify-start items-center gap-4">
                        <p className="text-lg font-semibold">
                            Quantity
                        </p>
                        <AddToBasketQuantity product={product} disabled={isOutOfStock} />
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <AddToBasketButton product={product} disabled={isOutOfStock} className="bg-white border border-black/40 text-black hover:text-white" />

                        <OrderNowButton product={product} disabled={isOutOfStock} />
                    </div>
                    <p className="text-base text-theme-primary">
                        ক্যাশ অন ডেলিভারি
                    </p>
                    <p className="text-sm font-medium text-gray-500 mt-4">
                        ২-৩ কার্যদিবসের মধ্যেই আপনার কাছে পৌছে যাবে।
                    </p>
                </div>
            </div>

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

            {/* <div className="prose max-w-none mt-10">
                {Array.isArray(product.description) && (
                    <PortableText value={product.description} components={components} />
                )}
            </div> */}
        </div>
    )
}

export default ProductPage;