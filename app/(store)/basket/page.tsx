"use client"

import AddToBasketButton from "@/components/AddToBasketQuantity";
import Loader from "@/components/loader";
import ShippingAddressForm from "@/components/ShippingAddressForm";
import { urlFor } from "@/sanity/lib/image";
import useOrderStore from "@/store/orderStore";
import useBasketStore from "@/store/store"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


function BasketPage() {
    const groupedItems = useBasketStore((state) => state.getGroupedItems());
    const { getLastOrder } = useOrderStore();
    const lastOrder = getLastOrder();
    const router = useRouter();


    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    if (!isClient) return <Loader />

    // 🧺 Basket is empty
    if (groupedItems.length === 0) {
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh] text-center">
                {lastOrder ? (
                    <>
                        <h1 className="text-2xl font-bold mb-2 text-gray-800">
                            🎉 আপনার শেষ অর্ডার সম্পন্ন হয়েছে
                        </h1>
                        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md border border-gray-100">
                            <p className="text-gray-700 mb-2">
                                <strong>গ্রাহকের নাম:</strong> {lastOrder.customerName}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>ফোন:</strong> {lastOrder.phoneNumber}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>মোট:</strong> Tk {lastOrder.totalPrice}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>স্ট্যাটাস:</strong> {lastOrder.status}
                            </p>
                            <p className="text-gray-500 text-sm mt-2">
                                অর্ডার আইডি: {lastOrder.id}
                            </p>
                        </div>
                        <button
                            onClick={() => router.push("/")}
                            className="mt-6 bg-theme-primary text-white py-2 px-4 rounded hover:bg-theme-secondary transition cursor-pointer"
                        >
                            নতুন অর্ডার করুন
                        </button>
                    </>
                ) : (
                    <>
                        <h1 className="text-2xl font-bold mb-4 text-gray-800">
                            আপনার ঝুড়ি খালি
                        </h1>
                        <p className="text-gray-600 text-lg mb-6">
                            নতুন পণ্য যোগ করুন এবং অর্ডার সম্পন্ন করুন।
                        </p>
                        <button
                            onClick={() => router.push("/shop")}
                            className="bg-theme-primary text-white py-2 px-4 rounded hover:bg-theme-secondary transition"
                        >
                            কেনাকাটা শুরু করুন
                        </button>
                    </>
                )}
            </div>
        );
    }

    return (
        <div className="wrapper">
            <h1 className="text-2xl font-bold mb-4">
                আপনার কার্ট
            </h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow">
                    {groupedItems?.map((item) => (
                        <div
                            className="mb-4 p-4 border rounded-2xl flex items-center justify-between"
                            key={item.product._id}
                        >
                            <div className="flex items-center cursor-pointer flex-1 min-w-0"
                                onClick={() => router.push(`/product/${item.product.slug?.current}`)}
                            >
                                <div className="size-20 sm:size-24 flex-shrink-0 mr-4">
                                    {item.product.image && (
                                        <Image
                                            src={urlFor(item.product.image).url()}
                                            alt={item.product.name ?? "Product image"}
                                            className="w-full h-full object-cover rounded"
                                            width={96}
                                            height={96}
                                        />
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <h2 className="text-lg sm:text-2xl font-semibold truncate">
                                        {item.product.name}
                                    </h2>
                                    <p className="text-sm sm:text-base">
                                        Price: Tk {" "}
                                        {((item.product.price ?? 0) * item.quantity).toFixed(0)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center ml-4 flex-shrink-0">
                                <AddToBasketButton product={item.product} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
                    <h3 className="text-xl font-semibold">
                        অর্ডার সারাংশ (Order Summary)
                    </h3>
                    <div className="mt-4 space-y-2">
                        <p className="flex justify-between">
                            <span>মোট মূল্য: (Items)</span>
                            <span>
                                {groupedItems.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        </p>
                        <p className="flex justify-between text-2xl font-bold border-t pt-2">
                            <span>মোট মূল্য: (Total)</span>
                            <span>
                                Tk {useBasketStore.getState().getTotalPrice().toFixed(0)}
                            </span>
                        </p>
                    </div>
                </div> */}

                <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded-2xl">
                    <h3 className="text-xl font-bold">
                        Order Summary
                    </h3>
                    <div className="mt-4 space-y-2">
                        <p className="flex justify-between">
                            <span>Items</span>
                            <span>
                                {groupedItems.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        </p>
                        <p className="flex justify-between text-xl font-bold border-t pt-2">
                            <span>Total</span>
                            <span>
                                Tk {useBasketStore.getState().getTotalPrice().toFixed(0)}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 w-full h-auto">
                <h3 className="text-gray-700 text-xl font-semibold">
                    আপনার ঠিকানা
                </h3>

                <div className="w-full bg-gray-400 h-[1px] my-6" />

                <ShippingAddressForm />
            </div>
        </div>
    )
}

export default BasketPage