/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "./instance";
import AppError from "../utils/appError";
import { ApiCategories, CmsPage, OrderData } from "../utils/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchData = async (endpoint: string, errorMsg: string, config = {}) => {
  try {
    const { data } = await axiosInstance.get<{ data: any }>(endpoint, config);
    return data?.data ?? [];
  } catch (error) {
    console.error("Fetch error at:", endpoint, error);
    throw new AppError(error instanceof Error ? error.message : errorMsg, 500);
  }
};

// export const getMenu = () => fetchData("/product", "Failed to fetch Products");
// export const getHome = () => fetchData("/home", "Failed to fetch Products");

export const getHome = async () => {
  try {
    const res = await axiosInstance.get<{ data: any }>("/home");
    // console.log(" home data fetched", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error("Fetch error at: cms-pages", error);
    throw error;
  }
};
export const getPagesBySlug = async (slug: string): Promise<CmsPage> => {
  try {
    const res = await axiosInstance.get<{ data: CmsPage }>(
      `/cms-pages/${slug}`,
    );
    return res.data.data;
  } catch (error) {
    console.error("Fetch error at: cms-pages", error);
    throw error;
  }
};
export const getAllPages = async () => {
  try {
    const res = await axiosInstance.get("/cms-pages");
    return res.data;
    console.log("CMS pages fetched successfully", res.data);
  } catch (error) {
    console.error("Fetch error at: cms-pages", error);
    throw error;
  }
};
export const getMenuItem = async (slug: string) => {
  try {
    const res = await axiosInstance.get<{ data: any }>(
      `/product/${encodeURIComponent(slug)}`,
    );
    // console.log("Fetching from:", res.data);
    return res.data.data;
  } catch (error) {
    console.error("Fetch error at: product", error);
    throw error;
  }
};
// export const getOrder = async (slug: number) => {
//   try {
//     const res = await axiosInstance.get<{ data: any }>(
//       `/orders/${slug}`,
//     );
//     console.log("Order responce:", res.data);
//     return res.data.data;
//   } catch (error) {
//     console.error("Fetch error at: Order", error);
//     throw error;
//   }
// };
// export const getOrder = async (slug: number) => {
//   try {
//     const res = await axiosInstance.get<{ data: any }>(`/orders/${slug}`);
//     console.log("✅ Order response:", res.data);
//     return res.data.data; 
//   } catch (error) {
//     console.error("❌ Fetch error at: Order", error);
//     throw error;
//   }
// };
export const getMenu = async () => {
  try {
    const res = await axiosInstance.get(`/product`);
    return res.data;
  } catch (error) {
    console.error("Fetch error at: productsss", error);
    throw error;
  }
};
export const getCategories = async () => {
  try {
    const res = await axiosInstance.get<{ data: ApiCategories }>(`categories`);
    return res.data;
  } catch (error) {
    console.error("Fetch error at: productsss", error);
    throw error;
  }
};
// export const AddToCart = async (payload: any) => {
//   const res = await axiosInstance.post("carts", payload);
//   console.log(res.data)
//   return res.data;
// };