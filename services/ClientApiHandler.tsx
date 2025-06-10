"use client";
import axiosClient from "./axiosClient";

export interface LoginPayload {
  phone_code: string;
  phone: string;
  password: string;
  device_type: "web" | "ios" | "android";
  device_token?: string;
}
export interface LogoutPayload {
  device_type: "web" | "ios" | "android";
  device_token?: string;
}

export interface RegisterPayload {
  phone_code: string;
  phone: string;
  password: string;
  full_name: string;
  password_confirmation: string;
  email: string;
  device_type: "web" | "ios" | "android";
  device_token?: string;
}
export interface BrandCountry {
  id: number;
  name: string;
  phone_code: string;
  phone_limit: number;
  flag: string;
}
export interface Store {
  id: number;
  image: string;
  name: string;
  phone: string;
  phone_code: string;
  lat: number;
  lng: number;
  location_description: string;
}


export interface ResetPasswordPayload {
  phone: string;
  phone_code: string;
  reset_code: string;
  password: string;
  password_confirmation: string;
  device_type?: "web" | "ios" | "android";
}
export interface ReservationPayload {
  name: string;
  phone: string;
  phone_code: string;
  store_id: number;
  date: string;
  from_time: string;
  to_time: string;
  guests_number: number;
}
export const register = async (payload: RegisterPayload) => {
  const res = await axiosClient.post("/auth/register", payload);
  return res.data;
};
export const login = async (payload: LoginPayload) => {
  const res = await axiosClient.post("/auth/login", payload);
  return res.data;
};
export const logout = async (payload: LogoutPayload) => {
  const res = await axiosClient.post("/auth/logout", payload);
  return res.data;
};

export const makeReservation = async (payload: ReservationPayload) => {
  const res = await axiosClient.post("/reservations", payload, {
    params: {
      store_id: payload.store_id
    }
  });
  return res.data;
};
export const getCountryCodes = async (): Promise<BrandCountry[]> => {
  const res = await axiosClient.get<{
    status: boolean;
    message: string;
    data: BrandCountry[];
  }>("/brand_country");
  return res.data.data;
};
export const getStores = async (): Promise<Store[]> => {
  const res = await axiosClient.get<{
    status: boolean;
    message: string;
    data: Store[];
  }>("/stores");
  return res.data.data;
};


export const ResetPassword = async (payload: ResetPasswordPayload) => {
  const res = await axiosClient.post("auth/reset_password", payload);
  return res.data;
};

export const verifyCode = async ({
  phone_code,
  phone,
  verification_code,
  verificationType,
  // device_type = 'web',
}: {
  phone_code?: string;
  phone?: string;
  verification_code: string;
  reset_code?: string;
  verificationType: "register" | "forgot_password" | null;
}) => {
  let url = "";
  if (verificationType === "register") {
    url = "/auth/verify_phone";
  } else if (verificationType === "forgot_password") {
    url = "/auth/verify_forgot_password_code";
  }

  const dataToSend = {
    phone_code,
    phone,
    ...(verificationType === "register"
      ? { verification_code: verification_code }
      : { reset_code: verification_code }),
  };

  try {
    const res = await axiosClient.post(url, dataToSend);
    console.log("Verification response:", res.data);
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Verification failed");
  }
};
