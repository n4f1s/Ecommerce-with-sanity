"use client";

import { useTrackButtonClick } from "@/hooks/useTrackButtonClick";
import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

function formatDiscount(prev?: number, now?: number) {
  if (typeof prev !== "number" || typeof now !== "number") return null;
  if (!(prev > now) || prev <= 0) return null;
  const pct = Math.round(((prev - now) / prev) * 100);
  return pct > 0 ? pct : null;
}

function ProductCard({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;
  const trackClick = useTrackButtonClick("plp");

  const itemId = product.slug?.current ?? product._id ?? "unknown";
  const itemName = product.name ?? "product";
  const href = `/products/${product.slug?.current ?? product._id}`;

  const price = typeof product.price === "number" ? product.price : undefined;
  const previousPrice =
    typeof product.previousPrice === "number" ? product.previousPrice : undefined;
  const discountPct = formatDiscount(previousPrice, price);

  return (
    <Link
      scroll={true}
      href={href}
      className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
        isOutOfStock ? "opacity-50" : ""
      }`}
      onClick={() =>
        trackClick("plp_card_click", {
          item_id: itemId,
          item_name: itemName,
          placement: "plp_grid_card",
          out_of_stock: isOutOfStock ? 1 : 0,
          price,
          has_discount: discountPct ? 1 : 0,
          discount_pct: discountPct ?? undefined,
        })
      }
      data-gtm={`plp_card_${itemId}`}
      aria-label={`View ${itemName}`}
    >
      {/* Image wrapper must be relative so the badge can be positioned absolutely */}
      <div className="relative aspect-square w-full sm:h-[250px] overflow-hidden">
        {/* Discount badge (top-left) */}
        {discountPct && (
          <span
            className="absolute left-4 top-3 z-10 rounded-full bg-gradient-to-r from-theme-primary to-theme-secondary px-3 py-1 text-xs font-semibold text-white"
            aria-label={`${discountPct}% off`}
          >
            {discountPct}% OFF
          </span>
        )}

        <Image
          src={
            product.image
              ? urlFor(product.image).width(600).format("webp").bg("ffffff").url()
              : "/placeholder.webp"
          }
          alt={itemName || "Product image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-base font-semibold text-gray-800 line-clamp-2">
          {itemName}
        </h2>

        <div className="mt-2 flex items-center gap-2">
          <p className="text-lg font-bold text-theme-primary">Tk {price ?? 0}</p>
          {previousPrice && previousPrice > (price ?? 0) && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">
              Tk {previousPrice}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
