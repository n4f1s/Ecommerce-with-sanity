"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper/types";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";




interface ProductImageGalleryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
  isOutOfStock?: boolean;
}
// Product & {videoUrl?: string;
type Slide =
  | { kind: "video"; src: string; poster?: string }
  | { kind: "image"; src: string; alt: string };

export default function ProductImageGallery({
  product,
  isOutOfStock = false,
}: ProductImageGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Precompute poster URLs with explicit aspect to respect crop/hotspot and reduce bytes
  const posterMain = useMemo(() => {
    return product.poster
      ? urlFor(product.poster).width(1200).fit("crop").format("webp").url()
      : undefined;
  }, [product.poster]);

  const posterThumb = useMemo(() => {
    return product.poster
      ? urlFor(product.poster).width(200).height(200).fit("crop").format("webp").url()
      : posterMain;
  }, [product.poster, posterMain]);

  const images: SanityImageSource[] = useMemo(() => {
    const raw = [product?.image, ...(product.productImages ?? [])];
    return raw.filter(Boolean) as SanityImageSource[];
  }, [product?.image, product.productImages]);

  // Build slides: video first if exists, then images; ensure stable refs
  const slides: Slide[] = useMemo(() => {
    const s: Slide[] = [];
    if (product.videoUrl) {
      s.push({ kind: "video", src: product.videoUrl, poster: posterMain });
    }
    for (let i = 0; i < images.length; i++) {
      s.push({
        kind: "image",
        src: urlFor(images[i]).width(800).format("webp").url(),
        alt: product.name || `Product image ${i + 1}`,
      });
    }
    if (s.length === 0) {
      s.push({
        kind: "image",
        src: "/placeholder.png",
        alt: product.name || "No image available",
      });
    }
    return s;
  }, [product.videoUrl, posterMain, images, product.name]);

  // Pause video when leaving the first slide (effect)
  useEffect(() => {
    if (activeIndex !== 0 && product.videoUrl && videoRef.current) {
      try {
        videoRef.current.pause();
      } catch {}
    }
  }, [activeIndex, product.videoUrl]);

  const onMainSlideChange = (swiper: SwiperInstance) => {
    const nextIndex = swiper.realIndex ?? swiper.activeIndex ?? 0;
    setActiveIndex(nextIndex);
    if (nextIndex !== 0 && product.videoUrl && videoRef.current) {
      try {
        videoRef.current.pause();
      } catch {}
    }
  };

  const thumbsOption = useMemo(() => {
    // Swiper recommends guarding against destroyed instances
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { swiper: thumbsSwiper && !(thumbsSwiper as any).destroyed ? thumbsSwiper : null };
  }, [thumbsSwiper]);


  return (
    <div className={`w-full ${isOutOfStock ? "opacity-50" : ""}`}>
      {/* Main Slider */}
      <div className="relative">
        <Swiper
          spaceBetween={10}
          navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
          loop
          speed={400}
          autoplay={{ delay: 5000, disableOnInteraction: true }}
          thumbs={thumbsOption}
          modules={[Navigation, Thumbs, Autoplay]}
          className="rounded-xl shadow-lg aspect-square w-full"
          onSlideChange={onMainSlideChange}
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={`main-${i}`}>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-white">
                {slide.kind === "video" ? (
                  <video
                    ref={videoRef}
                    poster={slide.poster}
                    className="h-full w-full object-contain bg-white"
                    preload="metadata"
                    controls
                    playsInline
                  >
                    <source src={slide.src} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 340px"
                    className="object-contain bg-white"
                    priority={i === 0}
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        {/* <div className="custom-prev absolute top-1/2 left-2 -translate-y-1/2 z-10 size-10 flex justify-center rounded-full bg-theme-primary shadow-md cursor-pointer hover:bg-theme-secondary transition-all duration-300">
          <span className="text-3xl font-bold text-white">‹</span>
        </div>
        <div className="custom-next absolute top-1/2 right-2 -translate-y-1/2 z-10 size-10 flex justify-center rounded-full bg-theme-primary shadow-md cursor-pointer hover:bg-theme-secondary transition-all duration-300">
          <span className="text-3xl font-bold text-white">›</span>
        </div> */}
      </div>

      {/* Thumbnails */}
      {slides.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          watchSlidesProgress
          modules={[Thumbs]}
          className="mt-3"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={`thumb-${i}`}>
              <div
                className={`relative aspect-square overflow-hidden rounded-md border-2 cursor-pointer transition-all duration-300 ${
                  activeIndex === i ? "border-theme-primary" : "border-transparent hover:border-gray-300"
                }`}
              >
                {slide.kind === "video" ? (
                  <>
                    <Image
                      src={posterThumb || "/poster-fallback.jpg"}
                      alt="Video thumbnail"
                      fill
                      sizes="80px"
                      className="object-cover bg-white"
                    />
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/60">
                        <svg width="12" height="12" viewBox="0 0 24 24" className="fill-white">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </span>
                  </>
                ) : (
                  <Image
                    src={slide.src}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover bg-white"
                  />
                )}
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
