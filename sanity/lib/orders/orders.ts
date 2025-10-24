import { client } from "@/sanity/lib/client";
import useOrderStore from "@/store/orderStore";
import type { SanityDocument } from "@sanity/client";

export function subscribeToOrderStatusChanges() {
  const { updateOrderStatus } = useOrderStore.getState();

  const subscription = client
    .listen<SanityDocument>('*[_type == "order"]', {}, { includeResult: true })
    .subscribe((event) => {
      // Only handle mutation events with a result
      if (event.type === "mutation" && event.result) {
        const updatedOrder = event.result;

        // Update Zustand store
        updateOrderStatus(updatedOrder._id, updatedOrder.status);
      }
    });

  return subscription; // unsubscribe() when needed
}
