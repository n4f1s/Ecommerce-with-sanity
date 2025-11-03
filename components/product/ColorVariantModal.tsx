// components/product/ColorVariantModal.tsx
"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useEffect } from "react";

interface ColorVariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  price: number;
  stock?: number;
}

export default function ColorVariantModal({
  isOpen,
  onClose,
  images,
  selectedIndex,
  onSelect,
  price,
  stock,
}: ColorVariantModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelect = (index: number) => {
    onSelect(index);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl z-50 lg:hidden max-h-[80vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
          <div>
            <h2 className="text-lg font-bold text-gray-900">৳ {price.toFixed(2)}</h2>
            <p className="text-sm text-gray-600">
              Color: Variant {selectedIndex + 1}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Variant Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3 gap-3">
            {images.map((image, index) => (
              <button
                key={image._key || index}
                onClick={() => handleSelect(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  selectedIndex === index
                    ? "border-theme-primary ring-2 ring-theme-primary ring-offset-2"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={urlFor(image).width(300).format("webp").url()}
                  alt={`Variant ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {selectedIndex === index && (
                  <div className="absolute inset-0 bg-theme-primary/10 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-theme-primary flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <span>Stock</span>
            <span className="font-medium text-gray-900">
              {stock !== undefined ? `${stock} available` : "In Stock"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-full bg-theme-primary hover:bg-theme-primary/90 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}
