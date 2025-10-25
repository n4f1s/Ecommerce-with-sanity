"use client";

import { useState } from "react";
import useBasketStore from "@/store/cart-store";
import toast from "react-hot-toast";
import useOrderStore from "@/store/order-store";

interface ShippingAddressFormProps {
  onSuccess?: () => void;
}

const divisions = [
  "Dhaka",
  "Chattogram",
  "Khulna",
  "Rajshahi",
  "Sylhet",
  "Barishal",
  "Rangpur",
  "Mymensingh",
];

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // convert 0 -> 12 for 12 AM
  const hoursStr = String(hours).padStart(2, "0");

  return `${year}-${month}-${day} ${hoursStr}:${minutes} ${ampm}`;
};


export default function ShippingAddressForm({ onSuccess }: ShippingAddressFormProps) {
  const { getGroupedItems, getTotalPrice, clearBasket } = useBasketStore();
  const { addOrder } = useOrderStore();

  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    address: "",
    division: "",
    city: "",
    postalCode: "",
    deliveryInstruction: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const DELIVERY_CHARGE = 120;

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
          totalPrice: getTotalPrice() + DELIVERY_CHARGE,
        }),
      });

      if (res.ok) {
        const data = await res.json();

        // Add to order store using spread syntax
        addOrder({
          ...formData,
          id: data.orderNumber, // returned from Sanity
          items: getGroupedItems(),
          totalPrice: getTotalPrice() + DELIVERY_CHARGE,
          paymentMethod: "Cash on Delivery",
          status: data.status,
          orderDate: formatDate(new Date()),
        });

        clearBasket();
        onSuccess?.();
      } else {
        toast.error("অর্ডার দেওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setIsSubmitting(false);
      toast.success("🎉 অর্ডার সফল হয়েছে! ডেলিভারির জন্য আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।")
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-sm border space-y-4"
      autoComplete="on"
    >
      {/* 2-column grid for larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            পূর্ণ নাম
          </label>
          <input
            id="fullName"
            name="name"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-theme-primary"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            মোবাইল নাম্বার
          </label>
          <input
            id="phoneNumber"
            name="tel"
            type="tel"
            placeholder="Enter your phone number"
            autoComplete="tel"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-theme-primary"
            required
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            ঠিকানা
          </label>
          <textarea
            id="address"
            name="street-address"
            placeholder="Street address or P.O. Box"
            autoComplete="street-address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full border rounded p-2 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-theme-primary"
            required
          ></textarea>
        </div>

        {/* Division */}
        <div>
          <label htmlFor="division" className="block text-sm font-medium text-gray-700 mb-1">
            বিভাগ
          </label>
          <select
            id="division"
            name="address-level1"
            autoComplete="address-level1"
            value={formData.division}
            onChange={(e) => setFormData({ ...formData, division: e.target.value })}
            className="w-full border rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-theme-primary"
            required
          >
            <option value="">Select Division</option>
            {divisions.map((div) => (
              <option key={div} value={div}>
                {div}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            শহর / উপজেলা
          </label>
          <input
            id="city"
            name="address-level2"
            type="text"
            placeholder="Enter your city or area"
            autoComplete="address-level2"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-theme-primary"
            required
          />
        </div>

        {/* Postal Code */}
        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
            পোস্টাল কোড
          </label>
          <input
            id="postalCode"
            name="postal-code"
            type="text"
            placeholder="Enter your postal code"
            autoComplete="postal-code"
            value={formData.postalCode}
            onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-theme-primary"
            required
          />
        </div>

        {/* Delivery Instruction */}
        <div className="md:col-span-2">
          <label
            htmlFor="deliveryInstruction"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ডেলিভারি সংক্রান্ত নির্দেশনা (ঐচ্ছিক)
          </label>
          <textarea
            id="deliveryInstruction"
            name="delivery-notes"
            rows={6}
            placeholder="Add any delivery instruction (optional)"
            value={formData.deliveryInstruction}
            onChange={(e) =>
              setFormData({ ...formData, deliveryInstruction: e.target.value })
            }
            className="w-full border rounded p-2 resize-y focus:outline-none focus:ring-2 focus:ring-theme-primary"
          ></textarea>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-theme-primary text-white py-2 rounded hover:bg-theme-secondary transition disabled:bg-gray-400"
        >
          {isSubmitting ? "অর্ডার প্রসেস করা হচ্ছে..." : "অর্ডার করুন"}
        </button>
      </div>
    </form>

  );
}
