"use client";

import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import useBasketStore from "@/store/store";
import { ShoppingCart } from "lucide-react";

type SanityChild = {
    _type: "span";
    _key: string;
    text?: string;
    marks?: string[];
};

function ProductThumb({ product }: { product: Product }) {
    const { addItem } = useBasketStore();
    const isOutOfStock = product.stock != null && product.stock <= 0;

    const handleAddToBasket = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // 🛑 Stop link navigation
        e.stopPropagation(); // 🛑 Stop event bubbling
        addItem(product);
    };

    return (
        <Link
            scroll={true}
            href={`/product/${product.slug?.current}`}
            className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${isOutOfStock ? "opacity-50" : ""
                }`}
        >
            <div className="relative aspect-square w-full sm:h-[250px] overflow-hidden">
                <Image
                    src={
                        product.image
                            ? urlFor(product.image)
                                .width(600)
                                .format("webp")
                                .bg("ffffff")
                                .url()
                            : "/placeholder.webp"
                    }
                    alt={product.name || "Product image"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <span className="text-white font-bold text-lg">Out of Stock</span>
                    </div>
                )}
                <div className="opacity-0 group-hover:opacity-100 w-full absolute bottom-0 transition-all duration-300">
                    <Button
                        className="w-full rounded-none text-lg font-bold hover:"
                        onClick={handleAddToBasket}
                        disabled={isOutOfStock}
                    >
                        <ShoppingCart className="size-5" />
                        ADD TO BASKET
                    </Button>
                </div>
            </div>

            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                </h2>

                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {product.description && Array.isArray(product.description)
                        ? product.description
                            .map((block) =>
                                block._type === "block"
                                    ? block.children
                                        ?.map((child: SanityChild) => child.text ?? "")
                                        .join("") ?? ""
                                    : ""
                            )
                            .join(" ")
                        : "No description available."}
                </p>

                <p className="mt-2 text-lg font-bold text-gray-900">
                    Tk {product.price?.toFixed(2)}
                </p>
            </div>
        </Link>
    );
}

export default ProductThumb;
