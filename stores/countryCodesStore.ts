import { locationService } from "@/services/ClientApiHandler";
import {create} from "zustand";

export interface BrandCountry {
  id: number;
  phone_code: string;
  min_digits?: number;
  phone_limit?: number;

}

interface CountryCodeState {
  countryCodes: BrandCountry[];
  loading: boolean;
  error: string | null;
  fetchCountryCodes: () => Promise<void>;
}

export const useCountryCodesStore = create<CountryCodeState>((set) => ({
  countryCodes: [],
  loading: false,
  error: null,

  fetchCountryCodes: async () => {
    set({ loading: true, error: null });
    try {
      const response = await locationService.getCountryCodes(); 
      // if (!response.ok) throw new Error("Failed to fetch country codes");
      const data: BrandCountry[] = response;
      set({ countryCodes: data, loading: false });
    } catch (error: unknown) {
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      set({ error: errorMessage, loading: false });
    }
  },
}));
