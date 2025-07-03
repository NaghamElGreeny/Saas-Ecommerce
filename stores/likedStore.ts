"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

import { favoriteService } from "@/services/ClientApiHandler";
import { Product } from "@/utils/menuTypes";

type LikedStore = {
  likedItems: Product[];
  loading: boolean;
  error: string | null;

  fetchLikedItems: () => Promise<void>;
  toggleLike: (product: Product) => Promise<void>;
  removeFromWishlist: (favouriteId: number) => Promise<void>;
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
          const res = await favoriteService.getFavourites();
          set({ likedItems: res.data, loading: false });
        } catch (error: unknown) {
          set({
            error:
              typeof error === "object" && error !== null && "message" in error
                ? (error as { message: string }).message
                : "فشل في تحميل المنتجات المفضلة",
            loading: false,
          });
          toast.error("فشل في تحميل المنتجات المفضلة");
        }
      },

      toggleLike: async (product: Product) => {
        const { likedItems } = get();
        const isAlreadyLiked = likedItems.some((p) => p.id === product.id);

        try {
          if (isAlreadyLiked) {
            const favouriteItem = likedItems.find((p) => p.id === product.id);
            const favourite_id =
              product.favourite_id || favouriteItem?.favourite_id;

            if (!favourite_id) {
              throw new Error("favourite_id غير موجود");
            }

            const res = await favoriteService.removeFromFavourites(favourite_id);
            set({
              likedItems: likedItems.filter((p) => p.id !== product.id),
            });

            toast.success(res?.message || "تم الحذف من المفضلة");
          } else {
            const res = await favoriteService.addToFavourites(product.id);

            const newFavourite = {
              ...product,
              favourite_id: res?.data?.id,
            };

            set({
              likedItems: [...likedItems, newFavourite],
            });

            toast.success(res?.message || "تمت الإضافة إلى المفضلة");
          }

          await get().fetchLikedItems();
        } catch (error: unknown) {
          const errMsg =
            typeof error === "object" && error !== null && "message" in error
              ? (error as { message: string }).message
              : "فشل في التعديل على المفضلة";
          set({ error: errMsg });
          toast.error(errMsg);
        }
      },

      removeFromWishlist: async (favouriteId: number) => {
        const { likedItems } = get();
        try {
          const res = await favoriteService.removeFromFavourites(favouriteId);
          set({
            likedItems: likedItems.filter(
              (item) => item.favourite_id !== favouriteId,
            ),
          });
          await get().fetchLikedItems();
          toast.success(res?.message || "تم الحذف من المفضلة");
        } catch (error: unknown) {
          const errMsg =
            typeof error === "object" && error !== null && "message" in error
              ? (error as { message: string }).message
              : "فشل في حذف المنتج من المفضلة";
          set({ error: errMsg });
          toast.error(errMsg);
        }
      },

      isLiked: (itemId: number) => {
        const { likedItems } = get();
        return (
          Array.isArray(likedItems) &&
          likedItems.some((item) => item.id === itemId)
        );
      },
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({
        likedItems: state.likedItems,
      }),
    },
  ),
);
