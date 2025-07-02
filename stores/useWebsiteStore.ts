import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  WebsiteData,
} from "@/utils/webSettingsTypes";
import { getWebSettings } from "@/services/ApiHandler";

type WebsiteStore = {
  data: WebsiteData | null;
  loading: boolean;
  fetchSettings: () => Promise<void>;
};

export const useWebsiteStore = create<WebsiteStore>()(
  persist(
    (set) => ({
      data: null,
      loading: false,

      fetchSettings: async () => {
        try {
          set({ loading: true });

          const res = await getWebSettings() as { data: WebsiteData }; 
          set({ data: res.data, loading: false });
        } catch (err) {
          console.error("Error fetching website settings:", err);
          set({ loading: false });
        }
      },
    }),
    {
      name: "website-store", 
    }
  )
);
