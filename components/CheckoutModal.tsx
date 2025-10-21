"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import useBasketStore from "@/store/store";


interface CheckoutModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CheckoutModal = ({ isOpen, setIsOpen }: CheckoutModalProps) => {
  const { getGroupedItems, getTotalPrice, clearBasket } = useBasketStore();
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          items: getGroupedItems(),
          totalPrice: getTotalPrice(),
        }),
      });

      if (res.ok) {
        setSuccess(true);
        clearBasket();
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="relative bg-white rounded-lg shadow max-w-xl w-full p-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {!success ? (
              <>
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Checkout (Cash on Delivery)
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    className="w-full border rounded p-2"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    className="w-full border rounded p-2"
                    required
                  />
                  <textarea
                    placeholder="Delivery Address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full border rounded p-2"
                    required
                  ></textarea>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {isSubmitting ? "Placing Order..." : "Place Order"}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <h3 className="text-xl font-semibold text-green-600">
                  🎉 Order Placed Successfully!
                </h3>
                <p className="text-gray-600 mt-2">
                  We’ll contact you soon for delivery.
                </p>
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
