import { userService } from '@/services/ClientApiHandler';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Country {
  id: number;
  name: string;
  phone_code: string;
  phone_limit: number;
  flag: string;
}

export interface Address {
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
}

export interface UserData {
  id: number;
  full_name: string;
  email: string;
  phone_code: string;
  phone: string;
  avatar: string;
  is_active: boolean;
  notifiable: boolean;
  country: Country;
  points: number;
  wallet: number;
  default_address: Address;
  tenant: string;
}


interface AuthStore {
  token: string | null;
  userData: UserData | null;
  formData: {
    full_name?: string;
    email?: string;
    phone_code?: string;
    phone?: string;
    password?: string;
    password_confirmation?: string;
    notifiable?: boolean;
    device_type?: "web" | "ios" | "android";
  };
  setToken: (token: string) => void;
  setUserData: (data: UserData) => void;
  setFormData: (data: Partial<AuthStore['formData']>) => void;
  fetchUserData: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      userData: null,
      formData: {},
      setToken: (token) => set({ token }),
      setUserData: (userData) => set({ userData }),
      setFormData: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            ...data,
          },
        })),
      fetchUserData: async () => {
        const { token } = get();
        if (!token) return;

        try {
          const response = await userService.getUser() as { data: UserData };
          set({ userData: response.data });
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )

);

