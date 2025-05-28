'use client';
// import PhoneInput from 'react-phone-number-input'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { PasswordInput } from '@/components/atoms/inputs/PasswordInput';
import PhoneInput from 'react-phone-number-input'
import { Eye, EyeOff } from "lucide-react";
import 'react-phone-number-input/style.css';
export default function LoginForm() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split('/')[1];
    const [loading, setLoading] = useState(false);
    const setToken = useAuthStore((state) => state.setToken);
    const user = useAuthStore((state) => state.userData);
    // console.log(user);

    const [showPassword, setShowPassword] = useState(false);

    const countryCodes = [
        { code: '+20', label: 'Egypt', flag: '🇪🇬' },
        { code: '+966', label: 'Saudi Arabia', flag: '🇸🇦' },
        { code: '+971', label: 'UAE', flag: '🇦🇪' },
        { code: '+1', label: 'USA', flag: '🇺🇸' },
    ];
    const formik = useFormik({
        initialValues: {
            phone: '',
            countryCode: '',
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
            const fullPhone = values.countryCode + values.phone;
            if (fullPhone !== user?.phone || values.password !== user.password) {
                console.log(fullPhone, 'code', values.countryCode)
                if (fullPhone !== user?.phone) { toast.error('Invalid phone'); }
                if (values.password !== user?.password) { toast.error('Invalid password'); }
                // toast.error('Invalid phone or password');
                setLoading(false);
                return;
            }

            try {
                await new Promise((res) => setTimeout(res, 1000));

                setToken('mock-token');
                toast.success('Login successful!');
                router.push(`/${locale}/`);
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
                    className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    {...formik.getFieldProps('phone')}
                />
                {formik.touched.phone && formik.errors.phone && (
                    <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                )}
            </div>
            {/* <div className="flex gap-2 items-start">
                <div className="relative w-32">
                    <select
                        className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 w-full appearance-none bg-white"
                        {...formik.getFieldProps('countryCode')}
                    >
                        <option value="" disabled>
                            Select country
                        </option>
                        {countryCodes.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.flag} {country.label} ({country.code})
                            </option>
                        ))}
                    </select>

                    {formik.values.countryCode && (
                        <div className="absolute inset-0 flex items-center px-3 pointer-events-none text-black font-medium bg-white">
                            {formik.values.countryCode}
                        </div>
                    )}
                </div>

                <div className="w-full">
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
            </div> */}


            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder='password'
                    {...formik.getFieldProps('password')}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label="Toggle password visibility"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
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
