import {create} from 'zustand';

interface AuthState {
  token: string | null;
  userData: { name: string; phone: string; email?: string; verified?: boolean;password:any } | null;
  setToken: (token: string) => void;
  setUserData: (data: AuthState['userData']) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userData: null,
  setToken: (token) => set({ token }),
  setUserData: (data) => set({ userData: data }),
  logout: () => set({ token: null, userData: null }),
}));
