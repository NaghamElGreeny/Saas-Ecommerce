/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {  CartResponse } from '@/utils/cartTypes';
import { getCart, updateCount, deleteItem, ClearCart } from '@/services/ClientApiHandler';

interface CartStore {
  cart: CartResponse | null;
  loading: boolean;
   actionLoading: boolean;
  error: string | null;

  fetchCart: () => Promise<void>;
  clearCart: () => Promise<void>;
  setCart: (cart: CartResponse) => void;
  updateProductQuantity: (productId: number, quantity: number) => Promise<void>;
  removeProduct: (productId: number) => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: null,
      loading: false,
       actionLoading: false,
      error: null,

      fetchCart: async () => {
         set({ loading: true, error: null });
        try {
          const res = await getCart();
          set({ cart: res, loading: false });
        } catch (err: any) {
          set({
            error: err?.message || 'Failed to fetch cart',
            loading: false,
          });
        }
      },

      setCart: (cart: CartResponse) => set({ cart }),

      clearCart: async () => {
         set({ actionLoading: true, error: null });
        try {
          await ClearCart();
          // set({ cart: null });
          await get().fetchCart();
        } catch (err: any) {
          set({ error: err.message || 'Failed to clear cart' });
        }finally {
          set({ actionLoading: false });
        }
      },

      updateProductQuantity: async (productId, quantity) => {
        set({ actionLoading: true, error: null });
        const payload = {
          cart_product_id: productId,
          quantity: quantity,
          _method: 'put' as const
        }
        try {
          await updateCount(payload);
          await get().fetchCart();
          // const cart = get().cart;
          // if (!cart) return;
          // const updatedProducts = cart.products.map((p) =>
          //   p.id === productId ? { ...p, quantity } : p
          // );

          // set({ cart: { ...cart, products: updatedProducts } });
        } catch (err: any) {
          set({ error: err.message || 'Failed to update quantity' });
        }   finally {
          set({ actionLoading: false });
        }
      },

      removeProduct: async (productId) => {
        set({ actionLoading: true, error: null });
        try {
          await deleteItem(productId);
          await get().fetchCart();
         // const cart = get().cart;
          // if (!cart) return;

          // const filteredProducts = cart.products.filter((p) => p.id !== productId);

          // set({ cart: { ...cart, products: filteredProducts } });
        } catch (err: any) {
          set({ error: err.message || 'Failed to remove product' });
        }finally {
          set({ actionLoading: false });
        }
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
