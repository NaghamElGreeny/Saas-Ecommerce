
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartResponse } from "@/utils/cartTypes";
import { cartService } from "@/services/ClientApiHandler";

interface CartStore {
  cart: CartResponse | null;
  loading: boolean;
  actionLoading: boolean;
  error: string | null;
  couponCode: string | null;
  couponValue: number | null;

  fetchCart: (params?: Record<string, string>) => Promise<void>;
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
      couponCode: null,
      couponValue: null,

      fetchCart: async (params) => {
        set({ loading: true, error: null });
        try {
          const res = await cartService.getCart(params);
          set({
            cart: res,
            loading: false,
            couponCode: res.coupon_code,
            couponValue: res.price?.coupon_price ?? null,
          });
        } catch (err) {
          set({
            error: err?.message || "Failed to fetch cart",
            loading: false,
          });
        }
      },

      setCart: (cart: CartResponse) =>
        set({
          cart,
          couponCode: cart.coupon_code,
          couponValue: cart.price?.coupon_price ?? null,
        }),

      clearCart: async () => {
        set({ actionLoading: true, error: null });
        try {
          await cartService.clearCart();
          await get().fetchCart();
          set({ couponCode: null, couponValue: null });
        } catch (err) {
          set({ error: err.message || "Failed to clear cart" });
        } finally {
          set({ actionLoading: false });
        }
      },

      updateProductQuantity: async (productId, quantity) => {
        set({ actionLoading: true, error: null });
        const payload = {
          cart_product_id: productId,
          quantity,
          _method: "put" as const,
        };
        try {
          await cartService.updateCount(payload);
          await get().fetchCart();
        } catch (err) {
          set({ error: err.message || "Failed to update quantity" });
        } finally {
          set({ actionLoading: false });
        }
      },

      removeProduct: async (productId) => {
        set({ actionLoading: true, error: null });
        try {
          await cartService.deleteItem(productId);
          await get().fetchCart();
        } catch (err) {
          set({ error: err.message || "Failed to remove product" });
        } finally {
          set({ actionLoading: false });
        }
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
