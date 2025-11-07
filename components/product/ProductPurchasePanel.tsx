"use client";

import { Product } from "@/sanity.types";
import { useMemo, useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import useCartStore from "@/store/cart-store";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";

type ImageType = NonNullable<Product["image"]>;
type MaybeImage = ImageType | null;

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

  // Required option names (e.g., Color, Size)
  const requiredOptionNames = useMemo(() => {
    return (product.options ?? [])
      .map((o) => {
        if (!o || typeof o !== "object") return "";
        const opt = o as { label?: string; name?: string };
        return (opt.label || opt.name || "").trim();
      })
      .filter(Boolean);
  }, [product.options]); // Inline validation is clearer than disabling CTAs, per PDP UX research.

  const isOptionsComplete = useMemo(
    () => requiredOptionNames.every((n) => !!selectedOptions[n]),
    [requiredOptionNames, selectedOptions]
  ); // Validate on click instead of disabling, to avoid “mystery disabled” buttons. [web:174][web:215]

  const firstMissing = useMemo(
    () => requiredOptionNames.find((n) => !selectedOptions[n]) || null,
    [requiredOptionNames, selectedOptions]
  ); // Used to guide attention to the exact missing choice. 

  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && (product.stock === undefined || newQty <= product.stock)) {
      setQuantity(newQty);
    }
  }; // Standard PDP quantity controls with stock guard.

  const guideToFirstMissing = () => {
    if (!firstMissing) return;
    const el = document.querySelector(
      `[data-option-name="${CSS.escape(firstMissing)}"]`
    );
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      const focusable = el.querySelector<HTMLElement>(
        'button,[role="button"],[tabindex="0"],input,select'
      );
      focusable?.focus();
    }
  }; // On-click guidance: scroll and focus to missing option, improving error discoverability. 

  const handleAddToCart = () => {
    if (!isOptionsComplete) {
      guideToFirstMissing();
      return;
    }
    if (isOutOfStock) return;
    addItem(product, { selectedOptions, quantity });
  }; // Keep CTA enabled; validate at click to provide immediate, actionable feedback. 

  const handleOrderNow = () => {
    if (!isOptionsComplete) {
      guideToFirstMissing();
      return;
    }
    if (isOutOfStock) return;
    addItem(product, { selectedOptions, quantity });
    router.push("/cart");
  }; // Mirrored behavior for buy-now to reduce friction and errors. 

  const handleOptionChange = (
    optionName: string,
    value: string,
    image?: MaybeImage
  ) => {
    setSelectedImage(image ?? null);
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
  }; // Syncs selected image and chosen variant value per option.

  return (
    <div className="space-y-6 lg:sticky lg:top-4">
      {/* Price Section */}
      <div className="flex flex-wrap gap-4 text-xl font-bold mb-4 items-center">
        <p className="text-nowrap text-2xl text-theme-primary">Tk {price}</p>
        {product.previousPrice ? (
          <div className="relative text-nowrap text-gray-500 text-base">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-0 w-full h-[2px] bg-gray-500"
            />
            Tk {product.previousPrice}
          </div>
        ) : null}
        {Number(discount) > 0 && (
          <div className="px-2 py-1 bg-theme-primary text-white text-sm rounded">
            SAVE TK {discount}
          </div>
        )}
      </div>

      {/* Inline guidance near options (announced and visible) */}
      {product.options?.length ? (
        !isOptionsComplete && (
          <p
            role="status"
            aria-live="polite"
            className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2"
          >
            Select {firstMissing ?? "all required options"} to continue.
          </p>
        )
      ) : null} {/* Live region ensures assistive tech gets immediate guidance. [web:185][web:211] */}

      {/* Product Options */}
      {product.options && product.options.length > 0 && (
        <div className="space-y-4">
          {product.options.map((option) => {
            const opt = option as {
              _key?: string;
              label?: string;
              name?: string;
              values?: unknown[];
            };
            const optionName = opt?.label || opt?.name || "Option";
            const values = Array.isArray(opt?.values) ? opt.values : [];

            if (values.length === 0) return null;

            return (
              <div key={opt._key} data-option-name={optionName}>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  {optionName}: {selectedOptions[optionName] || "Select"}
                  {!selectedOptions[optionName] && (
                    <span className="ml-2 text-xs text-gray-500">(required)</span>
                  )}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {values.map((value, idx) => {
                    const isString = typeof value === "string";
                    const vObj =
                      !isString && typeof value === "object" && value
                        ? (value as {
                            _key?: string;
                            label?: string;
                            name?: string;
                            image?: ImageType;
                            _type?: string;
                          })
                        : undefined;

                    const displayValue = isString
                      ? (value as string)
                      : vObj?.label || vObj?.name || `Option ${idx + 1}`;

                    // Allow either value.image or an image-shaped object as the value itself
                    const image: ImageType | undefined =
                      vObj?.image
                        ? vObj.image
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        : (!isString && (value as any)?._type === "image"
                            ? (value as ImageType)
                            : undefined);

                    const hasImage =
                      !!image && ((image).asset?._ref || (image).asset);

                    return hasImage ? (
                      <button
                        key={vObj?._key || idx}
                        type="button"
                        onClick={() =>
                          handleOptionChange(optionName, displayValue, image!)
                        }
                        className={`relative size-14 sm:size-24 aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                          selectedOptions[optionName] === displayValue
                            ? "border-theme-primary ring-2 ring-theme-primary ring-offset-2"
                            : "border-gray-200 hover:border-theme-secondary"
                        }`}
                        aria-pressed={selectedOptions[optionName] === displayValue}
                        aria-label={`${optionName}: ${displayValue}`}
                      >
                        <Image
                          src={urlFor(image!).width(200).format("webp").url()}
                          alt={String(displayValue)}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ) : (
                      <button
                        key={vObj?._key || idx}
                        type="button"
                        onClick={() =>
                          handleOptionChange(optionName, displayValue, null)
                        }
                        className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                          selectedOptions[optionName] === displayValue
                            ? "border-theme-primary bg-theme-primary text-white"
                            : "border-gray-200 text-gray-700 hover:border-theme-primary"
                        }`}
                        aria-pressed={selectedOptions[optionName] === displayValue}
                        aria-label={`${optionName}: ${displayValue}`}
                      >
                        {displayValue}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )} {/* Enabled choices with inline “(required)” hints reflect common retail PDP UX. [web:208][web:217] */}

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
            min={1}
            max={product.stock || undefined}
            aria-label="Quantity"
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
          <p className="text-xs text-gray-600 mt-2">{product.stock} items available</p>
        )}
      </div> {/* Familiar quantity interaction helps reduce friction and errors. [web:208][web:210] */}

      {/* Action Buttons (Enabled; validate on click) */}
      <div className="space-y-3">
        {!isOptionsComplete && product.options?.length ? (
          <p role="status" aria-live="polite" className="text-xs text-gray-600">
            Select {firstMissing ?? "all required options"} to continue.
          </p>
        ) : null}
        <button
          onClick={handleOrderNow}
          // Only disable for truly unavailable state (out of stock), not missing selections
          disabled={isOutOfStock}
          className="orderAnimation w-full bg-theme-primary hover:bg-theme-secondary text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isOutOfStock ? "Out of Stock" : "ক্যাশ অন ডেলিভারিতে অর্ডার করুন"}
        </button>
        <button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-full border-2 border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-5 h-5" />
          কার্টে নিন
        </button>
      </div> 
    </div>
  );
}
