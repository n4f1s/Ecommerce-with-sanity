"use client";

import { useEffect, useMemo, useState } from "react";
import AddToCartButton from "@/components/product/AddToCartButton";
import AddToCartQuantity from "@/components/product/AddToCartQuantity";
import OrderNowButton from "@/components/order/OrderNowButton";
import type { Product } from "@/sanity.types";

// Utility: className joiner
function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  product: Product;
  baseOutOfStock: boolean;
};

export default function ProductActions({ product, baseOutOfStock }: Props) {
  // Initial selection from first value of each option
  const initialSelected = useMemo(() => {
    const obj: Record<string, string> = {};
    for (const opt of product.options ?? []) {
      const first = opt?.values?.find((v) => v?.label);
      if (opt?.name && first?.label) obj[opt.name] = first.label;
    }
    return obj;
  }, [product.options]);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(initialSelected);

  // Keep selections valid when product options change
  useEffect(() => {
    setSelectedOptions((prev) => {
      const next: Record<string, string> = {};
      for (const opt of product.options ?? []) {
        if (!opt?.name) continue;
        const allowed = (opt.values ?? []).map((v) => v?.label).filter(Boolean) as string[];
        const current = prev[opt.name];
        if (current && allowed.includes(current)) {
          next[opt.name] = current;
        } else if (allowed[0]) {
          next[opt.name] = allowed[0];
        }
      }
      return next;
    });
  }, [product.options]);


  // Out-of-stock is base only (no variant logic)
  const isOutOfStock = baseOutOfStock;

  // Option change
  function onSelectOption(optName: string, value: string) {
    setSelectedOptions((prev) => ({ ...prev, [optName]: value }));
  }

  const save = (product?.previousPrice ?? 0) - (product?.price ?? 0);

  return (
    <div className="w-auto space-y-4">
      {/* Price */}
      <div className="flex flex-wrap gap-4 text-xl font-bold mb-4 items-center">
        <p className="text-nowrap text-2xl text-theme-primary">Tk {product.price}</p>
        <div className="relative text-nowrap text-gray-500 text-base">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-0 w-full h-[2px] bg-gray-500"
          />
          Tk {product.previousPrice}
        </div>
        {Number(save) > 0 && (
          <div className="px-2 py-1 bg-theme-primary text-white text-sm rounded">SAVE TK {save}</div>
        )}
      </div>

      {/* Options as radio groups (no variant resolution) */}
      {(product.options?.length ?? 0) > 0 && (
        <div className="space-y-6">
          {product.options!.map((opt) => {
            if (!opt?.name) return null;
            const groupId = `opt-${opt._key || opt.name}`;
            const current = selectedOptions[opt.name];
            const values = (opt.values ?? []).filter((v) => v?.label);

            return (
              <fieldset key={groupId} className="space-y-2">
                <legend id={`${groupId}-label`} className="text-sm font-semibold">
                  {opt.name}
                </legend>

                <div role="radiogroup" aria-labelledby={`${groupId}-label`} className="flex flex-wrap gap-2">
                  {values.map((v) => {
                    if (!v?.label) return null;
                    const isColor = opt?.name?.toLowerCase() === "color" && Boolean(v.hex);
                    const isActive = current === v.label;
                    const radioId = `${groupId}-${v._key || v.label}`;

                    return (
                      <label
                        key={radioId}
                        htmlFor={radioId}
                        className={cx(
                          "inline-flex items-center gap-2 border rounded px-3 py-1.5 text-sm cursor-pointer select-none",
                          isActive ? "border-black ring-1 ring-black" : "border-gray-300"
                        )}
                      >
                        <input
                          id={radioId}
                          type="radio"
                          name={groupId}
                          value={v.label}
                          checked={isActive}
                          onChange={() => onSelectOption(opt.name!, v.label!)}
                          className="sr-only"
                          aria-checked={isActive}
                        />
                        {isColor ? (
                          <span
                            className="inline-block h-4 w-4 rounded-full border"
                            title={v.label}
                            aria-hidden="true"
                            style={{ backgroundColor: v.hex as string }}
                          />
                        ) : null}
                        <span>{v.label}</span>
                        {v.hex ? <span className="text-xs text-gray-500">{v.hex}</span> : null}
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}
        </div>
      )}

      {/* Quantity */}
      <div className="flex justify-start items-center gap-4">
        <p className="text-lg font-semibold">Quantity</p>
        <AddToCartQuantity selectedOptions={selectedOptions} product={product} disabled={isOutOfStock} />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <AddToCartButton
          product={product}
          selectedOptions={selectedOptions}
          disabled={isOutOfStock}
          className="bg-white border border-black/40 text-black hover:text-white"
        />
        <OrderNowButton product={product} selectedOptions={selectedOptions} disabled={isOutOfStock} />
      </div>

      <p className="text-base text-theme-primary">ক্যাশ অন ডেলিভারি</p>
      <p className="mt-4 text-sm font-medium text-gray-500">২-৩ কার্যদিবসের মধ্যেই আপনার কাছে পৌছে যাবে।</p>
    </div>
  );
}
