// lib/axios.ts
'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
     headers: {
    'Content-Type': 'application/json',
  }
});
console.log('axiosInstance',process.env.NEXT_PUBLIC_BASE_URL);

axiosInstance.interceptors.request.use(
    (config) => {



        const locale = Cookies.get('NEXT_LOCALE') || 'en';

        if (!config.headers) {
            config.headers = {};
        }
        config.headers['Accept-Language'] = locale;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            const router = useRouter()

            const locale = Cookies.get('NEXT_LOCALE');
            router.push(locale === 'ar' ? '/ar/auth/login' : '/auth/login');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
