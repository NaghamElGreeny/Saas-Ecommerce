'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

const countryCodes = [
    { code: '+20', label: 'Egypt' },
    { code: '+966', label: 'Saudi Arabia' },
    { code: '+971', label: 'UAE' },
    { code: '+1', label: 'USA' },
];

export default function RegisterPage() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split('/')[1];
    const [loading, setLoading] = useState(false);
    const user = useAuthStore((state) => state.userData);

    const formik = useFormik({
        initialValues: {
            name: '',
            countryCode: countryCodes[0].code,
            phone: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            countryCode: Yup.string().required('Country code is required'),
            phone: Yup.string()
                .matches(/^[0-9]{7,15}$/, 'Enter a valid phone number without country code')
                .required('Phone is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            toast.dismiss();

            const fullPhone = values.countryCode + values.phone;

            if (fullPhone === user?.phone) {
                toast.error('This phone number is already registered');
                setLoading(false);
                return;
            }

            try {
                await new Promise((res) => setTimeout(res, 1500));
                toast.success('Account created! Please verify your phone.');
                router.push(`/${locale}/auth/verify`);
            } catch (error) {
                toast.error('Something went wrong, please try again.');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6 w-full mx-auto p-4">
            <div>
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...formik.getFieldProps('name')}
                />
                {formik.touched.name && formik.errors.name && (
                    <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
                )}
            </div>

            {/* كود الدولة ورقم التليفون جنب بعض */}
            <div className="flex space-x-2">
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
                    placeholder="Phone Number"
                    className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...formik.getFieldProps('phone')}
                />
            </div>
            {(formik.touched.phone && formik.errors.phone) || (formik.touched.countryCode && formik.errors.countryCode) ? (
                <p className="text-sm text-red-500 mt-1">
                    {formik.errors.phone || formik.errors.countryCode}
                </p>
            ) : null}

            <div>
                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email && (
                    <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
                )}
            </div>

            <div>
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password && (
                    <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 mt-2 text-white font-semibold rounded-xl transition duration-300 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
            >
                {loading ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
}
