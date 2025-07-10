import { create } from 'zustand';
import { Store } from '@/utils/types';
import { locationService } from '@/services/ClientApiHandler';

type StoreState = {
  stores: Store[];
  selectedStore: Store | null;
  setStores: (stores: Store[]) => void;
  setSelectedStore: (store: Store) => void;
};

export const useStore = create<StoreState>()(
    (set) => ({
      stores: [],
      selectedStore: null,

      setStores: (stores) => set({ stores }),
      setSelectedStore: (store) => set({ selectedStore: store }),
      
    }),

);

(async () => {
  try {
    const data = await locationService.getStores();
    useStore.getState().setStores(data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
})();