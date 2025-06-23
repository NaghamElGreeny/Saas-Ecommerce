import { create } from 'zustand';

type Address = {
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
};

type AddressStore = {
  addresses: Address[];
  setAddresses: (data: Address[]) => void;
  selectedAddress: Address | null;
  setSelectedAddress: (address: Address | null) => void;
  clearAddresses: () => void;
};

export const useAddressStore = create<AddressStore>((set) => ({
  addresses: [],
  selectedAddress: null,

  setAddresses: (data) => set({ addresses: data }),
  setSelectedAddress: (address) => set({ selectedAddress: address }),
  clearAddresses: () => set({ addresses: [], selectedAddress: null }),
}));
