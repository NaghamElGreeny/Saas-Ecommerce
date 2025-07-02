import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StaticPage } from "@/utils/types";
import { getAllPages } from "@/services/ClientApiHandler";

type PagesStore = {
  pages: StaticPage[];
  loading: boolean;
  fetchPages: () => Promise<void>;
};

export const usePagesStore = create<PagesStore>()(
  persist(
    (set) => ({
      pages: [],
      loading: false,

      fetchPages: async () => {
        try {
          set({ loading: true });

          const res = await getAllPages();

          // Assuming getAllPages returns { data: StaticPage[] }
          if ((res as { data?: StaticPage[] })?.data) {
            set({ pages: (res as { data: StaticPage[] }).data, loading: false });
          } else {
            set({ loading: false });
          }
        } catch (err) {
          console.error("Error fetching pages:", err);
          set({ loading: false });
        }
      },
    }),
    {
      name: "pages-store",
    }
  )
);
