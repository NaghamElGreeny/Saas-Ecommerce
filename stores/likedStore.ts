/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  addToFavourites,
  getFavourites,
  removeFromFavourites,
} from '@/services/ClientApiHandler';
import { Product } from '@/utils/menuTypes';

type LikedStore = {
  likedItems: Product[];
  loading: boolean;
  error: string | null;

  fetchLikedItems: () => Promise<void>;
  toggleLike: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>; 
  isLiked: (itemId: number) => boolean;
};

export const useLikedStore = create<LikedStore>()(
  persist(
    (set, get) => ({
      likedItems: [],
      loading: false,
      error: null,

       fetchLikedItems: async () => {
        set({ loading: true, error: null });

        try {
          const res = await getFavourites();
             console.log("✅ Favourites response:", res);
          set({ likedItems: res.data, loading: false });
        } catch (error: any) {
          set({
            error: error?.message || 'فشل في تحميل المنتجات المفضلة',
            loading: false,
          });
        }
      },

    toggleLike: async (product: any) => {
  const { likedItems } = get();
  const isAlreadyLiked = likedItems.some((p) => p.id === product.id);

  try {
    if (isAlreadyLiked) {
      const favouriteItem = likedItems.find((p) => p.id === product.id);
      const favourite_id = product.favourite_id || favouriteItem?.favourite_id;

      if (!favourite_id) {
        throw new Error("favourite_id غير موجود");
      }

      await removeFromFavourites(favourite_id);

      set({
        likedItems: likedItems.filter((p) => p.id !== product.id),
      });
    } else {
      const added = await addToFavourites(product.id);

      const newFavourite = {
        ...product,
        favourite_id: added?.data?.id,
      };

      set({
        likedItems: [...likedItems, newFavourite],
      });
    }

    await get().fetchLikedItems();
  } catch (error: any) {
    set({
      error: error.message || "فشل في التعديل على المفضلة",
    });
  }
},

      removeFromWishlist: async (productId: number) => {
        const { likedItems } = get();
        try {
          await removeFromFavourites(productId);
          set({
            likedItems: likedItems.filter((item) => item.id !== productId),
          });
          await get().fetchLikedItems();
        } catch (error: any) {
          set({
            error: error.message || 'فشل في حذف المنتج من المفضلة',
          });
        }

      },

      isLiked: (itemId: number) => {
        const { likedItems } = get();
        return Array.isArray(likedItems) && likedItems.some((item) => item.id === itemId);
      },
    }),
    {
      name: 'wishlist-storage',
      partialize: (state) => ({
        likedItems: state.likedItems,
      }),
    }
  )
);
