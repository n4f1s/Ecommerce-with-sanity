"use client";

import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";


type SanityChild = {
    _type: "span";
    _key: string;
    text?: string;
    marks?: string[];
};

function ProductThumb({ product }: { product: Product }) {
    const isOutOfStock = product.stock != null && product.stock <= 0;

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
                    Tk {product.price}
                </p>
            </div>
        </Link>
    );
}

export default ProductThumb;
