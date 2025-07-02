import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Store } from '@/utils/types';
import { getStores } from '@/services/ClientApiHandler';

type StoreState = {
  stores: Store[];
  selectedStore: Store | null;
  setStores: (stores: Store[]) => void;
  setSelectedStore: (store: Store) => void;
  fetchStores: () => Promise<Store[]>;
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      stores: [],
      selectedStore: null,

      setStores: (stores) => set({ stores }),
      setSelectedStore: (store) => set({ selectedStore: store }),

      fetchStores: async () => {
        try {
          const data = await getStores();
          set({ stores: data });
          return data;
        } catch (error) {
          console.error('Failed to fetch stores', error);
          return [];
        }
      },
    }),
    {
      name: 'store-storage',
    }
  )
);
