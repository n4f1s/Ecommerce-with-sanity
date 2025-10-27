"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperCore } from "swiper/types";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { Product } from "@/sanity.types";

interface ProductImageGalleryProps {
    product: Product;
    isOutOfStock?: boolean;
}

export default function ProductImageGallery({
    product,
    isOutOfStock = false,
}: ProductImageGalleryProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    // Combine main image + additional productImages
    const images = [product?.image, ...(product.productImages || [])].filter(Boolean);

    return (
        <div
            className={`w-full ${isOutOfStock ? "opacity-50" : ""}`}
        >
            {/* Main Image Slider */}
            <div className="relative">
                <Swiper
                    spaceBetween={10}
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev",
                    }}
                    loop
                    speed={400}
                    autoplay={{ delay: 5000, disableOnInteraction: true }}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Navigation, Thumbs, Autoplay]}
                    className="rounded-xl shadow-lg aspect-square w-full"
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                >
                    {images.map((img, i) => (
                        <SwiperSlide key={i}>
                            <div className="relative aspect-square overflow-hidden rounded-lg">
                                <Image
                                    src={img ? urlFor(img).width(800).format("webp").url() : ""}
                                    alt={product.name || `Product image ${i + 1}`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                                    className="object-contain bg-white"
                                    priority={i === 0}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* 🔵 Custom Navigation Arrows */}
                <div className="custom-prev absolute top-1/2 left-2 -translate-y-1/2 z-10 size-10 flex justify-center rounded-full bg-theme-primary shadow-md cursor-pointer hover:bg-theme-secondary transition-all duration-300">
                    <span className="text-3xl font-bold text-white">‹</span>
                </div>
                <div className="custom-next absolute top-1/2 right-2 -translate-y-1/2 z-10 size-10 flex justify-center rounded-full bg-theme-primary shadow-md cursor-pointer hover:bg-theme-secondary transition-all duration-300">
                    <span className="text-3xl font-bold text-white">›</span>
                </div>
            </div>

            {/* Thumbnail Slider */}
            {images.length > 1 && (
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    watchSlidesProgress
                    modules={[Thumbs]}
                    className="mt-3"
                >
                    {images.map((img, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className={`relative aspect-square overflow-hidden rounded-md border-2 cursor-pointer transition-all duration-300 ${activeIndex === i
                                    ? "border-theme-primary"
                                    : "border-transparent hover:border-gray-300"
                                    }`}
                            >
                                <Image
                                    src={
                                        img ? urlFor(img).width(200).format("webp").url() : ""
                                    }
                                    alt={`Thumbnail ${i + 1}`}
                                    fill
                                    sizes="80px"
                                    className="object-cover bg-white"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {/* Out of Stock Overlay */}
            {isOutOfStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                    <span className="text-white font-bold text-lg">Out of Stock</span>
                </div>
            )}
        </div>
    );
}
