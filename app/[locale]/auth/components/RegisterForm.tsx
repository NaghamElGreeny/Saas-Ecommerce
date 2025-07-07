"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

// Services & Stores
import { authService, locationService } from "@/services/ClientApiHandler";
import { useAuthStore } from "@/stores/authStore";
import { useVerificationStore } from "@/stores/useVerificationStore";
import { BrandCountry } from "@/stores/countryCodesStore";

// Types
import { RegisterPayload } from "@/utils/types";

export default function RegisterForm() {
  const t = useTranslations("REGISTER_FORM");
  const router = useRouter();

  const [countryCodes, setCountryCodes] = useState<BrandCountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<BrandCountry | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRTL, setIsRTL] = useState(false);

  const setFormData = useAuthStore((state) => state.setFormData);
  const setVerificationData = useVerificationStore((state) => state.setVerificationData);

  // Fetch country codes on mount
  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const codes = await locationService.getCountryCodes();
        setCountryCodes(codes);
        setSelectedCountry(codes[0]);
        formik.setFieldValue("phone_code", codes[0].phone_code);
      } catch (err) {
        toast.error(t("failed_load_country_codes"));
        console.error(err);
      }
    };

    fetchCountryCodes();
    setIsRTL(document?.documentElement?.dir === "rtl");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      phone_code: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required(t("full_name_required")),
      email: Yup.string().email(t("email_invalid")).required(t("email_required")),
      phone_code: Yup.string().required(t("phone_code_required")),
      phone: Yup.string()
        .required(t("phone_required"))
        .matches(/^\d+$/, t("phone_digits_only"))
        .max(
          selectedCountry?.phone_limit || 10,
          t("phone_max_digits", { count: selectedCountry?.phone_limit || 10 })
        ),
      password: Yup.string().min(6, t("password_min_chars")).required(t("password_required")),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password")], t("password_match"))
        .required(t("password_confirmation_required")),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      toast.dismiss();

      const payload: RegisterPayload = {
        ...values,
        device_type: "web",
      };

      try {
        await authService.register(payload);

        setFormData(payload);
        setVerificationData({
          phone: values.phone,
          phoneCode: values.phone_code,
          verificationType: "register",
        });

        toast.success(t("registration_successful"));
        router.push("/auth/verify");
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
          toast.error(t("registration_failed"));
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value;
    const country = countryCodes.find((c) => c.phone_code === code);
    setSelectedCountry(country || null);
    formik.setFieldValue("phone_code", code);
  };

  const renderInput = (name: keyof typeof formik.values, type: string, placeholder: string) => (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...formik.getFieldProps(name)}
        className="w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-sm text-red-500">{formik.errors[name]}</div>
      )}
    </div>
  );

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mx-auto flex w-full max-w-md flex-col gap-4 p-4"
    >
      {renderInput("full_name", "text", t("full_name_placeholder"))}
      {renderInput("email", "email", t("email_placeholder"))}

      <div className="phone-dev items-center gap-2">
        <div className="phone-inputs flex gap-1">
          {/* Country Code Select */}
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

            {/* Chevron Icon */}
            <div
              className={`pointer-events-none absolute top-1/2 ${
                isRTL ? "left-3" : "right-3"
              } -translate-y-1/2 text-gray-500`}
            >
              <ChevronDown size={18} />
            </div>
          </div>

          {/* Phone Number */}
          <input
            type="tel"
            placeholder={t("phone_placeholder")}
            {...formik.getFieldProps("phone")}
            className="w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-sm text-red-500">{formik.errors.phone}</div>
        )}
      </div>

      {renderInput("password", "password", t("password_placeholder"))}
      {renderInput("password_confirmation", "password", t("confirm_password_placeholder"))}

      <button
        type="submit"
        disabled={loading}
        className={`rounded-full bg-blue-600 py-3 text-white transition hover:bg-blue-700 ${
          loading ? "cursor-not-allowed opacity-60" : ""
        }`}
      >
        {loading ? t("registering") : t("register")}
      </button>
    </form>
  );
}
