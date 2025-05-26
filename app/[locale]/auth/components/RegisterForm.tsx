'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split('/')[1];
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            phone: Yup.string()
                .matches(/^[0-9]{10,15}$/, 'Enter a valid phone number')
                .required('Phone is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            toast.dismiss();

            if (values.phone === '0123456789') {
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
        <div className="min-h-screen flex">
            {/* صورة الجانب الأيمن */}
            <div className="hidden md:block w-1/2 bg-cover bg-center" style={{ backgroundImage: `url('/your-image.jpg')` }}>
                {/* تقدري تغيري الصورة من هنا */}
            </div>

            {/* فورم التسجيل */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create your account</h2>

                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div>
                            <input
                                // name="name"
                                type="text"
                                placeholder="Full Name"
                                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                {...formik.getFieldProps('name')}
                            />
                            {formik.touched.name && formik.errors.name && (
                                <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
                            )}
                        </div>

                        <div>
                            <input
                                // name="phone"
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                                {...formik.getFieldProps('phone')}
                            />
                            {formik.touched.phone && formik.errors.phone && (
                                <p className="text-sm text-red-500 mt-1">{formik.errors.phone}</p>
                            )}
                        </div>

                        <div>
                            <input
                                // name="email"
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
                                // name="password"
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
                            className={`w-full py-3 mt-2 text-white font-semibold rounded-xl transition duration-300 ${loading
                                ? 'bg-blue-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>

                        <p className="text-center text-sm text-gray-600 mt-4">
                            Already have an account?{' '}
                            <a href={`/${locale}/auth`} className="text-blue-600 hover:underline">
                                Login here
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
