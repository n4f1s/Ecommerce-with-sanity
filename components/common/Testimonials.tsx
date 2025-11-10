"use client"

import Image from "next/image"
import { useMemo } from "react"
import { CheckCircle2, Star } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"

type Testimonial = {
  id: string
  name: string
  location: string
  avatar?: string
  rating: 1 | 2 | 3 | 4 | 5
  text: string
  tag?: string
}

const STARS = [1, 2, 3, 4, 5]

export default function Testimonials() {
  const items: Testimonial[] = useMemo(
    () => [
      {
        id: "t1",
        name: "Md. Fahim",
        location: "Dhaka",
        avatar: "/testimonial1.jpg",
        rating: 5,
        text: "Fast delivery and genuine products! The support team replied within minutes on WhatsApp.",
        tag: "Verified Purchase",
      },
      {
        id: "t2",
        name: "Mohaiminur Rahman",
        location: "Khulna",
        avatar: "/testimonial2.jpg",
        rating: 5,
        text: "Great pricing and solid packaging. Order arrived earlier than expected!",
        tag: "Watch",
      },
      {
        id: "t3",
        name: "Nusrat Jahan",
        location: "Sylhet",
        avatar: "/testimonial6.jpg",
        rating: 5,
        text: "Love the winter collection! Quality is excellent and the fit is perfect. Will order again.",
        tag: "Winter Collection",
      },
      {
        id: "t4",
        name: "Tanvir Ahmed",
        location: "Rajshahi",
        avatar: "/testimonial4.jpg",
        rating: 5,
        text: "Smooth checkout, timely updates, and real-time tracking. Highly recommend ShopHikes!",
        tag: "Verified Purchase",
      },
      {
        id: "t5",
        name: "Sadia Islam",
        location: "Khulna",
        avatar: "/testimonial5.jpg",
        rating: 5,
        text: "Excellent customer service. They helped me choose the right product and delivery was quick.",
        tag: "Skin Care",
      },
      {
        id: "t6",
        name: "Rafi Karim",
        location: "Barishal",
        avatar: "/testimonial3.jpg",
        rating: 5,
        text: "Best online shopping experience in Bangladesh! Authentic products, fast shipping.",
        tag: "Toys & Games",
      },
      {
        id: "t7",
        name: "Musfiqur Rahman",
        location: "Khulna",
        avatar: "/testimonial7.jpg",
        rating: 5,
        text: "Received my water bottle in perfect condition. Great quality and exactly as shown in photos.",
        tag: "Water Bottles",
      },
      {
        id: "t8",
        name: "Hasan Mahmud",
        location: "Chattogram",
        avatar: "/testimonial8.jpg",
        rating: 5,
        text: "Amazing deals and easy returns. The posture corrector strap really works. Impressed!",
        tag: "Verified Purchase",
      },
    ],
    []
  )

  return (
    <section aria-labelledby="home-testimonials" className="bg-white overflow-hidden">
      <div className="wrapper">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-theme-primary/10 text-theme-primary text-sm font-semibold mb-3">
            Customer Reviews
          </span>
          <h2 id="home-testimonials" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Loved by Thousands Across Bangladesh
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3">
            Top‑rated products and service. See why shoppers keep coming back.
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={1.1}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          className="!pb-2"
        >
          {items.map((t) => (
            <SwiperSlide key={t.id}>
              <TestimonialCard t={t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="group relative h-full flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-theme-primary/30 transition-all duration-300">
      {/* Top: Avatar + Name + Location */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-gray-100">
          <Image
            src={t.avatar || "/avatars/placeholder.webp"}
            alt={`${t.name} avatar`}
            fill
            sizes="48px"
            className="object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base leading-tight truncate">{t.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{t.location}, Bangladesh</p>
        </div>
      </div>

      {/* Stars + Tag */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
          {STARS.map((s) => (
            <Star
              key={s}
              className={`h-4 w-4 ${s <= t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
              aria-hidden="true"
            />
          ))}
        </div>

        {t.tag && (
          <span className="inline-flex items-center gap-1 rounded-full bg-theme-primary/10 text-theme-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide">
            <CheckCircle2 className="h-3 w-3" />
            {t.tag}
          </span>
        )}
      </div>

      {/* Review Text */}
      <blockquote className="text-gray-700 text-[15px] leading-relaxed flex-1">
        &quot;{t.text}&quot;
      </blockquote>

      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-theme-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </article>
  )
}
