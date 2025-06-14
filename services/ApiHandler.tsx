/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "./instance";
import AppError from "../utils/appError";
import { CmsPage } from "./types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchData = async (endpoint: string, errorMsg: string, config = {}) => {
  try {
    const { data } = await axiosInstance.get<{ data: any }>(endpoint, config);
    return data?.data ?? [];
  } catch (error) {
    console.error("Fetch error at:", endpoint, error);
    throw new AppError(
      error instanceof Error ? error.message : errorMsg,
      500
    );
  }
};


// export const getMenu = () => fetchData("/product", "Failed to fetch Products");
// export const getHome = () => fetchData("/home", "Failed to fetch Products");

export const getHome = async () => {
  try {
    const res = await axiosInstance.get<{ data: any }>('/home');
    console.log(" home data fetched", res.data.data);
    return res.data.data;
  } catch (error) {
    console.error("Fetch error at: cms-pages", error);
    throw error;
  }
};
export const getPagesBySlug = async (slug: string): Promise<CmsPage> => {
  try {
    const res = await axiosInstance.get<{ data: CmsPage }>(`/cms-pages/${slug}`);
    return res.data.data;
  } catch (error) {
    console.error("Fetch error at: cms-pages", error);
    throw error;
  }
};
export const getAllPages = async () => {
  try {
    const res = await axiosInstance.get('/cms-pages'); 
    return res.data;
    console.log("CMS pages fetched successfully", res.data);  
  } catch (error) {
    console.error("Fetch error at: cms-pages", error);
    throw error;
  }
};
export const getMenuItem = async (slug: string) => {
  try {
    // const res = await axiosInstance.get(`/product/${encodeURIComponent(slug)}`);
    // const res = await axiosInstance.get<{ data: any }>(`/en/product/${encodeURIComponent(slug)}`);
    const res = await axiosInstance.get<{ data: any }>(`/product/${encodeURIComponent(slug)}`);
    // console.log("Fetching from:", res.data);
    return res.data.data;
  } catch (error) {
    console.error("Fetch error at: product", error);
    throw error;
  }
};

export const getMenu = async () => {
  try {
    const res = await axiosInstance.get(`product/شيش-كباب`); 
    return res.data; 
  } catch (error) {
    console.error("Fetch error at: productsss", error);
    throw error;
  }
};
// export const getHomeData = () => fetchData("/home", "Failed to fetch home");
// export const getSocial = () => fetchData("/social", "Failed to fetch social");
// export const getFaq = () => fetchData("/faq", "Failed to fetch FAQ");
// export const getSettingsData = () => fetchData("/settings", "Failed to fetch settings");
// export const getWhyUsData = () => fetchData("/why-us", "Failed to fetch Why Us");
// export const getMainPage = () => fetchData("/main-page", "Failed to fetch Why Us");
// export const getServices = () => fetchData("/our-services", "Failed to fetch Why Us");
// export const getSections = () => fetchData("/main_bannerd", "Failed to fetch Why Us");

// export const getSections = () => fetchData("", "Failed to fetch main page", {
//   params: { banner_type: "main_bannerd" },
// });

