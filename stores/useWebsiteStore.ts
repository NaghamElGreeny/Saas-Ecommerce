import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  WebsiteData,
} from "@/utils/webSettingsTypes";
import { getWebSettings } from "@/services/ClientApiHandler";
import { updateCSSVariables } from "@/lib/utils";

type StoreAddress = {
  lat: string;
  lng: string;
  location: string;
};

type PhoneNumber = {
  phone: string;
  phone_code: string;
  flag: string;
};

type ContactValue = 
  | StoreAddress
  | string
  | string[]
  | PhoneNumber[];

// type ContactItem = {
//   key: string;
//   value: ContactValue;
// };
type CustomizationValue = boolean | string;

// type CustomizationItem = {
//   key: string;
//   value: CustomizationValue;
// };

type WebsiteStore = {
  data: WebsiteData | null;
  loading: boolean;

  fetchSettings: () => Promise<void>;

  getColor: (key: string) => string | null;
  getSetting: (key: string) => string | null;
  getCustomization: (key: string) => CustomizationValue | null;
  getContact: (key: string) => ContactValue | null;
  getPaymentMethod: (key: string) => boolean | string | null;
};

export const useWebsiteStore = create<WebsiteStore>()(
  persist(
    (set, get) => ({
      data: null,
      loading: false,

      fetchSettings: async () => {
        try {
          set({ loading: true });

          const res = await getWebSettings() as { data: WebsiteData };
          set({ data: res.data, loading: false });
          updateCSSVariables(res.data.website_colors);
        } catch (err) {
          console.error("Error fetching website settings:", err);
          set({ loading: false });
        }
      },

      getColor: (key: string) => {
        const colors = get().data?.website_colors || [];
        return colors.find(c => c.key === key)?.value || null;
      },

      getSetting: (key: string) => {
        const settings = get().data?.website_setting || [];
        return settings.find(s => s.key === key)?.value || null;
      },

      getCustomization: (key: string) => {
        const custom = get().data?.website_customization || [];
        return custom.find(c => c.key === key)?.value || null;
      },

      getContact: (key: string) => {
        const contact = get().data?.contact_us || [];
        return contact.find(c => c.key === key)?.value || null;
      },

      getPaymentMethod: (key: string) => {
        const payments = get().data?.payment_methods || [];
        return payments.find(p => p.key === key)?.value || false;
      },

    }),
    {
      name: "website-store",
    }
  )
);
