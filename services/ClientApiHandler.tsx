'use client';
import axiosClient from './axiosClient';

interface LoginPayload {
  phone_code: string;
  phone: string;
  password: string;
  device_type: 'web' | 'ios' | 'android';
  device_token?: string;
}

interface RegisterPayload {
  phone_code: string;
  phone: string;
  password: string;
  full_name: string;
  device_type: 'web' | 'ios' | 'android';
  device_token?: string;
}
 export interface BrandCountry {
   
            id: number;
            name: string,
            phone_code:string,
            phone_limit: number,
            flag: string;
        }
 
export const login = async (payload: LoginPayload) => {
  const res = await axiosClient.post('/auth/login', payload);
  return res.data;
};

export const register = async (payload: RegisterPayload) => {
  const res = await axiosClient.post('/auth/register', payload);
  return res.data;
};

// export const getCountryCodes = async (): Promise<BrandCountry[]> => {
//   const res = await axiosClient.get('/brand_country');
//   return (res.data as { data: BrandCountry[] }).data;
// };
export const getCountryCodes = async (): Promise<BrandCountry[]> => {
  const res = await axiosClient.get<{ status: boolean; message: string; data: BrandCountry[] }>('/brand_country');
  return res.data.data;
};


//هستخدمه وانا رايحه ال verify page 
  // let url;

  // if (dataToVerify.value.type == "register") {
  //   url = "auth/verify_phone";
  // } else {
  //   url = "auth/verify_forgot_password_code";
  // }
