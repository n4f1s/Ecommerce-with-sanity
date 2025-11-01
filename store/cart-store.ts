import { Product } from '@/sanity.types'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type SelectedOptions = Record<string, string>;

export interface CartItem {
  product: Product
  quantity: number
  selectedOptions: SelectedOptions
}

export interface AddOpts {
  selectedOptions?: SelectedOptions
  quantity?: number
}

export interface RemoveOpts {
  selectedOptions?: SelectedOptions
  quantity?: number
}

export interface CountOpts {
  selectedOptions?: SelectedOptions
}

interface CartState {
  items: CartItem[]

  // Actions
  addItem: (product: Product, opts?: AddOpts) => void
  removeItem: (productId: string, opts?: RemoveOpts) => void
  clearCart: () => void

  // Selectors
  getTotalPrice: () => number
  getItemCount: (productId: string, opts?: CountOpts) => number
  getGroupedItems: () => CartItem[]
}

// Normalize options into a deterministic, stable key so that
// {Color: 'Red', Size: 'M'} equals {Size:'M', Color:'Red'}
function optionsKey(opts: SelectedOptions = {}): string {
  const entries = Object.entries(opts).filter(([k, v]) => k && v)
  entries.sort(([a], [b]) => a.localeCompare(b))
  return entries.map(([k, v]) => `${k}=${v}`).join('|')
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, opts) =>
        set((state) => {
          const sel = opts?.selectedOptions ?? {}
          const qty = Math.max(1, Number(opts?.quantity ?? 1))
          const key = optionsKey(sel)

          // Find existing line by product id + options key
          const idx = state.items.findIndex(
            (it) => it.product._id === product._id && optionsKey(it.selectedOptions) === key
          )

          if (idx >= 0) {
            const next = state.items.slice()
            next[idx] = { ...next[idx], quantity: next[idx].quantity + qty }
            return { items: next }
          }

          return {
            items: [
              ...state.items,
              { product, quantity: qty, selectedOptions: sel },
            ],
          }
        }),

      removeItem: (productId, opts) =>
        set((state) => {
          const sel = opts?.selectedOptions ?? {}
          const qty = Math.max(1, Number(opts?.quantity ?? 1))
          const key = optionsKey(sel)

          const next: CartItem[] = []
          for (const it of state.items) {
            const sameLine =
              it.product._id === productId &&
              optionsKey(it.selectedOptions) === key

            if (!sameLine) {
              next.push(it)
              continue
            }

            const newQty = it.quantity - qty
            if (newQty > 0) {
              next.push({ ...it, quantity: newQty })
            }
            // if newQty <= 0, drop the line
          }
          return { items: next }
        }),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + Number(item.product.price ?? 0) * item.quantity,
          0
        ),

      // If selectedOptions provided, return that line’s qty; otherwise total for this product id
      getItemCount: (productId, opts) => {
        const sel = opts?.selectedOptions
        if (sel) {
          const key = optionsKey(sel)
          const line = get().items.find(
            (it) => it.product._id === productId && optionsKey(it.selectedOptions) === key
          )
          return line ? line.quantity : 0
        }
        return get().items
          .filter((it) => it.product._id === productId)
          .reduce((sum, it) => sum + it.quantity, 0)
      },

      // Already normalized per line; return as-is
      getGroupedItems: () => get().items,
    }),
    {
      name: 'cart-store',
      storage: createJSONStorage(() => localStorage),
      // Optional: only persist items
      partialize: (state) => ({ items: state.items }),
    }
  )
)

export default useCartStore
