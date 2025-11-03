"use client";

import { Product } from "@/sanity.types";
import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import useCartStore from "@/store/cart-store";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ImageType = NonNullable<Product['image']>
type MaybeImage = ImageType | null

interface ProductPurchasePanelProps {
  product: Product;
  isOutOfStock: boolean;
  quantity: number;
  setQuantity: (qty: number) => void;
  setSelectedImage: (img: MaybeImage) => void;
}

export default function ProductPurchasePanel({
  product,
  isOutOfStock,
  quantity,
  setQuantity,
  setSelectedImage,
}: ProductPurchasePanelProps) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const price = product.price || 0;
  const previousPrice = product.previousPrice || 0;
  const discount = previousPrice > price ? previousPrice - price : 0;

  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && (product.stock === undefined || newQty <= product.stock)) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, { selectedOptions, quantity });
    // Optional: Show toast notification
  };

  const handleOrderNow = () => {
    if (isOutOfStock) return;
    addItem(product, { selectedOptions, quantity });
    router.push("/cart");
  };

  const handleOptionChange = (optionName: string, value: string, image?: MaybeImage) => {
    setSelectedImage(image ?? null);
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
  };


  return (
    <div className="space-y-6 lg:sticky lg:top-4">
      {/* Price Section */}
      <div className="flex flex-wrap gap-4 text-xl font-bold mb-4 items-center">
        <p className="text-nowrap text-2xl text-theme-primary">Tk {product.price}</p>

        {product.previousPrice && (
          <div className="relative text-nowrap text-gray-500 text-base">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-0 w-full h-[2px] bg-gray-500"
            />
            Tk {product.previousPrice}
          </div>
        )}

        {Number(discount) > 0 && (
          <div className="px-2 py-1 bg-theme-primary text-white text-sm rounded">SAVE TK {discount}</div>
        )}
      </div>

      {/* Color Variants - Mobile (opens modal) */}
      {/* {allImages.length > 1 && (
        <div className="lg:hidden">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-between p-3 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={urlFor(allImages[selectedVariantIndex]).width(100).format("webp").url()}
                  alt={`Selected variant`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="text-xs text-gray-600">Color</p>
                <p className="text-sm font-medium text-gray-900">
                  Variant {selectedVariantIndex + 1}
                </p>
              </div>
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      )} */}

      {/* Product Options (Size, etc.) - FIXED */}
      {product.options && product.options.length > 0 && (
        <div className="space-y-4">
          {product.options.map((option) => {
            // Safely extract option properties
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const optionData = option as any;
            const optionName = optionData?.label || optionData?.name || "Option";
            const values = optionData?.values || [];

            // Skip if no values available
            if (!Array.isArray(values) || values.length === 0) {
              return null;
            }

            return (
              <div key={option._key}>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  {optionName}: {selectedOptions[optionName] || "Select"}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {values.map((value, idx) => {
                    // Support both strings and objects
                    const displayValue =
                      typeof value === 'string'
                        ? value
                        : value?.label || value?.name || `Option ${idx + 1}`

                    // Optional per-value image support (value.image or value?.asset for Sanity images)
                    const image = typeof value === 'object' ? (value?.image || value) : undefined
                    const hasImage =
                      !!image &&
                      (image.asset || image._ref || image._type === 'image' || image?.asset?._ref)

                    return hasImage ? (
                      <button
                        key={value._key || idx}
                        type="button"
                        onClick={() => handleOptionChange(optionName, displayValue, image)}
                        className={`relative size-14 sm:size-24 aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedOptions[optionName] === displayValue
                          ? "border-theme-primary ring-2 ring-theme-primary ring-offset-2"
                          : "border-gray-200 hover:border-theme-secondary"
                          }`}
                      >
                        <Image
                          src={urlFor(image).width(100).format("webp").url()}
                          alt={String(displayValue)}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ) : (
                      <button
                        key={value._key || idx}
                        type="button"
                        onClick={() => handleOptionChange(optionName, displayValue)}
                        className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${selectedOptions[optionName] === displayValue
                          ? "border-theme-primary bg-theme-primary text-white"
                          : "border-gray-200 text-gray-700 hover:border-theme-primary"
                          }`}
                      >
                        {displayValue}
                      </button>
                    )
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quantity Selector */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Quantity</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value) || 1;
              if (val >= 1 && (product.stock === undefined || val <= product.stock)) {
                setQuantity(val);
              }
            }}
            className="w-16 h-10 text-center border-2 border-gray-300 rounded-lg font-semibold focus:outline-none focus:border-theme-primary"
            min="1"
            max={product.stock || undefined}
          />
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={product.stock !== undefined && quantity >= product.stock}
            className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {product.stock !== undefined && (
          <p className="text-xs text-gray-600 mt-2">
            {product.stock} items available
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleOrderNow}
          disabled={isOutOfStock}
          aria-label="ক্যাশ অন ডেলিভারিতে অর্ডার করুন"
          className="orderAnimation w-full bg-theme-primary hover:bg-theme-secondary text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isOutOfStock ? "Out of Stock" : "ক্যাশ অন ডেলিভারিতে অর্ডার করুন"}
        </button>
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          aria-label="ক্যাশ অন ডেলিভারিতে অর্ডার করুন"
          className="w-full border-2 border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-5 h-5" />
          কার্টে নিন
        </button>
      </div>


      {/* Color Variant Modal */}
      {/* <ColorVariantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={allImages}
        selectedIndex={selectedVariantIndex}
        onSelect={setSelectedImage}
        price={price}
        stock={product.stock}
      /> */}
    </div>
  );
}
