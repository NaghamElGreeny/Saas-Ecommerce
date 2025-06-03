// useVerificationStore.ts
import { create } from 'zustand';

type VerificationState = {
  phone?: string;
  phoneCode?: string; 
  verification_code?: string;
  verificationType: 'register' | 'forgot_password';
  setVerificationData: (data: { phone?: string; phoneCode?: string; verificationType: 'register' | 'forgot_password'; verification_code?:string }) => void;
};

export const useVerificationStore = create<VerificationState>((set) => ({
  phone: '',
  phoneCode: '',
  verificationType: 'forgot_password',
  verification_code: '',
  setVerificationData: ({ phone, phoneCode, verificationType,verification_code }) =>
    set({ phone, phoneCode, verificationType ,verification_code}),
}));
