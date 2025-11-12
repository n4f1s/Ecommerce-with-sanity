"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AddToCartQuantity from "@/components/product/AddToCartQuantity";
import ShippingAddressForm from "@/components/order/ShippingAddressForm";
import { urlFor } from "@/sanity/lib/image";
import useCartStore from "@/store/cart-store";
import CartEmptyOrLastOrder from "./components/CartEmptyOrLastOrder";
import Loading from "./loading";
import BreadcrumbsBar from "@/components/layout/Breadcrumb";
import MobileSummaryBar from "./components/MobileSummaryBar";
import DrawerSheet from "./components/DrawerSheet";

function optionsKey(opts: Record<string, string> = {}) {
  const entries = Object.entries(opts).filter(([k, v]) => k && v);
  entries.sort(([a], [b]) => a.localeCompare(b));
  return entries.map(([k, v]) => `${k}=${v}`).join("|");
}

function CartPage() {
  // Hooks at top-level to keep order stable across renders
  const router = useRouter();
  const groupedItems = useCartStore((s) => s.getGroupedItems());
  const itemsTotal = useCartStore.getState().getTotalPrice();

  // Use state for delivery charge; keep logic simple and predictable
  const [deliveryCharge, setDeliveryCharge] = useState<number>(120); // default outer Dhaka
  const finalTotal = useMemo(() => itemsTotal + deliveryCharge, [itemsTotal, deliveryCharge]);

  // Client-only guard (prevents hydration mismatch from store reads)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  // Derived values memoized for stability
  const itemCount = useMemo(
    () => groupedItems.reduce((total, item) => total + item.quantity, 0),
    [groupedItems]
  );

  // Drawer state and handlers
  const [drawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  if (!isClient) return <Loading />;
  if (groupedItems.length === 0) return <CartEmptyOrLastOrder />;

  return (
    <>
      <BreadcrumbsBar />

      <div className="sm:px-16 px-4 pt-4 pb-10 sm:pb-16 max-w-[1500px] w-full h-full mx-auto relative">
        <h1 className="mb-4 text-2xl font-bold">Your Cart</h1>

        <div className="lg:grid lg:grid-cols-6 gap-8">
          {/* Left: items and address form */}
          <div className="col-span-4">
            {groupedItems.map((item) => {
              const sel = item.selectedOptions ?? {};
              const lineKey = `${item.product._id}::${optionsKey(sel)}`;

              const price = Number(item.product.price ?? 0);
              const productHref = `/products/${item.product.slug?.current}`;

              return (
                <div
                  key={lineKey}
                  className="mb-4 flex items-center justify-between rounded-2xl border p-4 lg:max-w-[800px]"
                >
                  <button
                    type="button"
                    className="min-w-0 flex flex-1 items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-primary/60 rounded"
                    onClick={() => router.push(productHref)}
                    aria-label={`View ${item.product.name ?? "product"}`}
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

                      <p className="text-sm sm:text-base">Price: Tk {price}</p>

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
                  </button>

                  <div className="ml-4 flex flex-shrink-0 items-center">
                    <AddToCartQuantity product={item.product} selectedOptions={sel} />
                  </div>
                </div>
              );
            })}

            {/* Mobile compact summary bar (small) that opens the DrawerSheet */}
            <div className="lg:hidden sticky top-0 sm:top-[60px]">
              <MobileSummaryBar
                itemCount={itemCount}
                finalTotal={finalTotal}
                onOpen={openDrawer}
                label="View summary"
              />
            </div>

            {/* Address form */}
            <div className="mt-8 w-full">
              {/* Section header with subtle icon and better spacing */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-700">
                  আপনার ঠিকানা
                </h3>
                <span className="text-xs text-gray-500">
                  Required fields are marked <span className="text-red-500">*</span> 
                </span>
              </div>

              {/* Decorative separator with gradient accent */}
              <div className="mt-2 mb-6 h-[2px] w-full bg-gradient-to-r from-theme-primary via-theme-primary/60 to-transparent" />

              <ShippingAddressForm onChargeChange={setDeliveryCharge} />
            </div>

          </div>

          {/* Right: desktop sticky summary */}
          <aside className="col-span-2 h-fit rounded-2xl border bg-white p-6 sticky top-20 hidden lg:block">
            <h3 className="text-xl font-bold">Order Summary</h3>
            <div className="mt-4 space-y-2">
              <p className="flex justify-between">
                <span>Items ({itemCount})</span>
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
          </aside>
        </div>
      </div>

      {/* Mobile drawer with full summary details */}
      <DrawerSheet open={drawerOpen} onClose={closeDrawer} title="Order Summary">
        <div className="space-y-2">
          <p className="flex justify-between">
            <span>Items ({itemCount})</span>
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
        {/* Optional: place mobile CTAs here */}
        {/* <div className="mt-4"><CheckoutCTA /></div> */}
      </DrawerSheet>
    </>
  );
}

export default CartPage;
