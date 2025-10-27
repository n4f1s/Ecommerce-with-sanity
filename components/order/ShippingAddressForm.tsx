"use client";

import { useEffect, useMemo, useState } from "react";
import useCartStore from "@/store/cart-store";
import useOrderStore from "@/store/order-store";
import toast from "react-hot-toast";
import { useBDLocations } from "@/hooks/useLocations";

interface ShippingAddressFormProps {
  onSuccess?: () => void;
  onChargeChange?: (charge: number) => void;
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const hoursStr = String(hours).padStart(2, "0");

  return `${year}-${month}-${day} ${hoursStr}:${minutes} ${ampm}`;
};

export default function ShippingAddressForm({
  onSuccess,
  onChargeChange,
}: ShippingAddressFormProps) {
  const { getGroupedItems, getTotalPrice, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();

  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    address: "",
    divisionId: "",
    divisionName: "",
    districtId: "",
    districtName: "",
    upazilaId: "",
    upazilaName: "",
    city: "",
    postalCode: "",
    deliveryInstruction: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Get filtered location data based on selections
  const { divisions, districts, upazilas } = useBDLocations(
    formData.divisionId,
    formData.districtId
  );

  // Compute delivery charge by division name
  const deliveryCharge = useMemo(() => {
    const name = (formData.divisionName || "").trim().toLowerCase();
    // Match both Bangla and English spellings if needed
    const isDhaka = name === "dhaka";
    return isDhaka ? 80 : 120;
  }, [formData.divisionName]);

  // Inform parent whenever charge changes
  useEffect(() => {
    onChargeChange?.(deliveryCharge);
  }, [deliveryCharge, onChargeChange]);

  // ✅ Handle division change
  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDivision = divisions.find((div) => div.id === e.target.value);

    setFormData({
      ...formData,
      divisionId: e.target.value,
      divisionName: selectedDivision?.name || "",
      // ✅ Reset dependent fields
      districtId: "",
      districtName: "",
      upazilaId: "",
      upazilaName: "",
    });
  };

  // ✅ Handle district change
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrict = districts.find((dist) => dist.id === e.target.value);

    setFormData({
      ...formData,
      districtId: e.target.value,
      districtName: selectedDistrict?.name || "",
      // ✅ Reset dependent field
      upazilaId: "",
      upazilaName: "",
    });
  };

  // ✅ Handle upazila change
  const handleUpazilaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUpazila = upazilas.find((upa) => upa.id === e.target.value);

    setFormData({
      ...formData,
      upazilaId: e.target.value,
      upazilaName: selectedUpazila?.name || "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/orders/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.customerName,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          division: formData.divisionName,
          district: formData.districtName,
          upazila: formData.upazilaName,
          city: formData.city,
          postalCode: formData.postalCode,
          deliveryInstruction: formData.deliveryInstruction,
          items: getGroupedItems(),
          deliveryCharge: deliveryCharge,
          totalPrice: getTotalPrice() + deliveryCharge,
        }),
      });

      const data = await res.json();

      // Handle rate limit error (429)
      if (res.status === 429) {
        const minutesUntilReset = Math.ceil((data.retryAfter || 0) / 60);
        toast.error(
          `অনেক বেশি অর্ডার দেওয়া হয়েছে। অনুগ্রহ করে ${minutesUntilReset} মিনিট পরে আবার চেষ্টা করুন।`,
          { duration: 6000 }
        );
        return;
      }

      // Handle validation error (400)
      if (res.status === 400) {
        toast.error(data.error || "অবৈধ তথ্য। অনুগ্রহ করে সঠিক তথ্য দিন।");
        console.error("Validation errors:", data.details);
        return;
      }

      // Handle other errors
      if (!res.ok) {
        toast.error(
          data.error || "অর্ডার দেওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"
        );
        return;
      }

      // Success - Save order to local store
      addOrder({
        id: data.orderNumber,
        customerName: formData.customerName,
        phoneNumber: formData.phoneNumber,
        deliveryCharge: deliveryCharge,
        address: formData.address,
        division: formData.divisionName,
        district: formData.districtName,
        upazila: formData.upazilaName,
        city: formData.city,
        postalCode: formData.postalCode,
        deliveryInstruction: formData.deliveryInstruction,
        items: getGroupedItems(),
        totalPrice: getTotalPrice() + deliveryCharge,
        paymentMethod: "Cash on Delivery",
        status: "pending",
        orderDate: formatDate(new Date()),
      });

      clearCart();
      toast.success(
        "🎉 অর্ডার সফল হয়েছে! ডেলিভারির জন্য আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।"
      );
      onSuccess?.();
    } catch (error) {
      console.error("Order creation error:", error);
      toast.error("ইন্টারনেট সংযোগ সমস্যা! অনুগ্রহ করে আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-sm border space-y-4"
      autoComplete="on"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            পূর্ণ নাম <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            name="name"
            type="text"
            placeholder="আপনার পূর্ণ নাম লিখুন"
            autoComplete="name"
            value={formData.customerName}
            onChange={(e) =>
              setFormData({ ...formData, customerName: e.target.value })
            }
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-theme-primary"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            মোবাইল নাম্বার <span className="text-red-500">*</span>
          </label>
          <input
            id="phoneNumber"
            name="tel"
            type="tel"
            placeholder="01XXXXXXXXX"
            autoComplete="tel"
            pattern="01[3-9]\d{8}"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-theme-primary"
            required
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ঠিকানা <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            name="street-address"
            placeholder="হাউস নং, রোড নং, এলাকা"
            autoComplete="street-address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full border rounded p-2 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-theme-primary"
            required
          />
        </div>

        {/* ✅ Division Dropdown */}
        <div>
          <label
            htmlFor="division"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            বিভাগ <span className="text-red-500">*</span>
          </label>
          <select
            id="division"
            name="address-level1"
            autoComplete="address-level1"
            value={formData.divisionId}
            onChange={handleDivisionChange}
            className="w-full border rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-theme-primary"
            required
          >
            <option value="">বিভাগ নির্বাচন করুন</option>
            {divisions.map((division) => (
              <option key={division.id} value={division.id}>
                {division.bn_name} ({division.name})
              </option>
            ))}
          </select>
        </div>

        {/* ✅ District Dropdown (Cascading) */}
        <div>
          <label
            htmlFor="district"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            জেলা <span className="text-red-500">*</span>
          </label>
          <select
            id="district"
            name="address-level2"
            autoComplete="address-level2"
            value={formData.districtId}
            onChange={handleDistrictChange}
            disabled={!formData.divisionId}
            className="w-full border rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-theme-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
            required
          >
            <option value="">
              {formData.divisionId ? "জেলা নির্বাচন করুন" : "প্রথমে বিভাগ নির্বাচন করুন"}
            </option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.bn_name} ({district.name})
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Upazila Dropdown (Cascading) */}
        <div>
          <label
            htmlFor="upazila"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            উপজেলা <span className="text-red-500">*</span>
          </label>
          <select
            id="upazila"
            name="address-level3"
            autoComplete="address-level3"
            value={formData.upazilaId}
            onChange={handleUpazilaChange}
            disabled={!formData.districtId}
            className="w-full border rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-theme-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
            required
          >
            <option value="">
              {formData.districtId ? "উপজেলা নির্বাচন করুন" : "প্রথমে জেলা নির্বাচন করুন"}
            </option>
            {upazilas.map((upazila) => (
              <option key={upazila.id} value={upazila.id}>
                {upazila.bn_name} ({upazila.name})
              </option>
            ))}
          </select>
        </div>

        {/* ✅ City/Area Field */}
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            শহর / এলাকা <span className="text-red-500">*</span>
          </label>
          <input
            id="city"
            name="address-level2"
            type="text"
            placeholder="যেমন: মিরপুর, ধানমন্ডি"
            autoComplete="address-level2"
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-theme-primary"
            required
          />
        </div>

        {/* Postal Code */}
        <div>
          <label
            htmlFor="postalCode"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            পোস্টাল কোড <span className="text-red-500">*</span>
          </label>
          <input
            id="postalCode"
            name="postal-code"
            type="text"
            placeholder="পোস্টাল কোড লিখুন"
            autoComplete="postal-code"
            pattern="\d{4}"
            value={formData.postalCode}
            onChange={(e) =>
              setFormData({ ...formData, postalCode: e.target.value })
            }
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
            rows={4}
            placeholder="যেমন: বাসার পাশের দোকানে রেখে যাবেন"
            value={formData.deliveryInstruction}
            onChange={(e) =>
              setFormData({ ...formData, deliveryInstruction: e.target.value })
            }
            className="w-full border rounded p-2 resize-y focus:outline-none focus:ring-2 focus:ring-theme-primary"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-theme-primary text-white py-3 rounded hover:bg-theme-secondary transition disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
        >
          {isSubmitting ? "অর্ডার প্রসেস করা হচ্ছে..." : "অর্ডার সম্পন্ন করুন"}
        </button>
      </div>
    </form>
  );
}
