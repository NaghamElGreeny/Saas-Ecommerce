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
import { create } from 'zustand';

type User = {
  name?: string;
  phone: string;
};

type AuthStore = {
  token: string | null;
  user: User | null;
  setToken: (token: string) => void;
  setUserData: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  user: null,
  setToken: (token) => set({ token }),
  setUserData: (user) => set({ user }),
  logout: () => set({ token: null, user: null }),
}));


// {
//     "phone_code":"658",
//     "phone":"23457689874789589389",
//     "password":"123456",
//     "device_type":"web"
//     // "device_token":"345asdasd"
// }