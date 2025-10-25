'use client';

import { Product } from "@/sanity.types";
import useCartStore from "@/store/cart-store";
import { useEffect, useState } from "react";

interface AddToCartQuantityProps {
    product: Product;
    disabled?: boolean;
}

function AddToCartQuantity({ product, disabled }: AddToCartQuantityProps) {
    const { addItem, removeItem, getItemCount } = useCartStore();
    const itemCount = getItemCount(product._id);

    const [isClient, setIsClient] = useState(false);
    useEffect(() => setIsClient(true), []);

    if (!isClient) return null;

    return (
        <div className="flex items-center justify-center gap-2">
            {/* Minus Button */}
            <button
                onClick={() => removeItem(product._id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 text-xl font-bold
                    ${itemCount === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-500"}`}
                disabled={itemCount === 0 || disabled}
            >
                <span className="mb-[2px]">-</span>
            </button>

            {/* Quantity */}
            <span className="w-8 h-8 flex items-center justify-center text-xl font-semibold">
                {itemCount}
            </span>

            {/* Plus Button */}
            <button
                onClick={() => addItem(product)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 text-xl font-bold text-white
                ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-theme-primary hover:bg-theme-secondary"}`}
                disabled={disabled}
            >
                <span className="mb-[2px]">+</span>
            </button>
        </div>
    );
}

export default AddToCartQuantity;
