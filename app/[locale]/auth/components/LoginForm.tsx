'use client';

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl"; 

import { locationService } from "@/services/ClientApiHandler";
import { authService } from "@/services/ClientApiHandler";
import { useAuthStore } from "@/stores/authStore";
import { useVerificationStore } from "@/stores/useVerificationStore";
import { BrandCountry } from "@/utils/types";

export default function LoginForm() {
  const [countryCodes, setCountryCodes] = useState<BrandCountry[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<BrandCountry | null>(null);

  const router = useRouter();
  const setToken = useAuthStore((state) => state.setToken);
  const setUserData = useAuthStore((state) => state.setUserData);
  const setFormData = useAuthStore((state) => state.setFormData);
  const setVerificationData = useVerificationStore((state) => state.setVerificationData);
  const t = useTranslations('LOGIN_FORM'); 

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const codes = await locationService.getCountryCodes();
        setCountryCodes(codes);
        setSelectedCountry(codes[0]);
        formik.setFieldValue("phone_code", codes[0].phone_code);
      } catch (error) {
        toast.error(t("failed_load_country_codes"));
        console.error(error);
      }
    };

    fetchCountryCodes();
  }, [t]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const country = countryCodes.find((c) => c.phone_code === code);
    setSelectedCountry(country || null);
    formik.setFieldValue("phone_code", code);
  };

  const handleForgetPassword = () => {
    setVerificationData({ verificationType: "forgot_password" });
    router.push("/auth/verify");
  };

  const formik = useFormik({
    initialValues: {
      phone_code: "",
      phone: "",
      password: "",
      rememberMe: false,
      device_type: "web",
    },
    validationSchema: Yup.object({
      phone: Yup.string()
        .required(t("phone_required"))
        .matches(/^\d+$/, t("phone_digits_only"))
        .max(selectedCountry?.phone_limit || 10, t("phone_max_digits", { count: selectedCountry?.phone_limit || 10 })),
      password: Yup.string().required(t("password_required")),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      toast.dismiss();

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await authService.login({ ...values, device_type: "web" }) as { data:any };
        console.log('login res :',response)
        const { token } = response.data;

        setToken(token);
        setUserData(response.data);
        setFormData({});
        Cookies.set("token", token, { expires: 300 });
        Cookies.remove("store_selected_once");

        toast.success(t("login_successful"));
        router.push("/");
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || t("login_failed"));
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mx-auto flex w-full flex-col gap-4 p-4">
      {/* Phone Section */}
      <div className="items-center gap-2">
        <div className="flex gap-1">
          {/* Country Code Selector */}
          <div className="relative w-26">
            <select
              className="w-full appearance-none rounded-xl border p-3"
              value={formik.values.phone_code}
              onChange={handleCountryChange}
            >
              {countryCodes.map((country) => (
                <option key={country.id} value={country.phone_code}>
                  +{country.phone_code}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500">
              <ChevronDown size={18} />
            </div>
          </div>

          {/* Phone Number Input */}
          <input
            type="tel"
            placeholder={t("phone_placeholder")}
            className="w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...formik.getFieldProps("phone")}
          />
        </div>
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-sm text-red-500">{formik.errors.phone}</div>
        )}
      </div>

      {/* Password Section */}
      <div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("password_placeholder")}
            className="w-full rounded-md border px-4 py-2 pr-10"
            {...formik.getFieldProps("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transform rtl:left-2 ltr:right-2"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className="text-sm text-red-500">{formik.errors.password}</div>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex w-full items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-gray-700">
          <input
            type="checkbox"
            checked={formik.values.rememberMe}
            onChange={() => formik.setFieldValue("rememberMe", !formik.values.rememberMe)}
            className="h-4 w-4 accent-blue-600"
          />
          <span className="select-none">{t("remember_me")}</span>
        </label>
        <button
          type="button"
          className="text-blue-600 hover:underline"
          onClick={handleForgetPassword}
        >
          {t("forgot_password")}
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`rounded-full bg-blue-600 py-3 text-white transition hover:bg-blue-700 ${
          loading ? "cursor-not-allowed opacity-60" : ""
        }`}
      >
        {loading ? t("logging_in") : t("log_in")}
      </button>
    </form>
  );
}