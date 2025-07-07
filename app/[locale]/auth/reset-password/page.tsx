'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

import { useVerificationStore } from '@/stores/useVerificationStore';
import { ResetPasswordPayload } from '@/utils/types';
import { authService } from '@/services/ClientApiHandler';

export default function VerifyPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const pathname = usePathname();
  const t = useTranslations('VERIFY_PAGE');

  const {
    verification_code,
    phone,
    phoneCode,
    setVerificationData,
  } = useVerificationStore((state) => ({
    verification_code: state.verification_code,
    phone: state.phone,
    phoneCode: state.phoneCode,
    setVerificationData: state.setVerificationData,
  }));

  const formik = useFormik({
    initialValues: {
      password: '',
      password_confirmation: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, t('password_min_chars'))
        .required(t('password_required')),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref('password')], t('password_match'))
        .required(t('password_confirmation_required')),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      toast.dismiss();

      const payload: ResetPasswordPayload = {
        phone: phone!,
        phone_code: phoneCode!,
        reset_code: verification_code!,
        password: values.password,
        password_confirmation: values.password_confirmation,
        device_type: 'web',
      };

      try {
        await authService.resetPassword(payload);

        toast.success(t('reset_successful_toast'));
        setVerificationData({
          verificationType: 'forgot_password',
          verification_code,
        });

        router.push('/');
      } catch (err) {
        const resData = err.response?.data;

        if (resData?.messages) {
          Object.values(resData.messages).forEach((msgs) =>
            (msgs as string[]).forEach((msg) => toast.error(msg))
          );
        } else if (resData?.message) {
          toast.error(resData.message);
        } else if (err instanceof Error) {
          toast.error(err.message);
        } else {
          toast.error(t('password_reset_failed_toast'));
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      <div className="relative hidden w-1/2 md:block">
        <Image
          src="/assets/images/auth-image.png"
          alt="login"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative flex w-full items-center justify-center bg-white md:w-1/2">
        <div className="absolute z-20 flex h-full w-full flex-col justify-center px-[120px] py-[320px] rounded-2xl">
          <div className="mb-6 flex">
            <Image
              src="/assets/images/mea-logo.png"
              alt="Logo"
              width={154}
              height={115}
              className="h-[115px] w-[154px]"
              priority
            />
          </div>

          <h2 className="mb-4 text-xl font-bold">{t('change_password_title')}</h2>
          <p className="mb-6 text-sm">{t('enter_new_password_prompt')}</p>

          <form onSubmit={formik.handleSubmit} className="mb-6 space-y-4">
            <div>
              <input
                type="password"
                placeholder={t('password_placeholder')}
                {...formik.getFieldProps('password')}
                className="w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-sm text-red-500">
                  {formik.errors.password}
                </div>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder={t('confirm_password_placeholder')}
                {...formik.getFieldProps('password_confirmation')}
                className="w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {formik.touched.password_confirmation &&
                formik.errors.password_confirmation && (
                  <div className="text-sm text-red-500">
                    {formik.errors.password_confirmation}
                  </div>
                )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-full bg-blue-600 py-3 text-white transition hover:bg-blue-700 ${
                loading ? 'cursor-not-allowed opacity-60' : ''
              }`}
            >
              {loading ? t('resetting_password_button') : t('reset_password_button')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}