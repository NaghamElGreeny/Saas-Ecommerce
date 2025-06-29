"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  BrandCountry,
  register,
  getCountryCodes,
  RegisterPayload,
} from "@/services/ClientApiHandler";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import toast from "react-hot-toast";
import { useVerificationStore } from "@/stores/useVerificationStore";
import { ChevronDown } from "lucide-react";

export default function RegisterForm() {
  const [countryCodes, setCountryCodes] = useState<BrandCountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<BrandCountry | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  // const setToken = useAuthStore((state) => state.setToken);
  // const setUserData = useAuthStore((state) => state.setUserData);
  const setFormData = useAuthStore((state) => state.setFormData);
  const setVerificationData = useVerificationStore(
    (state) => state.setVerificationData,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const codes = await getCountryCodes();
        setCountryCodes(codes);
        setSelectedCountry(codes[0]);
        formik.setFieldValue("phone_code", codes[0].phone_code);
      } catch (err) {
        toast.error("Failed to load country codes");
        console.error(err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      full_name: Yup.string().required("Full name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone_code: Yup.string().required("Phone code is required"),
      phone: Yup.string()
        .required("Phone is required")
        .matches(/^\d+$/, "Phone must be digits only")
        .max(
          selectedCountry?.phone_limit || 10,
          `Max ${selectedCountry?.phone_limit || 10} digits`,
        ),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Password confirmation is required"),
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
        console.log("Register Payload:", payload);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const data = await register(payload);

        setFormData({
          full_name: values.full_name,
          email: values.email,
          phone_code: values.phone_code,
          phone: values.phone,
          password: values.password,
          password_confirmation: values.password_confirmation,
          device_type: "web",
        });

        toast.success("Registration successful!");

        // useVerificationStore.getState().setVerificationData({
        //   phone: values.phone,
        //   phoneCode: values.phone_code,
        //   verificationType: 'register',
        // });
        setVerificationData({
          phone: values.phone,
          phoneCode: values.phone_code,
          verificationType: "register",
        });
        router.push("/auth/verify");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error(err);
        console.log("Register error response:", err.response?.data);
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
          toast.error("Registration failed");
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

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mx-auto flex w-full max-w-md flex-col gap-4 p-4"
    >
      <div className="name">
        <input
          type="text"
          placeholder="Full Name"
          {...formik.getFieldProps("full_name")}
          className="rounded-md border p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        {formik.touched.full_name && formik.errors.full_name && (
          <div className="text-sm text-red-500">{formik.errors.full_name}</div>
        )}
      </div>
      <div className="email">
        <input
          type="email"
          placeholder="Email"
          {...formik.getFieldProps("email")}
          className="rounded-md border p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-sm text-red-500">{formik.errors.email}</div>
        )}
      </div>
      <div className="phone-dev items-center gap-2">
        <div className="phone-inputs flex gap-1">
          {/* Select with Chevron */}
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
              className={`pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500`}
            >
              <ChevronDown size={18} />
            </div>
          </div>

          {/* Phone Input */}
          <input
            type="tel"
            placeholder="Phone"
            className="w-full rounded-md border p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            {...formik.getFieldProps("phone")}
          />
        </div>
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-sm text-red-500">{formik.errors.phone}</div>
        )}
      </div>
      {/* password */}
      <div className="password">
        <input
          type="password"
          placeholder="Password"
          {...formik.getFieldProps("password")}
          className="rounded-md border p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="text-sm text-red-500">{formik.errors.password}</div>
        )}
      </div>
      <div className="confirm-password">
        <input
          type="password"
          placeholder="Confirm Password"
          {...formik.getFieldProps("password_confirmation")}
          className="rounded-md border p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
        className={`rounded-full bg-blue-600 py-3 text-white transition hover:bg-blue-700 ${
          loading ? "cursor-not-allowed opacity-60" : ""
        }`}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
