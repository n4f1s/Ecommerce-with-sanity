import AddToBasketButton from "@/components/AddToBasketButton";
import CheckoutButtonWithModal from "@/components/CheckoutButtonWithModal";
import ProductDetailTabs from "@/components/ProductDetailTabs";
import ProductImageGallery from "@/components/ProductImageGallery";
import { urlFor } from "@/sanity/lib/image";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { CreditCard, LifeBuoy, Rocket, Truck } from "lucide-react";
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
    {
        icon: Rocket,
        title: "ফ্রি শিপিং",
        description: "৫০০ টাকা-এর বেশি সব অর্ডারে কোনো ডেলিভারি চার্জ নেই।",
    },
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProductImageGallery product={product} isOutOfStock={isOutOfStock} />

                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-6">
                            {product.name}
                        </h1>
                        <div className="flex flex-wrap gap-4 text-xl font-bold mb-4">
                            <p className="text-black text-nowrap">
                                Tk {product.price}
                            </p>
                            <div className="text-nowrap text-gray-500 relative">
                                <span className="absolute top-1/2 w-full h-[2px] bg-gray-500" />
                                Tk {Number(product.price) - save}
                            </div>
                            <div className="px-2 py-1 bg-theme-primary text-white text-sm rounded">
                                SAVE TK {save}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
                        <AddToBasketButton product={product} disabled={isOutOfStock} />

                        <CheckoutButtonWithModal isOutOfStock={isOutOfStock} />
                    </div>
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