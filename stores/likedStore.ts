import {create} from 'zustand';

type LikedStore = {
  likedItems: number[];
  toggleLike: (itemId: number) => void;
  isLiked: (itemId: number) => boolean;
};

export const useLikedStore = create<LikedStore>((set, get) => ({
  likedItems: [],
  toggleLike: (itemId) => {
    const likedItems = get().likedItems;
    if (likedItems.includes(itemId)) {
      set({ likedItems: likedItems.filter(id => id !== itemId) });
    } else {
      set({ likedItems: [...likedItems, itemId] });
    }
  },
  isLiked: (itemId) => get().likedItems.includes(itemId),
}));
