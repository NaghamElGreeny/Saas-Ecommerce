// useVerificationStore.ts
import { create } from 'zustand';

type VerificationState = {
  phone: string;
  phoneCode: string; // ← أضفنا ده
  verificationType: 'register' | 'forgot_password' | null;
  setVerificationData: (data: { phone: string; phoneCode: string; verificationType: 'register' | 'forgot_password' }) => void;
};

export const useVerificationStore = create<VerificationState>((set) => ({
  phone: '',
  phoneCode: '',
  verificationType: null,
  setVerificationData: ({ phone, phoneCode, verificationType }) =>
    set({ phone, phoneCode, verificationType }),
}));
