import axios, {
  AxiosRequestConfig,
  AxiosResponseConfig,
  AxiosError,
} from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    os: "web",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const cookieStore = await cookies();
  const storeId = cookieStore.get("store_id")?.value;
    const locale = cookieStore.get("NEXT_LOCALE")?.value;

  if (storeId) {
    config.params = {
      ...config.params,
      store_id: storeId,
    };
  }
    if (locale) {
    config.headers = {
      ...config.headers,
      "Accept-Language": locale,
    };
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (response: AxiosResponseConfig) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      const cookieStore = await cookies();
      
      const locale = cookieStore.get("NEXT_LOCALE").value;
      redirect(locale === "ar" ? "/ar/auth/login" : "/auth/login");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
