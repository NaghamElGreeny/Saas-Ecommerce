/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axiosClient from "./axiosClient";
import {
  BrandCountry,
  Category,
  ChangePasswordPayload,
  LoginPayload,
  LogoutPayload,
  OrderData,
  RegisterPayload,
  ReservationPayload,
  ResetPasswordPayload,
  ReviewResponse,
  Store,
  UserData,
} from "../utils/types";
import { CartResponse } from "@/utils/cartTypes";

// Auth Services
export const authService = {
  register: async (payload: RegisterPayload) => {
    const res = await axiosClient.post("/auth/register", payload);
    return res.data;
  },
  
  login: async (payload: LoginPayload) => {
    const res = await axiosClient.post("/auth/login", payload);
    return res.data;
  },
  
  logout: async (payload: LogoutPayload) => {
    const res = await axiosClient.post("/auth/logout", payload);
    return res.data;
  },
  
resetPassword: async (payload: ResetPasswordPayload) => {
  const res = await axiosClient.post<{ data: UserData }>("auth/reset_password", payload);
  return res.data; 
},
changePassword: async (payload: ChangePasswordPayload) => {
  const res = await axiosClient.post<{ data: UserData }>("auth/reset_password", payload);
  return res.data; 
},
  
  verifyCode: async ({
    phone_code,
    phone,
    verification_code,
    verificationType,
    // reset_code,
  }: {
    phone_code?: string;
    phone?: string;
    verification_code: string;
      verificationType: "register" | "forgot_password" | null;
    // reset_code:
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
        ? { verification_code }
        : { reset_code: verification_code }),
    };

    try {
      const res = await axiosClient.post(url, dataToSend);
      return res.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Verification failed");
    }
  },
};

// Store & Location Services
export const locationService = {
  getCountryCodes: async (): Promise<BrandCountry[]> => {
    const res = await axiosClient.get<{
      status: boolean;
      message: string;
      data: BrandCountry[];
    }>("/brand_country");
    return res.data.data;
  },
  
  getStores: async (): Promise<Store[]> => {
    const res = await axiosClient.get<{ 
      status: boolean;
      message: string;
      data: Store[];
    }>("/stores");
    return res.data.data;
  },
  
  makeReservation: async (payload: ReservationPayload) => {
    const res = await axiosClient.post("/reservations", payload, {
      params: { store_id: payload.store_id },
    });
    return res.data;
  },
  

};

// Product Services
export const productService = {
  getCategories: async (): Promise<Category[]> => {
    try {
      const res = await axiosClient.get<{ data: { content: any[] } }>("/get-filter");
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
  },
  
  getProductReviews: async (productId: number): Promise<ReviewResponse> => {
    const res = await axiosClient.get<ReviewResponse>(`/products/${productId}/reviews`);
    return res.data;
  },
};

// Cart Services
export const cartService = {
  addToCart: async (payload: any) => {
    const res = await axiosClient.post("carts", payload);
    return res.data;
  },
  
  getCart: async (params?: Record<string, string>) => {
    const res = await axiosClient.get<CartResponse>("carts", { params });
    return res.data;
  },
  
  deleteItem: async (id: number) => {
    const res = await axiosClient.delete(`carts/delete-item/${id}`);
    return res.data;
  },
  
  clearCart: async () => {
    const res = await axiosClient.delete(`carts/delete`);
    return res.data;
  },
  
  updateCount: async (payload: any) => {
    const res = await axiosClient.put("carts/update-count", payload);
    return res.data;
  },
  
  applyCoupon: async (code: string) => {
    const res = await axiosClient.post("/order_discounts", { code });
    return res.data;
  },
};

// Order Services
export const orderService = {
  confirmOrder: async (payload: any): Promise<any> => {
    const res = await axiosClient.post(`/orders`, payload);
    return res.data;
  },
  
  getOrder: async (slug: number) => {
    try {
      const res = await axiosClient.get<{ data: OrderData }>(`/orders/${slug}`);
      // const res = await axiosClient.get<{ data: OrderData }>(`/orders/${slug}`);
      console.log("🚀 ~ data:", res.data)
      return res.data.data;
    } catch (error) {
      console.error("Fetch error at: Order", error);
      throw error;
    }
  },
  getReservation: async (slug: number) => {
    try {
      const res = await axiosClient.get<{ data: any }>(`/reservations/${slug}`);
      return res.data.data;
    } catch (error) {
      console.error("Fetch error at: Reservation", error);
      throw error;
    }
  },
  getCancelReasons: async () => {
    try {
      const res = await axiosClient.get<{ data: any }>(`/cancel_reasons`);
      return res.data;
    } catch (error) {
      console.error("Fetch error at: Order", error);
      throw error;
    }
  }, 
  cancelOrder: async (slug: number,payload) => {
    try {
      const res = await axiosClient.post<{ data: OrderData }>(`/orders/${slug}/cancel`,payload);
      return res.data;
    } catch (error) {
      console.error("Fetch error at: Order", error);
      throw error;
    }
  },
  cancelReservation: async (slug: number,payload) => {
    try {
      const res = await axiosClient.post<{ data: OrderData }>(`/reservations/${slug}/cancel`,payload);
      return res.data;
    } catch (error) {
      console.error("Fetch error at: Order", error);
      throw error;
    }
  },
  
  reOrder: async (id: number): Promise<any> => {
    const res = await axiosClient.post(`orders/${id}/re_order`);
    return res.data;
  },
  
  getOrdersByStatus: async (params: any) => {
    try {
      const response = await axiosClient.get(`orders-and-reservations`, { params });
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Failed to fetch orders");
    }
  },
};

// Address Services
export const addressService = {
  getAddresses: async () => {
    const res = await axiosClient.get("/address");
    return res.data;
  },
  
  addAddress: async (payload: any) => {
    const res = await axiosClient.post("/address", payload);
    return res.data;
  },
  
  deleteAddress: async (id: any) => {
    const res = await axiosClient.delete(`address/${id}`);
    return res.data;
  },
  
  updateAddress: async (id: number, data: any) => {
    return axiosClient.patch(`/address/${id}`, data);
  },
};

// User Services
export const userService = {
  getUser: async () => {
    const res = await axiosClient.get("/profile");
    return res.data;
  },
  
  changePassword: async (payload: any) => {
    const res = await axiosClient.post("/profile/change_password", payload);
    return res.data;
  },
  
  sendVerificationCode: async (payload: any) => {
    const res = await axiosClient.post("/profile/send_verification_code", payload);
    return res.data;
  },
  
  updatePhone: async (payload: any) => {
    const res = await axiosClient.post("/profile/update_phone", payload);
    return res.data;
  },
  
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("attachment_type", "image");
    formData.append("model", "users");

    const response = await axiosClient.post("/store_attachment", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },
  
updateUserInfo: async (data: { full_name: string; email: string; avatar?: string }) => {
  try {
    const response = await axiosClient.patch<{ data: UserData }>("/profile", data);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to update user info");
  }
},

};

// Favorites Services
export const favoriteService = {
  getFavourites: async (): Promise<any> => {
    const res = await axiosClient.get(`/favourite`);
    return res.data;
  },
  
  addToFavourites: async (product_id: number): Promise<any> => {
    const res = await axiosClient.post(`/favourite`, { product_id });
    return res.data;
  },
  
  removeFromFavourites: async (favourite_id: number): Promise<any> => {
    const res = await axiosClient.delete(`/favourite/${favourite_id}`);
    return res.data;
  },
};

// Notification Services
export const notificationService = {
  getNotifications: async (): Promise<any> => {
    const res = await axiosClient.get(`/notifications`);
    return res.data;
  },
  
  deleteNotification: async (id: string) => {
    const res = await axiosClient.delete(`/notifications/${id}`);
    return res.data;
  },
  
  changeNotification: async () => {
    try {
      const response = await axiosClient.post("/setting/change_notification_status");
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Failed to change notification");
    }
  },
};

// Loyalty & Wallet Services
export const loyaltyService = {
  getLoyality: async () => {
    try {
      const response = await axiosClient.get("/loyal_card");
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Failed to get loyality");
    }
  },
  
  getWallet: async () => {
    try {
      const response = await axiosClient.get("/wallet");
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.message || "Failed to get wallet");
    }
  },
};

// CMS Services
export const cmsService = {
  getAllPages: async () => {
    try {
      const res = await axiosClient.get("/cms-pages");
      return res.data;
    } catch (error) {
      console.error("Fetch error at: cms-pages", error);
      throw error;
    }
  },
};
//settings 
export const getWebSettings = async () => {
  const res = await axiosClient.get("/web_settings");
  return res.data;
};
//settings 
export const contactUs = async (payload) => {
  const res = await axiosClient.post("/contact_us",payload);
  return res.data;
};