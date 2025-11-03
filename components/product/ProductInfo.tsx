"use client";

import { Product } from "@/sanity.types";
import { PortableText, PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface ProductInfoProps {
  product: Product;
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <div className="my-4">
        <Image
          src={urlFor(value).width(600).format("webp").url()}
          alt={value.alt || "Feature image"}
          width={600}
          height={400}
          className="rounded-lg object-cover"
        />
      </div>
    ),
  },
};

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-6">
      {/* Product Name */}
      <div className="border-b">
        <h1 className="text-xl font-semibold mb-2">
          {product.name}
        </h1>
        {product.stock !== undefined && product.stock > 0 && (
          <p className="text-theme-primary font-medium">In Stock</p>
        )}
        {product.stock !== undefined && product.stock <= 0 && (
          <p className="text-red-600 font-medium">Out of Stock</p>
        )}
      </div>

      {/* Product Features */}
      {product.features && (
        <div className="prose prose-sm max-w-none">
          <PortableText
            value={product.features}
            components={portableTextComponents}
          />
        </div>
      )}
    </div>
  );
}
