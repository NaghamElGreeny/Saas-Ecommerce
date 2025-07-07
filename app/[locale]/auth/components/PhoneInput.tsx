'use client';

import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { locationService} from '@/services/ClientApiHandler';
// import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useVerificationStore } from '@/stores/useVerificationStore';
import { ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { BrandCountry } from '@/utils/types';

export default function PhoneInput({setStatus}: { setStatus: (status: 'phone' | 'verify') => void }) {
  const [countryCodes, setCountryCodes] = useState<BrandCountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<BrandCountry | null>(null);
  const [loading, setLoading] = useState(false);

  const setFormData = useAuthStore((state) => state.setFormData);
  const setVerificationData = useVerificationStore((state) => state.setVerificationData);

  // const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const codes = await locationService.getCountryCodes();
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
      phone_code: '',
      phone: '',
    },
    validationSchema: Yup.object({
      phone_code: Yup.string().required('Phone code is required'),
      phone: Yup.string()
        .required('Phone is required')
        .matches(/^\d+$/, 'Phone must be digits only')
        .max(selectedCountry?.phone_limit || 10, `Max ${selectedCountry?.phone_limit || 10} digits`),
    }),
   onSubmit: async (values) => {
  setLoading(true);
  toast.dismiss();

setFormData({
  phone_code: values.phone_code,
  phone: values.phone,
  device_type: 'web',
});

  try {
setVerificationData({
  phone: values.phone,
  phoneCode: values.phone_code,
  verificationType: 'forgot_password',
});

    // router.push('/auth/verify');
    setStatus('verify');
    //STATE 
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
    <>
       <h2 className="font-bold lg:text-4xl text-3xl mb-4">Verify Code</h2>
         <p className="text-sub mb-3">
please enter your phone number below to recovery your password.
        </p>
   
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full mx-auto p-4 max-w-md">

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

      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition ${
          loading ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
     </>
  );
}
