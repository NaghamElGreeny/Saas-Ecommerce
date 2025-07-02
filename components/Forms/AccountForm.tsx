"use client";

import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronDown, Eye, EyeOff, KeyIcon, Upload } from "lucide-react";

import { Button } from "../atoms";
import { useAuthStore } from "@/stores/authStore";
import Image from "next/image";
import {
  changePassword,
  getCountryCodes,
  getUser,
  sendVerificationCode,
  updateUserInfo,
  uploadImage,
} from "@/services/ClientApiHandler";
import toast from "react-hot-toast";
import { BrandCountry } from "@/utils/types";
import VerificationCodeDialog from "../Dialogs/VerificationCodeDialog";

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


const [newPhone, setNewPhone] = useState<{ phone: string; phone_code: string } | null>(null);

const [showVerification, setShowVerification] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser();
        if (user) setUserData(user.data);
        const codes = await getCountryCodes();
        setCountryCodes(codes);
        setSelectedCountry(codes[0]);
        // formik.setFieldValue("phone_code", codes[0].phone_code);
      } catch (err) {
        toast.error("Failed to load country codes");
        console.error(err);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(userData);
  const validationSchema = Yup.object({
    full_name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const passwordSchema = Yup.object().shape({
    old_password: Yup.string().required("Current password is required"),
    password: Yup.string()
      .min(6, "Password too short")
      .required("New password is required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm your new password"),
  });

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const uploaded = await uploadImage(file);
        const uploadedUrl = uploaded.data.avatar_url || uploaded.data;
        setUploadedAvatar(uploadedUrl);
        setAvatarUrl(URL.createObjectURL(file)); // معاينة
        toast.success("Image uploaded successfully");
      } catch (err) {
        toast.error("Image upload failed");
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
            const updated = await updateUserInfo({
              ...values,
              avatar: uploadedAvatar || userData.avatar, // ← استخدمي الجديد لو موجود
            });
            setUserData({ ...userData, ...updated.data });
            toast.success("Account updated successfully");
          } catch (err) {
            toast.error("Failed to update account");
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
                  alt="Profile picture"
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
                Change Password
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-3 md:col-span-2">
              {/* Name */}
              <div>
                <label className="text-primary text-sm font-semibold">
                  Name
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
                <label className="text-primary w-full items-end text-sm font-semibold">
                  Phone
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
                    Change phone
                  </button>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-primary text-sm font-semibold">
                  Email
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
                  Save
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>

      {/* Phone Dialog */}
{/* Phone Dialog */}
<Dialog open={showPhoneDialog} onOpenChange={setShowPhoneDialog}>
  <DialogContent>
    <h3 className="text-lg font-semibold">Change Phone</h3>

    {!showVerification ? (
      <Formik
        initialValues={{
          phone_code: selectedCountry?.phone_code || "20",
          phone: "",
        }}
        validationSchema={Yup.object({
          phone: Yup.string()
            .required('Phone is required')
            .matches(/^\d+$/, 'Phone must be digits only')
            .max(selectedCountry?.phone_limit || 10, `Max ${selectedCountry?.phone_limit || 10} digits`),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            setSubmitting(true);
            const res = await sendVerificationCode(values);
            setNewPhone(values);
            setShowVerification(true); // عرض فورم الكود
          } catch (error: any) {
            const errorMsg = error?.response?.data?.message || "Something went wrong";
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
                  placeholder="Phone"
                  value={values.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>
            {touched.phone && errors.phone && (
              <div className="mt-0 text-sm text-red-500">{errors.phone}</div>
            )}

            <Button type="submit" className="w-full" loading={isSubmitting}>
              Send Verification Code
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
          <h3 className="text-lg font-semibold">Change Password</h3>
          <Formik
            initialValues={{
              old_password: "",
              password: "",
              password_confirmation: "",
            }}
            validationSchema={passwordSchema}
            onSubmit={async (values, { resetForm }) => {
              try {
                const res = await changePassword(values); // الريكويست
                toast.success("Password changed successfully");
                setUserData(res.data);
                resetForm();
                setShowPasswordDialog(false);
              } catch (error: any) {
                const errorMsg =
                  error?.response?.data?.message || "Something went wrong";
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
                      placeholder="Current Password"
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
                      placeholder="New Password"
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
                      placeholder="Confirm New Password"
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
                    Save
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
