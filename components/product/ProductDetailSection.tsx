"use client";

import { Product } from "@/sanity.types";
import { useState, useMemo } from "react";
import ProductInfo from "./ProductInfo";
import ProductPurchasePanel from "./ProductPurchasePanel";
import ProductImageGallery from "./ProductImageGallery";

type ImageType = NonNullable<Product['image']> // generated Sanity image type
type MaybeImage = ImageType | null

type ProductWithMedia = Product & {
  videoUrl?: string
  poster?: ImageType
}

interface ProductDetailSectionProps {
  product: Product;
  isOutOfStock: boolean;
}

export default function ProductDetailSection({
  product,
  isOutOfStock,
}: ProductDetailSectionProps) {
  const [selectedImage, setSelectedImage] = useState<MaybeImage>(null);
  const [quantity, setQuantity] = useState(1);

  // Extract all images including main image and product images
  const allImages = useMemo<ImageType[]>(() => {
    const imgs: ImageType[] = []
    if (product.image) imgs.push(product.image as ImageType)
    if (product.productImages?.length) imgs.push(...(product.productImages as ImageType[]))
    return imgs
  }, [product.image, product.productImages])

  const p = product as ProductWithMedia;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Column 1: Image Slider */}
      <div className="lg:col-span-3">
        <ProductImageGallery
          images={allImages}
          videoUrl={p.videoUrl}
          poster={p.poster ?? null}
          selectedImage={selectedImage}
        />
      </div>

      {/* Column 2: Product Info */}
      <div className="lg:col-span-5">
        <ProductInfo product={product} />
      </div>

      {/* Column 3: Purchase Panel */}
      <div className="lg:col-span-4">
        <ProductPurchasePanel
          product={product}
          isOutOfStock={isOutOfStock}
          quantity={quantity}
          setQuantity={setQuantity}
          setSelectedImage={setSelectedImage}
        />
      </div>
    </div>
  );
}
