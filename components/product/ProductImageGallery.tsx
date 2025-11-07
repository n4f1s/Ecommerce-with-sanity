"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper/types";
import type { Product } from "@/sanity.types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

type ImageType = NonNullable<Product["image"]>;
type MaybeImage = ImageType | null;

interface ProductImageGalleryProps {
  images: ImageType[];
  selectedImage: MaybeImage;
  videoUrl?: string;
  poster?: MaybeImage;
  isOutOfStock?: boolean;
}

type Slide =
  | { kind: "video"; src: string; poster?: string }
  | { kind: "image"; src: string; alt: string; fromSelected?: boolean };

export default function ProductImageGallery({
  images,
  selectedImage,
  videoUrl,
  poster,
  isOutOfStock = false,
}: ProductImageGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [injectedSelectedSrc, setInjectedSelectedSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const posterMain = useMemo(() => {
    return poster ? urlFor(poster).width(1200).fit("crop").format("webp").url() : undefined;
  }, [poster]);

  const posterThumb = useMemo(() => {
    return poster
      ? urlFor(poster).width(200).height(200).fit("crop").format("webp").url()
      : posterMain;
  }, [poster, posterMain]);

  // Build slides: optional video, possibly injected selected image (if not in list), then images
  const slides: Slide[] = useMemo(() => {
    const s: Slide[] = [];
    if (videoUrl) s.push({ kind: "video", src: videoUrl, poster: posterMain });

    // If selected image URL is not part of images, inject it right after video
    if (injectedSelectedSrc) {
      s.push({
        kind: "image",
        src: injectedSelectedSrc,
        alt: "Selected image",
        fromSelected: true,
      });
    }

    for (let i = 0; i < images.length; i++) {
      s.push({
        kind: "image",
        src: urlFor(images[i]).width(800).format("webp").url(),
        alt: `Product image ${i + 1}`,
      });
    }

    if (s.length === 0) {
      s.push({ kind: "image", src: "/placeholder.png", alt: "No image available" });
    }
    return s;
  }, [videoUrl, posterMain, images, injectedSelectedSrc]);

  // Sync main swiper to selectedImage; inject if not found
  useEffect(() => {
    if (!selectedImage) return;

    const selectedUrl = urlFor(selectedImage).width(800).format("webp").url();

    // If already present, slide to it
    const idx = slides.findIndex((s) => s.kind === "image" && s.src === selectedUrl);
    if (idx >= 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (mainSwiper && !(mainSwiper as any).destroyed) {
        mainSwiper.slideTo(idx);
      } else {
        setActiveIndex(idx);
      }
      // Clear any previously injected slide if not needed anymore
      if (injectedSelectedSrc) setInjectedSelectedSrc(null);
      return;
    }

    // Not present: inject and then slide to the injected index (video at 0 if exists)
    const injectedIndex = videoUrl ? 1 : 0;
    setInjectedSelectedSrc(selectedUrl);

    // After slides recompute, move to injected index
    // Use a microtask to let React re-render Swiper
    queueMicrotask(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (mainSwiper && !(mainSwiper as any).destroyed) {
        mainSwiper.slideTo(injectedIndex);
      } else {
        setActiveIndex(injectedIndex);
      }
    });
  }, [selectedImage, slides, mainSwiper, videoUrl, injectedSelectedSrc]);

  // Pause video when leaving its slide
  useEffect(() => {
    if (activeIndex !== 0 && videoUrl && videoRef.current) {
      try {
        videoRef.current.pause();
      } catch {}
    }
  }, [activeIndex, videoUrl]);

  const onMainSlideChange = (swiper: SwiperInstance) => {
    const nextIndex = swiper.realIndex ?? swiper.activeIndex ?? 0;
    setActiveIndex(nextIndex);
    if (nextIndex !== 0 && videoUrl && videoRef.current) {
      try {
        videoRef.current.pause();
      } catch {}
    }
  };

  const thumbsOption = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return { swiper: thumbsSwiper && !(thumbsSwiper as any).destroyed ? thumbsSwiper : null };
  }, [thumbsSwiper]);

  return (
    <div className={`w-full ${isOutOfStock ? "opacity-50" : ""}`}>
      {/* Main Slider */}
      <div className="relative">
        <Swiper
          onSwiper={setMainSwiper}
          spaceBetween={10}
          loop
          speed={400}
          thumbs={thumbsOption}
          modules={[Thumbs]}
          className="rounded-xl shadow-lg aspect-square w-full"
          onSlideChange={onMainSlideChange}
          initialSlide={activeIndex}
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
