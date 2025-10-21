"use client"

import AddToBasketButton from "@/components/AddToBasketButton";
import CheckoutButtonWithModal from "@/components/CheckoutButtonWithModal";
import Loader from "@/components/loader";
import { urlFor } from "@/sanity/lib/image";
import useBasketStore from "@/store/store"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


function BasketPage() {
    const groupedItems = useBasketStore((state) => state.getGroupedItems());
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    if (!isClient) return <Loader />

    if (groupedItems.length === 0) {
        return (
            <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Your Basket
                </h1>
                <p className="text-gray-600 text-lg">
                    Your basket is empty.
                </p>
            </div>
        )
    }

    return (
        <div className="wrapper">
            <h1 className="text-2xl font-bold mb-4">
                Your Basket
            </h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-grow">
                    {groupedItems?.map((item) => (
                        <div
                            className="mb-4 p-4 border rounded flex items-center justify-between"
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

                <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
                    <h3 className="text-xl font-semibold">
                        Order Summary
                    </h3>
                    <div className="mt-4 space-y-2">
                        <p className="flex justify-between">
                            <span>Items:</span>
                            <span>
                                {groupedItems.reduce((total, item) => total + item.quantity, 0)}
                            </span>
                        </p>
                        <p className="flex justify-between text-2xl font-bold border-t pt-2">
                            <span>Total:</span>
                            <span>
                                Tk {useBasketStore.getState().getTotalPrice().toFixed(0)}
                            </span>
                        </p>
                    </div>

                    {/* Checkout button With Modal */}
                    <div className="mt-5">
                        <CheckoutButtonWithModal />
                    </div>
                </div>

                <div className="h-64 lg:h-0">

                </div>
            </div>
        </div>
    )
}

export default BasketPage