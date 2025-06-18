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
    device_type?: "web" | "ios" | "android";
  };
  setToken: (token: string) => void;
  setUserData: (data: unknown) => void;
  setFormData: (data: Partial<AuthStore['formData']>) => void; 
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
interface LoggedStore {
  logged: boolean;
  setLogged: (logged: boolean) => void;
}
export const useLoggedStore = create<LoggedStore>((set) => ({
  logged: false,
  setLogged: (logged: boolean) => set({ logged }),
}));

