/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axiosClient from "./axiosClient";
import {
  BrandCountry,
  Category,
  LoginPayload,
  LogoutPayload,
  OrderData,
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
export const getCart = async ({params}:{params?:Record<string,string>}) => {

  const res = await axiosClient.get<CartResponse>('carts',{ params });
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ConfirmOrderPayload {
  order_type: 'delivery' | 'take_away';
  has_loyal: boolean;
  has_wallet: boolean;
  is_schedule: boolean;
  order_date?: string;
  order_time?: string;
  pay_type:[{[key: string]:number}]
  // [key: string]: any;
}

export const confirmOrder = async (payload: any): Promise<any> => {
  const res=await axiosClient.post(`/orders`, payload);
  return res.data
};

export const getFavourites = async (): Promise<any> => {
  const res = await axiosClient.get(`/favourite`);
  // console.log('/favourite res', res.data);
  return res.data;
};

export const addToFavourites =async (product_id: number): Promise<any> => {
  const res =await axiosClient.post(`/favourite`, {
    product_id: product_id,
  });
  return res.data
};
export const removeFromFavourites = async (favourite_id: number): Promise<any> => {
  const res = await axiosClient.delete(`/favourite/${favourite_id}`);
  return res.data;
};

export const getNotifications = async (): Promise<any> => {
  const res = await axiosClient.get(`/notifications`);
  return res.data;
};
export const deleteNotification = async (id: string) => {
  const res = await axiosClient.delete(`/notifications/${id}`);
  return res.data;
};

export const getOrder = async (slug: number) => {
  try {
    const res = await axiosClient.get<{ data: OrderData }>(`/orders/${slug}`);
    console.log("✅ Order response:", res.data.data);
    return res.data.data; 
  } catch (error) {
    console.error("❌ Fetch error at: Order", error);
    throw error;
  }
};

export const reOrder =async (id: number): Promise<any> => {
  const res =await axiosClient.post(`orders/${id}/re_order`);
  return res.data
};

export const getUser = async () => {
  const res = await axiosClient.get("/profile");
  return res.data;
};
export const changePassword = async (payload: any) => {
  const res = await axiosClient.post("/profile/change_password", payload);
  return res.data;
};
export const sendVerificationCode = async (payload: any) => {
  const res = await axiosClient.post("/profile/send_verification_code", payload);
  return res.data;
};
export const updatePhone = async (payload: any) => {
  const res = await axiosClient.post('/profile/update_phone'
, payload);
  return res.data;
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("attachment_type", "image");
  formData.append("model", "users");

  const response = await axiosClient.post("/store_attachment", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
export const updateUserInfo = async (data: { name: string; email: string }) => {
  try {
    const response = await axiosClient.patch("/profile", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to update user info");
  }
};
export const changeNotification = async () => {
  try {
    const response = await axiosClient.post("/setting/change_notification_status");
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to change notification");
  }
};
export const getLoyality = async () => {
  try {
    const response = await axiosClient.get("/loyal_card");
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to get loyality");
  }
};
export const getWallet = async () => {
  try {
    const response = await axiosClient.get("/wallet");
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to get loyality");
  }
};

export const getOrdersByStatus=async (params) => {
  try {
    const response = await axiosClient.get(`orders-and-reservations`,{params});
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch orders");
  }
}
export const getReservation= async (slug: number) => {
  try {
    const res = await axiosClient.get<{ data: any }>(`/reservations/${slug}`);
    console.log("✅ Reservation response:", res.data.data);
    return res.data.data; 
  } catch (error) {
    console.error("❌ Fetch error at: Order", error);
    throw error;
  }
};