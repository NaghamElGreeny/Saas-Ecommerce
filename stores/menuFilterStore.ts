import { create } from 'zustand';

interface FilterState {
  mainCategory: string;
  subCategory: string;
  search: string;
  setMainCategory: (category: string) => void;
  setSubCategory: (sub: string) => void;
  setSearch: (term: string) => void;
  reset: () => void;
}

export const useMenuFilterStore = create<FilterState>((set) => ({
  mainCategory: '',
  subCategory: '',
  search: '',
  setMainCategory: (category) => set({ mainCategory: category }),
  setSubCategory: (sub) => set({ subCategory: sub }),
  setSearch: (term) => set({ search: term }),
  reset: () => set({ mainCategory: '', subCategory: '', search: '' })
}));
