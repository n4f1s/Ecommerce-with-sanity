"use client";

import { Button } from "@/components/ui/button";
import useOrderStore from "@/store/order-store";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function BasketEmptyOrLastOrder() {
    const router = useRouter();
    const { getLastOrder } = useOrderStore();
    const lastOrder = getLastOrder();

    if (lastOrder) {
        return (
            <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-60px)]">
                <div
                    key={lastOrder.id}
                    className="bg-gray-100 shadow-lg rounded-lg py-8 sm:py-20 px-6 border border-gray-200 max-w-3xl mx-auto"
                >
                    <h1 className="text-2xl sm:text-6xl font-bold mb-2 text-green-600 text-center">
                        Thank You!
                    </h1>
                    <p className="sm:text-xl font-semibold text-gray-600 text-center">
                        🎉 Your order ({lastOrder.id}) has been placed successfully
                    </p>

                    <div className="w-full h-[1px] bg-gray-400 my-2" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                        <div className="space-y-2">
                            <p><strong>Name:</strong> {lastOrder.customerName}</p>
                            <p><strong>Total:</strong> Tk {lastOrder.totalPrice}</p>
                            <p><strong>Order date:</strong> {lastOrder.orderDate}</p>
                        </div>

                        <div className="space-y-2">
                            <p><strong>Phone:</strong> {lastOrder.phoneNumber}</p>
                            <p><strong>Payment method:</strong> {lastOrder.paymentMethod}</p>
                            <p><strong>Payment status:</strong> Unpaid</p>
                        </div>
                    </div>

                    <p>
                        <strong>Address:</strong> {lastOrder.address}, {lastOrder.city}, {lastOrder.division}, {lastOrder.postalCode}
                    </p>

                    {lastOrder.deliveryInstruction && (
                        <p><strong>Note:</strong> {lastOrder.deliveryInstruction}</p>
                    )}

                    <div className="mt-6">
                        <h4 className="text-xl text-theme-primary font-bold mb-2">Products</h4>
                        <ul className="space-y-2">
                            {lastOrder.items.map((item, index) => {
                                return (
                                    <li key={index} className="flex justify-between border-b pb-2">
                                        <span>{item.product.name ?? "Product"}</span>
                                        <span>
                                            {item.quantity ?? 0} × Tk {item.product.price ?? 0}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <Link href="/">
                    <Button className="mt-14 text-lg">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    // Empty basket fallback
    return (
        <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[50vh]">
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
                Your basket is empty.
            </h1>
            <p className="text-gray-600 text-lg mb-6">Add new product to order</p>
            <button
                onClick={() => router.push("/")}
                className="bg-theme-primary text-white py-2 px-4 rounded hover:bg-theme-secondary transition"
            >
                Start Shopping
            </button>
        </div>
    );
}
