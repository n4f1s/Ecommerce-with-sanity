"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import CheckoutModal from "@/components/unUsed/CheckoutModal";


interface CheckoutButtonWithModalProps {
  isOutOfStock?: boolean;
}

export default function CheckoutButtonWithModal({
  isOutOfStock = false,
}: CheckoutButtonWithModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckOut = () => {
    if (isOutOfStock) return; // prevent modal open if product unavailable
    setIsOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleCheckOut}
        className={`bg-theme-primary hover:bg-theme-secondary ${
          isOutOfStock ? "opacity-60 cursor-not-allowed" : ""
        }`}
        disabled={isOutOfStock}
      >
        ক্যাশ অন ডেলিভারিতে অর্ডার করুন
      </Button>

      {/* Controlled Modal */}
      <CheckoutModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
