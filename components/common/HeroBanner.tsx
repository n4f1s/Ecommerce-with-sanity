"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroBanner() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-theme-primary via-theme-primary/95 to-theme-secondary text-white">
            <div className="wrapper relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 py-16 sm:py-20 lg:py-28">
                {/* Left Content */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: {},
                        show: {
                            transition: { staggerChildren: 0.15 },
                        },
                    }}
                    className="flex-1 max-w-xl text-center lg:text-left"
                >
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, scale: 0.9 },
                            show: { opacity: 1, scale: 1 },
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                    >
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm font-medium">Fast & Reliable Delivery</span>
                    </motion.div>

                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            show: { opacity: 1, y: 0 },
                        }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
                    >
                        The Best Products at{" "}
                        <span className="text-yellow-300">Your Doorstep</span>
                    </motion.h1>

                    <motion.p
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            show: { opacity: 1, y: 0 },
                        }}
                        className="text-base sm:text-lg lg:text-xl font-semibold text-white/90 mb-8 leading-tight max-w-lg mx-auto lg:mx-0 "
                    >
                        Discover premium products handpicked for quality and reliability.
                        Enjoy fast delivery, secure payments, and a worry-free shopping experience.
                    </motion.p>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            show: { opacity: 1, y: 0 },
                        }}
                        className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                    >
                        <Button
                            asChild
                            size="lg"
                            className="group relative bg-white text-theme-primary hover:bg-white/90 font-semibold text-base sm:text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            <Link href="/products">
                                Browse Collection
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0 },
                            show: { opacity: 1 },
                        }}
                        className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-white/80"
                    >
                        {[
                            "Cash on Delivery",
                            "Easy Returns",
                            "Secure Shopping",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-2">
                                <svg
                                    className="w-5 h-5 text-green-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>{item}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="relative flex-1 w-full max-w-md lg:max-w-lg flex justify-center"
                >
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 5,
                            ease: "easeInOut",
                        }}
                        className="relative w-full aspect-square max-w-[400px] sm:max-w-[500px]"
                    >
                        <Image
                            src="/heroBanner.webp"
                            alt="Premium products hero banner"
                            fill
                            priority
                            sizes="(max-width: 640px) 400px, (max-width: 1024px) 500px, 600px"
                            className="object-contain drop-shadow-2xl"
                        />
                    </motion.div>

                    {/* Floating badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="absolute -bottom-4 -right-4 bg-white text-theme-primary px-5 py-3 rounded-full shadow-xl font-bold text-sm sm:text-base -z-1 hidden sm:block"
                    >
                        ⚡ Fast Delivery
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
