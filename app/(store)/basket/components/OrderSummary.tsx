"use client";

import useBasketStore from "@/store/cart-store";

export default function OrderSummary() {
    const totalItems = useBasketStore((s) =>
        s.getGroupedItems().reduce((sum, item) => sum + item.quantity, 0)
    );
    const totalPrice = useBasketStore((s) => s.getTotalPrice());

    return (
        <div className="col-span-2 h-fit bg-white p-6 border rounded-2xl">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-2">
                <p className="flex justify-between">
                    <span>Items ({totalItems})</span>
                    <span>Tk {totalPrice.toFixed(0)}</span>
                </p>
                <p className="flex justify-between">
                    <span>Delivery charge</span>
                    <span>Tk 120</span>
                </p>
                <p className="flex justify-between text-xl font-bold border-t pt-2">
                    <span>Total</span>
                    <span>Tk {(totalPrice + 120).toFixed(0)}</span>
                </p>
            </div>
        </div>
    );
}
