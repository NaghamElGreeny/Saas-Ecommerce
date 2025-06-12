import axios from 'axios';
import cookies from 'js-cookie';
import { redirect } from 'next/navigation';
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // هنا ممكن تضيفي headers زي Authorization لو عندك cookies أو token من السيرفر
  withCredentials: true,
});


axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            const locale = cookies.get('NEXT_LOCALE');
            redirect(locale === 'ar' ? '/ar/auth/login' : '/auth/login');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
