"use client";

import Image from "next/image";
import { useState } from "react";
import GlobalAlertDialog from "@/components/shared/GlobalAlertDialog";
import cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";
import { useTranslations } from "next-intl"; 

export default function DeleteAccountBtn({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const { setToken } = useAuthStore();
  const t = useTranslations("DELETE_ACCOUNT_BUTTON"); 

  const handleDelete = () => {
    cookies.remove("token");
    toast.success(t("account_deleted_success"));
    setToken(null);
    onClose();
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex w-full cursor-pointer items-center justify-between"
      >
        <div className="flex items-center gap-3 text-red-600">
          <Image
            src="/assets/icons/deleteaccount.svg"
            alt={t("delete_account_label")}
            width={65}
            height={65}
          />
          {t("delete_account_label")}
        </div>
      </div>

      <GlobalAlertDialog
        open={open}
        onOpenChange={setOpen}
        title={t("alert_title")}
        description={t("alert_description")}
        confirmText={t("confirm_text")}
        cancelText={t("cancel_text")}
        onConfirm={handleDelete}
      />
    </>
  );
}