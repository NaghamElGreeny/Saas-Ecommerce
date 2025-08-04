// components/Dialogs/ChangePasswordDialog.tsx
"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "../atoms/buttons/Button";
import toast from "react-hot-toast";
import { authService } from "@/services/ClientApiHandler";

const ChangePasswordDialog = ({ open, onOpenChange, t, setUserData }: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const passwordSchema = Yup.object().shape({
    old_password: Yup.string().required(t("current_password_required")),
    password: Yup.string().min(6, t("password_too_short")).required(t("new_password_required")),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], t("passwords_must_match"))
      .required(t("confirm_new_password_required")),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onOpenChange(false);
            } catch (error) {
              const errorMsg = error?.response?.data?.message || t("something_went_wrong");
              toast.error(errorMsg);
            }
          }}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form className="mt-3 space-y-3">
              {["old_password", "password", "password_confirmation"].map((field, idx) => (
                <div key={field} className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name={field}
                    placeholder={t(`${field}_placeholder`)}
                    value={values[field]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full rounded border px-3 py-2"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  {touched[field] && errors[field] && (
                    <div className="text-xs text-red-500">{errors[field]}</div>
                  )}
                </div>
              ))}
              <div className="flex justify-end">
                <Button type="submit" className="w-[30%] rounded-full">
                  {t("save_button")}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
