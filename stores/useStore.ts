import { create } from 'zustand';
import { Store } from '@/utils/types';

type StoreState = {
  stores: Store[];
  selectedStore: Store | null;
  setStores: (stores: Store[]) => void;
  setSelectedStore: (store: Store) => void;
};

export const useStore = create<StoreState>((set) => ({
  stores: [],
  selectedStore: null,
  setStores: (stores) => set({ stores }),
  setSelectedStore: (store) => set({ selectedStore: store }),
}));
