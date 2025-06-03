'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getCountryCodes, login, BrandCountry } from '@/services/ClientApiHandler';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { ChevronDown, Eye, EyeOff } from 'lucide-react';
// import Link from 'next/link';
import { useVerificationStore } from '@/stores/useVerificationStore';

export default function LoginForm() {
  const [countryCodes, setCountryCodes] = useState<BrandCountry[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<BrandCountry | null>(null);
const setVerificationData = useVerificationStore((state) => state.setVerificationData);

  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const setUserData = useAuthStore((state) => state.setUserData);

  // Fetch country codes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const codes = await getCountryCodes();
        setCountryCodes(codes);
        setSelectedCountry(codes[0]); // default selected country
        formik.setFieldValue('phone_code', codes[0].phone_code);
      } catch (err) {
        toast.error('Failed to load country codes');
        console.error(err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
const handleForget=() => {
  setVerificationData({
      verificationType: 'forgot_password',
});
    router.push('/auth/verify');
}

  const formik = useFormik({
    initialValues: {
      phone_code: '',
      phone: '',
      password: '',
      rememberMe: false,
      device_type: 'web',
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required('Phone is required')
        .matches(/^\d+$/, 'Phone must be digits only')
        .max(selectedCountry?.phone_limit || 10, `Max ${selectedCountry?.phone_limit || 10} digits`),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      toast.dismiss();

      try {
        const data = await login({
          ...values,
          device_type: 'web',
        }) as { token: string; user: { phone: string; name?: string } };

        setToken(data.token);
        setUserData(data.user);
        toast.success('Login successful!');
        router.push('/');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err);
        toast.error(err?.response?.data?.message || 'Login failed');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const country = countryCodes.find((c) => c.phone_code === code);
    setSelectedCountry(country || null);
    formik.setFieldValue('phone_code', code);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full mx-auto p-4">
     <div className="phone-dev gap-2 items-center">
     <div className="phone-inputs flex gap-1">
       {/* Select with Chevron */}
      <div className="relative w-26">
        <select
          className="p-3 border rounded-xl appearance-none w-full"
          value={formik.values.phone_code}
          onChange={handleCountryChange}
        >
          {countryCodes.map((country) => (
            <option key={country.id} value={country.phone_code}>
              +{country.phone_code}
            </option>
          ))}
        </select>

        {/* Chevron Icon */}
        <div
          className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500`}
        >
          <ChevronDown size={18} />
        </div>
      </div>

      {/* Phone Input */}
      <input
        type="tel"
        placeholder="Phone"
        className="border p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        {...formik.getFieldProps("phone")}
      />
     </div>
      {formik.touched.phone && formik.errors.phone && (
        <div className="text-red-500 text-sm">{formik.errors.phone}</div>
      )}
    </div>

  <div className="pass">
        <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder='Password'
          {...formik.getFieldProps('password')}
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md "
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
  </div>

<div className="flex items-center justify-between w-full text-sm">
  <label className="flex text-gray-700 gap-2">
    <input
      type="checkbox"
      checked={formik.values.rememberMe}
      onChange={() =>
        formik.setFieldValue('rememberMe', !formik.values.rememberMe)
      }
      className="!w-4 h-4 accent-blue-600"
    />
    <span className="ml-[4px] select-none">Remember me</span>
  </label>

  {/* <Link
    href="/forgot-password"
    className="text-blue-600 hover:underline"
  > */}
  <button  className="text-blue-600 hover:underline" onClick={handleForget}>
    Forgot password?
  </button>
    
  {/* </Link> */}
</div>


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

//ENG EZAT CODE 
// if (dataToVerify.value.type == "register") {
//     frmData.append("verification_code", verify_code.value);
//   } else {
//     frmData.append("reset_code", verify_code.value);
//   }
//   frmData.append("phone_code", dataToVerify.value.phone_code);
//   frmData.append("phone", dataToVerify.value.phone);

  


//   let url;

//   if (dataToVerify.value.type == "register") {
//     url = "auth/verify_phone";
//   } else {
//     url = "auth/verify_forgot_password_code";
//   }