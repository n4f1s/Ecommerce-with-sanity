"use client";

import { useEffect, useRef } from "react";
import useOrderStore from "@/store/order-store";

export function useOrderStatusSync(intervalMs: number = 30000) {
  const { orders, updateOrderStatus, getOrderIds } = useOrderStore();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Don't sync if no orders
    if (orders.length === 0) {
      return;
    }

    // Sync immediately on mount (except first mount)
    if (!isInitialMount.current) {
      syncOrderStatuses();
    }
    isInitialMount.current = false;

    // Set up polling interval
    const interval = setInterval(syncOrderStatuses, intervalMs);

    return () => clearInterval(interval);
  }, [orders.length]); // Only re-run if number of orders changes

  async function syncOrderStatuses() {
    try {
      const orderIds = getOrderIds();
      
      if (orderIds.length === 0) return;

      // Only send user's order IDs
      const response = await fetch('/api/orders/sync-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderIds }),
      });

      if (response.ok) {
        const updatedOrders = await response.json();

        // Update each order's status if changed
        updatedOrders.forEach((sanityOrder: any) => {
          const localOrder = orders.find(o => o.id === sanityOrder.orderNumber);

          if (localOrder && localOrder.status !== sanityOrder.status) {
            console.log(`Order ${sanityOrder.orderNumber} status updated: ${localOrder.status} → ${sanityOrder.status}`);
            updateOrderStatus(sanityOrder.orderNumber, sanityOrder.status);
          }
        });
      }
    } catch (error) {
      console.error('Failed to sync order statuses:', error);
    }
  }
}
