import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BasketItem } from "./store";

export interface Order {
  id: string; 
  customerName: string;
  phoneNumber: string;
  address: string;
  division: string;
  city: string;
  postalCode: string;
  deliveryInstruction?: string;
  items: BasketItem[];
  totalPrice: number;
  paymentMethod: string;
  status: string;
  orderDate: string;
}

interface OrderState {
  orders: Order[];
  addOrder: (orderData: Order) => void;
  updateOrderStatus: (id: string, newStatus: string) => void;
  clearOrders: () => void;
  getLastOrder: () => Order | null;
}

const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (orderData) => {
        set({ orders: [...get().orders, orderData] });
      },

      updateOrderStatus: (id, newStatus) => {
        set({
          orders: get().orders.map((order) =>
            order.id === id ? { ...order, status: newStatus } : order
          ),
        });
      },

      clearOrders: () => set({ orders: [] }),

      getLastOrder: () => {
        const { orders } = get();
        return orders.length > 0 ? orders[orders.length - 1] : null;
      },
    }),
    { name: "order-store" }
  )
);

export default useOrderStore;
