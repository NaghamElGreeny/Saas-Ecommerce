"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    os: "web",
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    const locale = Cookies.get("NEXT_LOCALE") || "en";
    const token = Cookies.get("token");
        const store_id = Cookies.get("store_id");
        const guest_token = Cookies.get("guest_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    else {
        config.params = {
            ...config.params,
            guest_token: guest_token
        }
        }
    if (!config.headers) {
      config.headers = {};
    }
        if (store_id) {
              config.params = {
      ...config.params,
      store_id: store_id,
    };
        }
    config.headers["Accept-Language"] = locale;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const router = useRouter();

      const locale = Cookies.get("NEXT_LOCALE");
      router.push(locale === "ar" ? "/ar/auth/login" : "/auth/login");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;



// "use client";

// import axios from "axios";
// import Cookies from "js-cookie";
// // import toast from "react-hot-toast";

// const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//     os: "web",
//   },
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Ensure headers exist
//     config.headers = config.headers || {};

//     // Language
//     const locale = Cookies.get("NEXT_LOCALE") || "en";
//     config.headers["Accept-Language"] = locale;

//     // Auth
//     const token = Cookies.get("token");
//     const guest_token = Cookies.get("guest_token");
//     const store_id = Cookies.get("store_id");

//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     } else if (guest_token) {
//       config.params = {
//         ...config.params,
//         guest_token,
//       };
//     }

//     if (store_id) {
//       config.params = {
//         ...config.params,
//         store_id,
//       };
//     }

//     // Read lat/lng from cookies
//     const lat = Cookies.get("lat");
//     const lng = Cookies.get("lng");

//     if (lat && lng) {
//       config.params = {
//         ...config.params,
//         lat,
//         lng,
//       };
//     } else {
//       console.warn("Location not found in cookies");
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Handle 401 errors
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       const locale = Cookies.get("NEXT_LOCALE") || "en";
//       window.location.href = locale === "ar" ? "/ar/auth/login" : "/auth/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
