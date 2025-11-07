"use client";

import AddToCartQuantity from "@/components/product/AddToCartQuantity";
import ShippingAddressForm from "@/components/order/ShippingAddressForm";
import { urlFor } from "@/sanity/lib/image";
import useCartStore from "@/store/cart-store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import CartEmptyOrLastOrder from "./components/CartEmptyOrLastOrder";
import Loading from "./loading";
import BreadcrumbsBar from "@/components/layout/Breadcrumb";

function optionsKey(opts: Record<string, string> = {}) {
  const entries = Object.entries(opts).filter(([k, v]) => k && v);
  entries.sort(([a], [b]) => a.localeCompare(b));
  return entries.map(([k, v]) => `${k}=${v}`).join("|");
}

function CartPage() {
  const groupedItems = useCartStore((s) => s.getGroupedItems());
  const itemsTotal = useCartStore.getState().getTotalPrice();
  const [deliveryCharge, setDeliveryCharge] = useState<number>(120); // default outer Dhaka
  const finalTotal = useMemo(() => itemsTotal + deliveryCharge, [itemsTotal, deliveryCharge]);
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  if (!isClient) return <Loading />;

  // Cart is empty or already made an order
  if (groupedItems.length === 0) {
    return <CartEmptyOrLastOrder />;
  }

  return (
    <>
      <BreadcrumbsBar />
      <div className="sm:px-16 px-4 pt-4 pb-10 sm:pb-16 max-w-[1500px] w-full h-full mx-auto relative">
        <h1 className="mb-4 text-2xl font-bold">Your Cart</h1>

        <div className="lg:grid lg:grid-cols-6 gap-8">
          <div className="col-span-4">
            {groupedItems?.map((item) => {
              const sel = item.selectedOptions ?? {};
              const lineKey = `${item.product._id}::${optionsKey(sel)}`;

              return (
                <div
                  key={lineKey}
                  className="mb-4 flex items-center justify-between rounded-2xl border p-4 lg:max-w-[800px]"
                >
                  <div
                    className="min-w-0 flex flex-1 cursor-pointer items-center"
                    onClick={() => router.push(`/product/${item.product.slug?.current}`)}
                  >
                    <div className="mr-4 size-20 flex-shrink-0 sm:size-24">
                      {item.product.image && (
                        <Image
                          src={urlFor(item.product.image).url()}
                          alt={item.product.name ?? "Product image"}
                          className="h-full w-full rounded object-cover"
                          width={96}
                          height={96}
                          priority
                          fetchPriority="high"
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-semibold sm:text-xl">
                        {item.product.name}
                      </h2>

                      <p className="text-sm sm:text-base">
                        Price: Tk {Number(item.product.price ?? 0)}
                      </p>

                      {/* Render selected options */}
                      {Object.keys(sel).length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-2 text-xs text-gray-600">
                          {Object.entries(sel)
                            .sort(([a], [b]) => a.localeCompare(b))
                            .map(([name, value]) => (
                              <span
                                key={`${name}:${value}`}
                                className="inline-flex items-center rounded border px-2 py-0.5"
                              >
                                {name}: {value}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="ml-4 flex flex-shrink-0 items-center">
                    {/* Quantity control must target this specific selection */}
                    <AddToCartQuantity product={item.product} selectedOptions={sel} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="col-span-2 h-fit rounded-2xl border bg-white p-6">
            <h3 className="text-xl font-bold">Order Summary</h3>
            <div className="mt-4 space-y-2">
              <p className="flex justify-between">
                <span>
                  Items (
                  {groupedItems.reduce((total, item) => total + item.quantity, 0)}
                  )
                </span>
                <span>Tk {itemsTotal}</span>
              </p>
              <p className="flex justify-between">
                <span>Delivery charge</span>
                <span>Tk {deliveryCharge}</span>
              </p>
              <p className="flex justify-between border-t pt-2 text-xl font-bold">
                <span>Total</span>
                <span>Tk {finalTotal}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 h-auto w-full">
          <h3 className="text-xl font-semibold text-gray-700">আপনার ঠিকানা</h3>
          <div className="my-6 h-[1px] w-full bg-gray-400" />
          <ShippingAddressForm onChargeChange={setDeliveryCharge} />
        </div>
      </div>
    </>
  );
}

export default CartPage;
