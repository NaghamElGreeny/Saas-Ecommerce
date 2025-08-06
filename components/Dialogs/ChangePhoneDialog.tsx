"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";
import { Formik, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { Button } from "../atoms/buttons/Button";
import { authService } from "@/services/ClientApiHandler";
import toast from "react-hot-toast";
import VerificationCodeDialog from "./VerificationCodeDialog";
import { BrandCountry } from "@/utils/types";
import { UserData } from "@/stores/authStore";
const ChangePhoneDialog = ({
  open,
  onOpenChange,
  t,
  countryCodes,
  selectedCountry,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  t: (key: string) => string;
  countryCodes: BrandCountry[];
  selectedCountry: BrandCountry | null;
  setSelectedCountry: (c: BrandCountry) => void;
  setUserData: (data: UserData) => void;
}) => {
  const [newPhone, setNewPhone] = useState<{
    phone: string;
    phone_code: string;
  } | null>(null);
  const [showVerification, setShowVerification] = useState(false);
const phoneLimit = selectedCountry?.phone_limit || 10;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-bg">
        <h3 className="text-lg font-semibold">
          {t("change_phone_dialog_title")}
        </h3>
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
                  phoneLimit,
                  t("phone_max_digits").replace("{limit}", phoneLimit.toString())
                ),
            })}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
              try {
                setSubmitting(true);
                await authService.verifyCode({
                  ...values,
                  verification_code: "0000", 
                  verificationType: "register",
                });
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
                  <input
                    name="phone"
                    type="tel"
                    placeholder={t("phone_placeholder")}
                    value={values.phone}
                    onChange={handleChange}
                    className="w-full rounded-md border p-3"
                  />
                </div>
                {touched.phone && errors.phone && (
                  <div className="text-sm text-red-500">{errors.phone}</div>
                )}
                <Button type="submit" className="w-full" loading={isSubmitting}>
                  {t("send_verification_code_button")}
                </Button>
              </Form>
            )}
          </Formik>
        ) : (
          <VerificationCodeDialog
            newPhone={newPhone}
            onClose={() => {
              onOpenChange(false);
              setShowVerification(false);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ChangePhoneDialog;
