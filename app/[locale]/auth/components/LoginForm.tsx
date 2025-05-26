'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split('/')[1];
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            phone: '',
            password: '',
        },
        validationSchema: Yup.object({
            phone: Yup.string()
                .matches(/^[0-9]{10,15}$/, 'Enter a valid phone number')
                .required('Phone is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            toast.dismiss();

            // 👇 محاكاة تحقق من بيانات الدخول
            if (values.phone !== '0123456789' || values.password !== 'password123') {
                toast.error('Invalid phone or password');
                setLoading(false);
                return;
            }

            try {
                // تخيلي إنه هنا حصل تسجيل دخول ناجح
                await new Promise((res) => setTimeout(res, 1000));

                // 👇 تخزين توكن مؤقت (localStorage مثلاً)
                localStorage.setItem('token', 'mock-token');
                toast.success('Login successful!');
                router.push(`/${locale}/dashboard`);
            } catch (error) {
                toast.error('Something went wrong, try again.');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <input
                // name="phone"
                type="tel"
                placeholder="Phone"
                className="border p-2 rounded-md"
                {...formik.getFieldProps('phone')}
            />
            {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            )}

            <input
                // name="password"
                type="password"
                placeholder="Password"
                className="border p-2 rounded-md"
                {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}

            <div className="flex justify-between items-center text-sm">
                <label>
                    <input type="checkbox" className="mr-2" />
                    Remember me
                </label>
                <a href="#" className="text-blue-500">Forgot Password?</a>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition ${loading ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
            >
                {loading ? 'Logging in...' : 'Log in'}
            </button>
        </form>
    );
}
