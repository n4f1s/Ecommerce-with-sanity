"use client"

import AddToCartButton from "@/components/product/AddToCartQuantity";
import ShippingAddressForm from "@/components/order/ShippingAddressForm";
import { urlFor } from "@/sanity/lib/image";
import useCartStore from "@/store/cart-store"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartEmptyOrLastOrder from "./components/CartEmptyOrLastOrder";
import Loading from "./loading";


function CartPage() {
    const groupedItems = useCartStore((state) => state.getGroupedItems());
    const itemsTotal = useCartStore.getState().getTotalPrice(); // total of items
    const deliveryCharge = 120;
    const finalTotal = itemsTotal + deliveryCharge;
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return <Loading />

    // Cart is empty or already made an order
    if (groupedItems.length === 0) {
        return <CartEmptyOrLastOrder />;
    }

    return (
        <div className="wrapper">
            <h1 className="text-2xl font-bold mb-4">
                Your Cart
            </h1>
            <div className="lg:grid lg:grid-cols-6 gap-8">
                <div className="col-span-4">
                    {groupedItems?.map((item) => (
                        <div
                            className="mb-4 p-4 border rounded-2xl flex items-center justify-between lg:max-w-[800px]"
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
                                            priority
                                            fetchPriority="high"
                                        />
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <h2 className="text-lg sm:text-xl font-semibold truncate">
                                        {item.product.name}
                                    </h2>
                                    <p className="text-sm sm:text-base">
                                        Price: Tk {" "}
                                        {(item.product.price ?? 0).toFixed(0)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center ml-4 flex-shrink-0">
                                <AddToCartButton product={item.product} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-span-2 h-fit bg-white p-6 border rounded-2xl">
                    <h3 className="text-xl font-bold">
                        Order Summary
                    </h3>
                    <div className="mt-4 space-y-2">
                        <p className="flex justify-between">
                            <span>Items ({groupedItems.reduce((total, item) => total + item.quantity, 0)})</span>
                            <span>
                                {itemsTotal}
                            </span>
                        </p>
                        <p className="flex justify-between">
                            <span>Delivery charge</span>
                            <span>
                                Tk 120
                            </span>
                        </p>
                        <p className="flex justify-between text-xl font-bold border-t pt-2">
                            <span>Total</span>
                            {/* Added 120 for Delivery charge */}
                            <span>
                                Tk {finalTotal}
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

export default CartPage;