
import { addressService } from '@/services/ClientApiHandler';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Address = {
  id: number;
  type: string | null;
  title: string;
  lat: string;
  lng: string;
  desc: string;
  is_default: boolean;
  building: string;
  floor: string;
  apartment: string;
  created_at: string;
[key: string]: unknown;
};

type AddressStore = {
  addresses: Address[];
  selectedAddress: Address | null;
  setAddresses: (data: Address[]) => void;
  setSelectedAddress: (address: Address | null) => void;
  clearAddresses: () => void;
  fetchAddresses: () => Promise<void>;
  updateAddressItem: (updated: Address) => void;
  deleteAddressItem: (id: number) => Promise<void>;
};

export const useAddressStore = create<AddressStore>()(
  persist(
    (set, get) => ({
      addresses: [],
      selectedAddress: null,

      setAddresses: (data) => set({ addresses: data }),
      setSelectedAddress: (address) => set({ selectedAddress: address }),
      clearAddresses: () => set({ addresses: [], selectedAddress: null }),

      fetchAddresses: async () => {
        try {
          const res = await addressService.getAddresses();
          set({ addresses: (res as { data: Address[] }).data });
        } catch (error) {
          console.error('Fetch error:', error);
        }
      },

      updateAddressItem: (updated) => {
        const current = get().addresses;
        const updatedList = current.map((addr) =>
          addr.id === updated.id ? updated : addr
        );
        set({ addresses: updatedList });
      },

      deleteAddressItem: async (id) => {
        try {
          await addressService.deleteAddress(id);
          const current = get().addresses;
          const filtered = current.filter((addr) => addr.id !== id);
          set({ addresses: filtered });
        } catch (err) {
          console.error("Delete failed:", err);
        }
      },
    }),
    {
      name: 'address-storage',
    }
  )
);
