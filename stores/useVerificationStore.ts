// stores/useVerificationStore.ts
import {create }from 'zustand';

interface VerificationState {
  verificationType: 'register' | 'forgot_password' | null;
  phone: string;
  setVerificationType: (type: 'register' | 'forgot_password') => void;
  setPhone: (phone: string) => void;
}

export const useVerificationStore = create<VerificationState>((set) => ({
  verificationType: null,
  phone: '',
  setVerificationType: (type) => set({ verificationType: type }),
  setPhone: (phone) => set({ phone }),
}));
