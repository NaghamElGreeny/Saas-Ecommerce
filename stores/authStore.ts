// import { create } from 'zustand';

// interface User {
//   phone: string;
//   name?: string;
//   [key: string]: unknown;
// }

// interface AuthState {
//   token: string | null;
//   userData: User | null;
//   setToken: (token: string) => void;
//   setUserData: (user: User) => void;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   token: null,
//   userData: null,
//   setToken: (token) => set({ token }),
//   setUserData: (user) => set({ userData: user }),
//   logout: () => set({ token: null, userData: null }),
// }));
import {create} from 'zustand';

interface AuthStore {
  token: string | null;
  userData: unknown | null;
  formData: {
    full_name?: string;
    email?: string;
    phone_code?: string;
    phone?: string;
    password?: string;
    password_confirmation?: string;
    device_type?: string;
  };
  setToken: (token: string) => void;
  setUserData: (data: unknown) => void;
  setFormData: (data: Partial<AuthStore['formData']>) => void; // هنعرفها هنا
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  userData: null,
  formData: {},
  setToken: (token) => set({ token }),
  setUserData: (userData) => set({ userData }),
  setFormData: (data) => set((state) => ({
    formData: {
      ...state.formData,
      ...data,
    },
  })),
}));

// {
//     "phone_code":"658",
//     "phone":"23457689874789589389",
//     "password":"123456",
//     "device_type":"web"
//     // "device_token":"345asdasd"
// }