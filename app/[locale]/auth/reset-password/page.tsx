'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import {  useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { useVerificationStore } from '@/stores/useVerificationStore';
import { ResetPassword, ResetPasswordPayload } from "@/services/ClientApiHandler";
// import { useAuthStore } from '@/stores/authStore';

export default function VerifyPage() {
    const [loading, setLoading] = useState(false);


    const router = useRouter();
    const pathname = usePathname();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const locale = pathname.split('/')[1];

    const verification_code = useVerificationStore(state => state.verification_code);
 const phone = useVerificationStore(state => state.phone);
    const phoneCode = useVerificationStore(state => state.phoneCode); 
const setVerificationData = useVerificationStore((state) => state.setVerificationData);

  const formik = useFormik({
    initialValues: {
      password: '',
      password_confirmation: '',
    },
    validationSchema: Yup.object({
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
    console.log('>>>>>>>>>>>>>>>>>',verification_code,phone,phoneCode);
  const payload :ResetPasswordPayload= {
      phone: phone!,
      phone_code: phoneCode!, 
      reset_code: verification_code!,
      password: values.password,
      password_confirmation: values.password_confirmation,
      device_type: 'web',
  };
 console.log('password Payload:', payload); 

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const data = await ResetPassword(payload);

// setFormData({
//   password: values.password,
//   password_confirmation: values.password_confirmation,
//   device_type: 'web',
// });

    toast.success('Reset successful!');

setVerificationData({
  verificationType: 'forgot_password',
  verification_code: verification_code,  

});
    // router.push('/auth/verify');
    router.push('/');
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
      toast.error('Password Reset failed');
    }
  } finally {
    setLoading(false);
  }
}

});

    return (
        <div className="bg-white flex w-full h-screen overflow-hidden">
            {/* Left Image Section */}
            <div className="w-1/2 hidden md:block relative">
                <Image
                    src="/assets/images/auth-image.png"
                    alt="login"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Right Form Section */}
            <div className="bg-white w-full md:w-1/2 relative flex items-center justify-center">
                <div className="rtl:left-3.5 ltr:right-3.5 absolute w-full h-full px-[120px] py-[320px] rounded-2xl z-20 bg-white flex flex-col justify-center">
                    <div className="flex mb-6">
                        <Image
                            src="/assets/images/mea-logo.png"
                            alt="Logo"
                            width={154}
                            height={115}
                            className="w-[154px] h-[115px]"
                            priority
                        />
                    </div>

                    <h2 className="text-xl font-bold mb-4">Change Password</h2>
                    <p className="text-sm mb-6">
                      Please enter you new password
                    </p>

                    <form onSubmit={formik.handleSubmit} className="mb-6">
                 <div className="password">
      <input
        type="password"
        placeholder="Password"
        {...formik.getFieldProps('password')}
        className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {formik.touched.password && formik.errors.password && (
        <div className="text-red-500 text-sm">{formik.errors.password}</div>
      )}
</div>
<div className="confirm-password">
      <input
        type="password"
        placeholder="Confirm Password"
        {...formik.getFieldProps('password_confirmation')}
        className="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {formik.touched.password_confirmation && formik.errors.password_confirmation && (
        <div className="text-red-500 text-sm">{formik.errors.password_confirmation}</div>
      )}
</div>
      <button
        type="submit"
        disabled={loading}
        className={`bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition ${
          loading ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
