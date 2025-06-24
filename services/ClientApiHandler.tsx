/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axiosClient from "./axiosClient";
import {
  BrandCountry,
  Category,
  LoginPayload,
  LogoutPayload,
  RegisterPayload,
  ReservationPayload,
  ResetPasswordPayload,
  ReviewResponse,
  Store,
} from "../utils/types";
import { CartResponse } from "@/utils/cartTypes";
// import { useAuthStore } from "@/stores/authStore";
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
      store_id: payload.store_id,
    },
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
export const getCategorie = async (): Promise<Category[]> => {
  try {
    const res = await axiosClient.get<{ data: { content: any[] } }>(
      "/get-filter",
    );
    const raw = res.data?.data?.content;

    if (!Array.isArray(raw)) return [];

    return raw.map((item) => ({
      id: item.id,
      name: item.name,
      subCategories: item.subcategories?.map((sub: any) => ({
        id: sub.id,
        name: sub.name,
      })),
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};


export const AddToCart = async (payload: any) => {
  const res = await axiosClient.post("carts", payload);
  console.log(res.data)
  return res.data;
};
export const getProductReviews = async (productId: number): Promise<ReviewResponse> => {
  const res = await axiosClient.get<ReviewResponse>(`/products/${productId}/reviews`);
  return res.data;
};
// export const updateQuantity=
// const token = useAuthStore.getState().token;
export const getCart = async () => {

  const res = await axiosClient.get<CartResponse>('carts');
  // console.log(res);
  return res.data;
}
export const deleteItem = async (id: any) => {
  const res = await axiosClient.delete(`carts/delete-item/${id}`);
  console.log('delete',res)
}
export const ClearCart= async () => {
  const res = await axiosClient.delete(`carts/delete`);
  console.log('Clear Cart',res)
}
interface UpdateQuantityPayload {
  cart_product_id: number;
  quantity: number;
  _method: "put";
}

export const updateCount = async(payload: UpdateQuantityPayload) => {
  const res = await axiosClient.put("carts/update-count", payload);
  console.log(res.data)
  return res.data;
};
export const applyCoupon = async (code: string) => {
  const res = await axiosClient.post("/order_discounts", {
    code: code,
  });
  return res.data;
};
export const getAddress = async () => {
  const res = await axiosClient.get("/address");
  return res.data;
};
type AddressPayload = {
  // type: 'home' | 'work' | 'other';
  title: string;
  lat: number;
  lng: number;
  // lat: number | '31.05491';
  // lng: number | '31.0549151';
  desc: string;
  is_default?: boolean|false;
  building: string;
  floor: string;
  apartment: string;
};
export const addAddress = async (payload: AddressPayload) => {
  const res = await axiosClient.post("/address",payload);
  return res.data;
};
export const deleteAddress = async (id: any) => {
  const res = await axiosClient.delete(`address/${id}`);
  console.log('delete', res)

}

export const updateAddress = (id: number, data: any) => {
  return axiosClient.patch(`/address/${id}`, data);
};