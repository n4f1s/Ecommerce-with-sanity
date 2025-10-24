"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroBanner() {
    const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const section = document.getElementById("products");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };


    return (
        <section className="relative bg-gradient-to-br from-theme-primary/90 to-orange-500 text-white overflow-hidden">
            <div className="wrapper flex flex-col-reverse lg:flex-row items-center justify-between gap-10">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-xl text-center lg:text-left"
                >
                    <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                        সেরা পণ্যসমূহ আপনার দোরগোড়ায়
                    </h1>

                    <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed">
                        বিশেষ মূল্য, দারুণ অফার এবং গুণগত মানের নিশ্চয়তা — এখনই অনলাইনে অর্ডার করুন
                        এবং দ্রুততম সময়ে পণ্য বুঝে নিন। দ্রুত ডেলিভারি। ক্যাশ অন ডেলিভারি সুবিধা।
                    </p>

                    <Button onClick={handleScroll} className="text-lg">
                        কালেকশন দেখুন
                    </Button>
                </motion.div>

                {/* Right Image / Visual */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative w-full lg:w-[50%] flex justify-center rounded-2xl"
                >
                    <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px] rounded-2xl ">
                        <Image
                            src="/heroBanner.webp"
                            alt="Delicious food hero"
                            fill
                            priority
                            className="object-contain drop-shadow-2xl"
                        />
                    </div>

                    {/* Decorative Circles */}
                    <div className="absolute -z-10 w-[800px] h-[800px] bg-white/10 rounded-full blur-3xl top-[-100px] left-[-200px]" />
                    <div className="absolute -z-10 w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-2xl bottom-[-100px] right-[-100px]" />
                </motion.div>
            </div>
        </section>
    );
}
