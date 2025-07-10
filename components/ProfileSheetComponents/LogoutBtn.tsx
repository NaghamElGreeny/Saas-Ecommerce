"use client";

import Image from "next/image";
import { useState } from "react";
import GlobalAlertDialog from "@/components/shared/GlobalAlertDialog";
import cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function LogoutBtn({ onClose }: { onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  const { setToken } = useAuthStore();
  const t = useTranslations("LOGOUT_BUTTON");
  const router = useRouter();

  const handleLogout = () => {
    cookies.remove("token");
    toast.success(t("logout_success_toast"));
    setToken(null);
    onClose?.();
    router.push("/");
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex w-full cursor-pointer items-center justify-between"
      >
        <div className="flex items-center gap-3 text-red-600">
          <Image
            src="/assets/icons/logout.svg"
            alt={t("logout_label")}
            width={65}
            height={65}
          />
          {t("logout_label")}
        </div>
      </div>

      <GlobalAlertDialog
        open={open}
        onOpenChange={setOpen}
        title={t("alert_title")}
        description={t("alert_description")}
        confirmText={t("confirm_text")}
        cancelText={t("cancel_text")}
        onConfirm={handleLogout}
      />
    </>
  );
}
