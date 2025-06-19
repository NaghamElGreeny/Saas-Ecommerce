// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
// import { CartData } from '@/utils/cartTypes';
// import { getCart } from '@/services/ClientApiHandler';
// import { useAuthStore } from './authStore';

// interface CartStore {
//   cart: CartData | null;
//   loading: boolean;
//   error: string | null;

//   fetchCart: () => Promise<void>;
//   clearCart: () => void;
//   setCart: (cart: CartData) => void;
//   updateProductQuantity: (productId: number, quantity: number) => void;
//   removeProduct: (productId: number) => void;
// }

// export const useCartStore = create<CartStore>()(
//   persist(
//     (set, get) => ({
//       cart: null,
//       loading: false,
//       error: null,

//       fetchCart: async () => {
//         const token = useAuthStore.getState().token;
//         if (!token) {
//           set({ error: 'No token found', loading: false });
//           return;
//         }

//         set({ loading: true, error: null });

//         try {
//           const res = await getCart(); 
//           set({ cart: res.data.data, loading: false });
//         } catch (err: any) {
//           set({
//             error: err?.message || 'Failed to fetch cart',
//             loading: false,
//           });
//         }
//       },

//       setCart: (cart: CartData) => set({ cart }),

//       clearCart: () => set({ cart: null }),

//       updateProductQuantity: (productId, quantity) => {
//         const cart = get().cart;
//         if (!cart) return;

//         const updatedProducts = cart.products.map((p) =>
//           p.id === productId ? { ...p, quantity } : p
//         );

//         set({ cart: { ...cart, products: updatedProducts } });
//       },

//       removeProduct: (productId) => {
//         const cart = get().cart;
//         if (!cart) return;

//         const filteredProducts = cart.products.filter((p) => p.id !== productId);

//         set({ cart: { ...cart, products: filteredProducts } });
//       },
//     }),
//     {
//       name: 'cart-storage', // اسمه مختلف عن auth-store عشان ما يحصلش تعارض
//     }
//   )
// );




// import { create } from 'zustand';
// import { CartResponse, CartData, CartProduct } from './types'; // import the types we defined
// import axios from 'axios';

// interface CartStore {
//   cart: CartData | null;
//   loading: boolean;
//   error: string | null;
//   token: string | null;

//   setToken: (token: string) => void;
//   fetchCart: () => Promise<void>;
//   clearCart: () => void;
//   setCart: (cart: CartData) => void;

//   updateProductQuantity: (productId: number, quantity: number) => void;
//   removeProduct: (productId: number) => void;
// }

// export const useCartStore = create<CartStore>((set, get) => ({
//   cart: null,
//   loading: false,
//   error: null,
//   token: null,

//   setToken: (token: string) => set({ token }),

//   fetchCart: async () => {
//     const token = get().token;
//     if (!token) {
//       set({ error: 'No token found', loading: false });
//       return;
//     }

//     set({ loading: true, error: null });

//     try {
//       const res = await axios.get<CartResponse>('https://api.example.com/cart', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       set({ cart: res.data.data, loading: false });
//     } catch (err: any) {
//       set({ error: err.message || 'Failed to fetch cart', loading: false });
//     }
//   },

//   setCart: (cart: CartData) => set({ cart }),

//   clearCart: () => set({ cart: null }),

//   updateProductQuantity: (productId: number, quantity: number) => {
//     const cart = get().cart;
//     if (!cart) return;

//     const updatedProducts = cart.products.map((p) =>
//       p.id === productId ? { ...p, quantity } : p
//     );

//     const updatedCart = { ...cart, products: updatedProducts };
//     set({ cart: updatedCart });
//   },

//   removeProduct: (productId: number) => {
//     const cart = get().cart;
//     if (!cart) return;

//     const filteredProducts = cart.products.filter((p) => p.id !== productId);
//     const updatedCart = { ...cart, products: filteredProducts };
//     set({ cart: updatedCart });
//   },
// }));

import { create } from 'zustand';
import { CartData, CartResponse } from '@/utils/cartTypes';
import { useAuthStore } from './authStore';
import axiosInstance from '@/services/axiosClient';

interface CartStore {
  cart: CartData | null;
  loading: boolean;
  error: string | null;

  clearCart: () => void;
  setCart: (cart: CartData) => void;

  updateProductQuantity: (productId: number, quantity: number) => void;
  removeProduct: (productId: number) => void;
  fetchCart: () => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: null,
  loading: false,
  error: null,

  fetchCart: async () => {
    const token = useAuthStore.getState().token;
    if (!token) {
      set({ error: 'No token found', loading: false });
      return;
    }

    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.get<CartResponse>('carts');

      set({ cart: res.data.data, loading: false });
    } catch (err: unknown) {
      let errorMessage = 'Failed to fetch cart';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      set({ error: errorMessage, loading: false });
    }
  },

  setCart: (cart: CartData) => set({ cart }),
  clearCart: () => set({ cart: null }),

  updateProductQuantity: (productId: number, quantity: number) => {
    const cart = get().cart;
    if (!cart) return;

    const updatedProducts = cart.products.map((p) =>
      p.id === productId ? { ...p, quantity } : p
    );

    const updatedCart = { ...cart, products: updatedProducts };
    set({ cart: updatedCart });
  },

  removeProduct: (productId: number) => {
    const cart = get().cart;
    if (!cart) return;

    const filteredProducts = cart.products.filter((p) => p.id !== productId);
    const updatedCart = { ...cart, products: filteredProducts };
    set({ cart: updatedCart });
  },
}));
