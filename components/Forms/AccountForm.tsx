"use client";

import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import {  KeyIcon, Upload } from "lucide-react";
import { Button } from "../atoms/buttons/Button";
import { useAuthStore } from "@/stores/authStore";
import Image from "next/image";
import {
  locationService,
  userService,
} from "@/services/ClientApiHandler";
import toast from "react-hot-toast";
import {
  BrandCountry,
  ProfileResponse,
  UploadImageResponse,
} from "@/utils/types";
import { useTranslations } from "next-intl";
import ChangePasswordDialog from "../Dialogs/ChangePasswordDialog";
import ChangePhoneDialog from "../Dialogs/ChangePhoneDialog";
const AccountForm = () => {
  const { userData, setUserData } = useAuthStore();
  const avatarr = useAuthStore(s => s.userData?.avatar)|| "assets/images/avatar.png";
  const [showPhoneDialog, setShowPhoneDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [countryCodes, setCountryCodes] = useState<BrandCountry[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<BrandCountry | null>(
    null,
  );

  const [avatarUrl, setAvatarUrl] = useState(avatarr);
  const [uploadedAvatar, setUploadedAvatar] = useState("");

  // const [newPhone, setNewPhone] = useState<{
  //   phone: string;
  //   phone_code: string;
  // } | null>(null);

  const t = useTranslations("ACCOUNT_FORM");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = (await userService.getUser()) as ProfileResponse;
        if (user) setUserData(user.data);
        console.log("🚀 ~ fetchData ~ user:", user);
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

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const uploaded = (await userService.uploadImage(
          file,
        )) as UploadImageResponse;
        const uploadedUrl = uploaded.data;
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
          full_name: userData?.full_name || "",
          email: userData?.email || "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
             const updated = await userService.updateUserInfo({
      full_name: values.full_name,
      email: values.email,
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
                    value={userData?.phone}
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

      <ChangePhoneDialog
        open={showPhoneDialog}
        onOpenChange={setShowPhoneDialog}
        t={t}
        countryCodes={countryCodes}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        setUserData={setUserData}
      />

      <ChangePasswordDialog
        open={showPasswordDialog}
        onOpenChange={setShowPasswordDialog}
        t={t}
        setUserData={setUserData}
      />
    </>
  );
};

export default AccountForm;

