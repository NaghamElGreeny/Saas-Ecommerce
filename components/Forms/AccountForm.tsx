"use client";

import { useEffect, useState } from "react";
import { Formik, Form } from "formik"; 
import * as Yup from "yup";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronDown, Eye, EyeOff, KeyIcon, Upload } from "lucide-react";
import { Button } from "../atoms/buttons/Button";
import { useAuthStore } from "@/stores/authStore";
import Image from "next/image";
import {
  locationService,
  userService,
  authService,
} from "@/services/ClientApiHandler";
import toast from "react-hot-toast";
import { BrandCountry } from "@/utils/types";
import VerificationCodeDialog from "../Dialogs/VerificationCodeDialog";
import { useTranslations } from "next-intl"; 
// interface userResponse{
//   data: UserData;
//   status: string;
//   message: string;
// }
const AccountForm = () => {
  const { userData, setUserData } = useAuthStore();
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [countryCodes, setCountryCodes] = useState<BrandCountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<BrandCountry | null>(
    null,
  );

  const [avatarUrl, setAvatarUrl] = useState(userData.avatar);
  const [uploadedAvatar, setUploadedAvatar] = useState("");

  const [newPhone, setNewPhone] = useState<{
    phone: string;
    phone_code: string;
  } | null>(null);

  const [showVerification, setShowVerification] = useState(false);
  const t = useTranslations("ACCOUNT_FORM"); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await userService.getUser();
        if (user) setUserData(user.data);
        console.log("🚀 ~ fetchData ~ user:", user)
        const codes = await locationService.getCountryCodes();
        setCountryCodes(codes);
        setSelectedCountry(codes[0]);
      } catch (err) {
        toast.error(t("failed_to_load_country_codes"));
        console.error(err);
      }
    };
    fetchData();
  }, [setUserData, t]);

  const validationSchema = Yup.object({
    full_name: Yup.string().required(t("name_required")),
    email: Yup.string().email(t("invalid_email")).required(t("email_required")),
  });

  const passwordSchema = Yup.object().shape({
    old_password: Yup.string().required(t("current_password_required")),
    password: Yup.string()
      .min(6, t("password_too_short"))
      .required(t("new_password_required")),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], t("passwords_must_match"))
      .required(t("confirm_new_password_required")),
  });

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const uploaded = await userService.uploadImage(file);
        const uploadedUrl = uploaded.data.avatar_url || uploaded.data;
        setUploadedAvatar(uploadedUrl);
        setAvatarUrl(URL.createObjectURL(file));
        toast.success(t("image_uploaded_success"));
      } catch (err) {
        toast.error(t("image_upload_failed"));
        console.error(err);
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          full_name: userData.full_name || "",
          email: userData.email || "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            const updated = await userService.updateUserInfo({
              ...values,
              avatar: uploadedAvatar || userData?.avatar,
            });
            setUserData({ ...userData, ...updated.data });
            toast.success(t("account_updated_success"));
          } catch (err) {
            toast.error(t("failed_to_update_account"));
            console.error(err);
          }
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            {/* Profile Picture & Change Password */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="relative h-[200px] w-[200px]">
                <Image
                  src={avatarUrl}
                  alt={t("profile_picture_alt")}
                  width={200}
                  height={200}
                  className="h-full w-full rounded-full border border-black object-cover"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute right-1 bottom-1 cursor-pointer rounded-full bg-white p-1 shadow"
                >
                  <Upload
                    size={30}
                    color="white"
                    className="bg-primary rounded-full"
                  />
                </label>
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowPasswordDialog(true)}
                className="flex items-center gap-1 text-sm text-blue-600"
              >
                <KeyIcon size={16} />
                {t("change_password_button")}
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-3 md:col-span-2">
              {/* Name */}
              <div>
                <label className="text-text-website-font text-sm font-semibold">
                  {t("name_label")}
                </label>
                <input
                  name="full_name"
                  value={values.full_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded border px-3 py-2"
                />
                {touched.full_name && errors.full_name && (
                  <div className="mt-1 text-xs text-red-500">
                    {errors.full_name}
                  </div>
                )}
              </div>

              {/* Phone (Disabled) */}
              <div className="!mb-0">
                <label className="text-text-website-font w-full items-end text-sm font-semibold">
                  {t("phone_label")}
                </label>
                <div className="flex gap-2">
                  <input
                    value="+20"
                    disabled
                    className="max-w-[80px] rounded !bg-gray-200 px-3 py-2"
                  />
                  <input
                    value={userData.phone}
                    disabled
                    className="flex-1 rounded !bg-gray-200 px-3 py-2"
                  />
                </div>
                <div className="changephone flex w-full justify-end">
                  <button
                    type="button"
                    onClick={() => setShowPhoneDialog(true)}
                    className="mt-1 text-sm text-blue-600"
                  >
                    {t("change_phone_button")}
                  </button>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-text-website-font text-sm font-semibold">
                  {t("email_label")}
                </label>
                <input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full rounded border px-3 py-2"
                />
                {touched.email && errors.email && (
                  <div className="mt-1 text-xs text-red-500">
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button type="submit" className="px-6">
                  {t("save_button")}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      {/* Phone Dialog */}
      <Dialog open={showPhoneDialog} onOpenChange={setShowPhoneDialog}>
        <DialogContent>
          <h3 className="text-lg font-semibold">{t("change_phone_dialog_title")}</h3>

          {!showVerification ? (
            <Formik
              initialValues={{
                phone_code: selectedCountry?.phone_code || "20",
                phone: "",
              }}
              validationSchema={Yup.object({
                phone: Yup.string()
                  .required(t("phone_required"))
                  .matches(/^\d+$/, t("phone_digits_only"))
                  .max(
                    selectedCountry?.phone_limit || 10,
                    t("phone_max_digits", { limit: selectedCountry?.phone_limit || 10 }),
                  ),
              })}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                  setSubmitting(true);
                  await authService.verifyCode(values);
                  setNewPhone(values);
                  setShowVerification(true);
                } catch (error) {
                  const errorMsg =
                    error?.response?.data?.message || t("something_went_wrong");
                  toast.error(errorMsg);
                  if (error?.response?.data?.errors) {
                    setErrors(error.response.data.errors);
                  }
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting, values, handleChange, errors, touched }) => (
                <Form className="mt-4 space-y-4">
                  <div className="flex items-center gap-2">
                    {/* Country Code */}
                    <div className="relative w-28">
                      <select
                        name="phone_code"
                        className="w-full appearance-none rounded-xl border p-3"
                        value={values.phone_code}
                        onChange={handleChange}
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

                    {/* Phone Input */}
                    <div className="flex-1">
                      <input
                        name="phone"
                        type="tel"
                        placeholder={t("phone_placeholder")}
                        value={values.phone}
                        onChange={handleChange}
                        className="w-full rounded-md border p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                      />
                    </div>
                  </div>
                  {touched.phone && errors.phone && (
                    <div className="mt-0 text-sm text-red-500">
                      {errors.phone}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    loading={isSubmitting}
                  >
                    {t("send_verification_code_button")}
                  </Button>
                </Form>
              )}
            </Formik>
          ) : (
            <>
              <VerificationCodeDialog
                newPhone={newPhone}
                onClose={() => {
                  setShowPhoneDialog(false);
                  setShowVerification(false);
                }}
              />
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <h3 className="text-lg font-semibold">{t("change_password_dialog_title")}</h3>
          <Formik
            initialValues={{
              old_password: "",
              password: "",
              password_confirmation: "",
            }}
            validationSchema={passwordSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const res = await authService.resetPassword(values);
                toast.success(t("password_changed_success"));
                setUserData(res.data);
                resetForm();
                setShowPasswordDialog(false);
              } catch (error) {
                const errorMsg =
                  error?.response?.data?.message || t("something_went_wrong");
                toast.error(errorMsg);
              }
            }}
          >
            {({ values, handleChange, handleBlur, touched, errors }) => (
              <Form className="mt-3 space-y-3">
                <div>
                  <div className="oldpass relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="old_password"
                      placeholder={t("current_password_placeholder")}
                      value={values.old_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full rounded border px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute top-1/2 right-2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {touched.old_password && errors.old_password && (
                    <div className="mt-1 text-xs text-red-500">
                      {errors.old_password}
                    </div>
                  )}
                </div>

                <div>
                  <div className="newpass relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder={t("new_password_placeholder")}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full rounded border px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute top-1/2 right-2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {touched.password && errors.password && (
                    <div className="mt-1 text-xs text-red-500">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div>
                  <div className="confirmnewpass relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password_confirmation"
                      placeholder={t("confirm_new_password_placeholder")}
                      value={values.password_confirmation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full rounded border px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute top-1/2 right-2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {touched.password_confirmation &&
                    errors.password_confirmation && (
                      <div className="mt-1 text-xs text-red-500">
                        {errors.password_confirmation}
                      </div>
                    )}
                </div>

                <div className="save flex w-full justify-end">
                  <Button type="submit" className="w-[30%] rounded-full">
                    {t("save_button")}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountForm;