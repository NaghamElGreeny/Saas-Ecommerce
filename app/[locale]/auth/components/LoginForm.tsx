'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export default function LoginForm() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split('/')[1];
    const [loading, setLoading] = useState(false);
    const setToken = useAuthStore((state) => state.setToken);
    const countryCodes = [
        { code: '+20', label: 'Egypt' },
        { code: '+966', label: 'Saudi Arabia' },
        { code: '+971', label: 'UAE' },
        { code: '+1', label: 'USA' },
    ];
    const formik = useFormik({
        initialValues: {
            phone: '',
            password: '',
            rememberMe: false,
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

            if (values.phone !== '0123456789' || values.password !== 'password123') {
                toast.error('Invalid phone or password');
                setLoading(false);
                return;
            }

            try {
                await new Promise((res) => setTimeout(res, 1000));

                setToken('mock-token');
                toast.success('Login successful!');
                router.push(`/${locale}/dashboard`);
            } catch {
                toast.error('Something went wrong, try again.');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full mx-auto p-4">
            <div className="flex gap-2">
                <select
                    className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 w-28"
                    {...formik.getFieldProps('countryCode')}
                >
                    {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.label} ({country.code})
                        </option>
                    ))}
                </select>
                <input
                    type="tel"
                    placeholder="Phone"
                    className="border p-3 rounded-md w-full"
                    {...formik.getFieldProps('phone')}
                />
                {formik.touched.phone && formik.errors.phone && (
                    <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                )}
            </div>
            <input
                type="password"
                placeholder="Password"
                className="border p-3 rounded-md"
                {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}

            <label className="flex items-center space-x-2 text-sm">
                <input
                    type="checkbox"
                    checked={formik.values.rememberMe}
                    onChange={() => formik.setFieldValue('rememberMe', !formik.values.rememberMe)}
                    className="w-4 h-4"
                />
                <span className="select-none">Remember me</span>
            </label>

            <button
                type="submit"
                disabled={loading}
                className={`bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition ${loading ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
            >
                {loading ? 'Logging in...' : 'Log in'}
            </button>
        </form>
    );
}
