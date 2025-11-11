"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PortableText, PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/sanity.types";
import Image from "next/image";
import { useTrackButtonClick } from "@/hooks/useTrackButtonClick";

interface ProductDetailTabsProps {
    product: Product;
}

const components: PortableTextComponents = {
    types: {
        image: ({ value }) => (
            <div className="my-4 flex justify-center">
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

export default function ProductDetailTabs({ product }: ProductDetailTabsProps) {
    const [activeTab, setActiveTab] = useState<"description" | "delivery">(
        "description"
    );
    const trackClick = useTrackButtonClick("product-details-page");

    return (
        <div className="mt-10 overflow-hidden">

            {/* --- Tab Buttons --- */}
            <div className="flex gap-4 mb-6">
                <button
                    data-gtm="pdp_tab_description"
                    onClick={() => {
                        trackClick("pdp_tab_click", {
                            tab: "description",
                            placement: "pdp_tabs",
                            item_id: product?.slug?.current ?? product?._id ?? "unknown",
                            item_name: product?.name ?? "product",
                        }); 
                        setActiveTab("description");
                    }}
                    className={`
                    relative pb-2 text-lg font-semibold transition-colors duration-300 bg-gray-200 px-4 py-2 rounded cursor-pointer
                    ${activeTab === "description" ? "text-theme-primary" : "text-gray-600 hover:text-theme-primary"}
                    after:absolute after:bottom-0 after:left-0 after:h-[2px]
                    after:bg-theme-primary after:transition-all after:duration-300
                    after:ease-in-out
                    ${activeTab === "description" ? "after:w-full" : "after:w-0 hover:after:w-full"}
                    `}
                >
                    পণ্যের বিবরণ
                </button>

                <button
                    data-gtm="pdp_tab_delivery"
                    onClick={() => {
                        trackClick("pdp_tab_click", {
                            tab: "delivery",
                            placement: "pdp_tabs",
                            item_id: product?.slug?.current ?? product?._id ?? "unknown",
                            item_name: product?.name ?? "product",
                        }); 
                        setActiveTab("delivery");
                    }}
                    className={`
                    relative pb-2 text-lg font-semibold transition-colors duration-300 bg-gray-200 px-4 py-2 rounded cursor-pointer
                    ${activeTab === "delivery" ? "text-theme-primary" : "text-gray-600 hover:text-theme-primary"}
                    after:absolute after:bottom-0 after:left-0 after:h-[2px]
                    after:bg-theme-primary after:transition-all after:duration-300
                    after:ease-in-out
                    ${activeTab === "delivery" ? "after:w-full" : "after:w-0 hover:after:w-full"}
                    `}
                >
                    ডেলিভারি পলিসি
                </button>
            </div>


            {/* --- Animated Content --- */}
            <div className="w-full min-h-[500px]">
                <AnimatePresence mode="wait">
                    {activeTab === "description" ? (
                        <motion.div
                            key="description"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="prose max-w-none"
                        >
                            {Array.isArray(product.description) ? (
                                <PortableText value={product.description} components={components} />
                            ) : (
                                <p className="text-gray-600">কোনো বিবরণ পাওয়া যায়নি।</p>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="delivery"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="text-gray-700 leading-relaxed"
                        >
                            <ul className="list-disc ml-6 space-y-2">
                                <li>ঢাকার মধ্যে ২-৩ কার্যদিবসের মধ্যে ডেলিভারি সম্পন্ন হয়।</li>
                                <li>ঢাকার বাইরে ডেলিভারি ৩-৫ কার্যদিবসের মধ্যে সম্পন্ন হয়।</li>
                                <li>সব অর্ডারের জন্য কাস্টমারকে ফোন কনফার্মেশন দেওয়া হবে।</li>
                                <li>পণ্য হাতে পাওয়ার সময়ই মূল্য পরিশোধ করুন (Cash on Delivery)।</li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
