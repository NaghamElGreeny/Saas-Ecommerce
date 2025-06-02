'use client';

import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { BrandCountry, register, getCountryCodes, RegisterPayload } from '@/services/ClientApiHandler';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import toast from 'react-hot-toast';
import { useVerificationStore } from '@/stores/useVerificationStore';

export default function RegisterForm() {
  const [countryCodes, setCountryCodes] = useState<BrandCountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<BrandCountry | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  // const setToken = useAuthStore((state) => state.setToken);
  // const setUserData = useAuthStore((state) => state.setUserData);
const setFormData = useAuthStore((state) => state.setFormData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const codes = await getCountryCodes();
        setCountryCodes(codes);
        setSelectedCountry(codes[0]);
        formik.setFieldValue('phone_code', codes[0].phone_code);
      } catch (err) {
        toast.error('Failed to load country codes');
        console.error(err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      phone_code: '',
      phone: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required('Full name is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      phone_code: Yup.string().required('Phone code is required'),
      phone: Yup.string()
        .required('Phone is required')
        .matches(/^\d+$/, 'Phone must be digits only')
        .max(selectedCountry?.phone_limit || 10, `Max ${selectedCountry?.phone_limit || 10} digits`),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Password confirmation is required'),
    }),
   onSubmit: async (values) => {
  setLoading(true);
  toast.dismiss();

  try {
    const payload: RegisterPayload = {
      full_name: values.full_name,
      email: values.email,
      phone_code: values.phone_code,
      phone: values.phone,
      password: values.password,
      password_confirmation: values.password_confirmation,
      device_type: "web",
    };
 console.log('Register Payload:', payload); 

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const data = await register(payload);

setFormData({
  full_name: values.full_name,
  email: values.email,
  phone_code: values.phone_code,
  phone: values.phone,
  password: values.password,
  password_confirmation: values.password_confirmation,
  device_type: 'web',
});

    toast.success('Registration successful!');

useVerificationStore.getState().setVerificationData({
  phone: values.phone,
  phoneCode: values.phone_code,
  verificationType: 'register',
});

    router.push('/auth/verify');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
console.log('Register error response:', err.response?.data);
    console.error(err);
    const resData = err.response?.data;
    if (resData?.messages) {
      Object.values(resData.messages).forEach((msgs) => {
        (msgs as string[]).forEach((msg) => toast.error(msg));
      });
    } else if (resData?.message) {
      toast.error(resData.message);
    } else if (err instanceof Error) {
      toast.error(err.message);
    } else {
      toast.error('Registration failed');
    }
  } finally {
    setLoading(false);
  }
}

  });

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const country = countryCodes.find((c) => c.phone_code === code);
    setSelectedCountry(country || null);
    formik.setFieldValue('phone_code', code);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full mx-auto p-4 max-w-md">
      <input
        type="text"
        placeholder="Full Name"
        {...formik.getFieldProps('full_name')}
        className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {formik.touched.full_name && formik.errors.full_name && (
        <div className="text-red-500 text-sm">{formik.errors.full_name}</div>
      )}

      <input
        type="email"
        placeholder="Email"
        {...formik.getFieldProps('email')}
        className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {formik.touched.email && formik.errors.email && (
        <div className="text-red-500 text-sm">{formik.errors.email}</div>
      )}

      <div className="flex gap-2">
        <select
          className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 w-18 bg-none appearance-none" 
          value={formik.values.phone_code}
          onChange={handleCountryChange}
        >
          {countryCodes.map((country) => (
            <option key={country.id} value={country.phone_code}>
              +{country.phone_code}
            </option>
          ))}
        </select>

        <input
          type="tel"
          placeholder="Phone"
          {...formik.getFieldProps('phone')}
          className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      {formik.touched.phone && formik.errors.phone && (
        <div className="text-red-500 text-sm">{formik.errors.phone}</div>
      )}

      <input
        type="password"
        placeholder="Password"
        {...formik.getFieldProps('password')}
        className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {formik.touched.password && formik.errors.password && (
        <div className="text-red-500 text-sm">{formik.errors.password}</div>
      )}

      <input
        type="password"
        placeholder="Confirm Password"
        {...formik.getFieldProps('password_confirmation')}
        className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {formik.touched.password_confirmation && formik.errors.password_confirmation && (
        <div className="text-red-500 text-sm">{formik.errors.password_confirmation}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition ${
          loading ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}
