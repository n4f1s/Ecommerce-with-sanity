"use client";

import { Product } from "@/sanity.types";
import useCartStore from "@/store/cart-store";
import { useEffect, useState } from "react";

interface AddToCartQuantityProps {
  product: Product;
  disabled?: boolean;
  selectedOptions?: Record<string, string>;
}

function AddToCartQuantity({ product, disabled, selectedOptions = {} }: AddToCartQuantityProps) {
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);

  // Selector returns a number; component re-renders when this number changes
  const itemCount = useCartStore(
    (s) => s.getItemCount(product._id, { selectedOptions })
  );

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  if (!isClient) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => removeItem(product._id, { selectedOptions, quantity: 1 })}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 text-xl font-bold
          ${itemCount === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-600 hover:bg-gray-500"}`}
        disabled={itemCount === 0 || disabled}
        aria-label="Decrease quantity"
      >
        <span className="mb-[2px]">-</span>
      </button>

      <span className="w-8 h-8 flex items-center justify-center text-xl font-semibold" aria-live="polite">
        {itemCount}
      </span>

      <button
        onClick={() => addItem(product, { selectedOptions, quantity: 1 })}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 text-xl font-bold text-white
          ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-theme-primary hover:bg-theme-secondary"}`}
        disabled={disabled}
        aria-label="Increase quantity"
      >
        <span className="mb-[2px]">+</span>
      </button>
    </div>
  );
}

export default AddToCartQuantity;
