"use client";
import Image from "next/image";
import { Switch } from "../ui/switch";
import { useState } from "react";
import GlobalAlertDialog from "../shared/GlobalAlertDialog";
import { useAuthStore } from "@/stores/authStore";
import { notificationService } from "@/services/ClientApiHandler";
import { useTranslations } from "next-intl";

export default function NotificationToggle() {
  const { userData, fetchUserData } = useAuthStore();
  const [openNotifDialog, setOpenNotifDialog] = useState(false);
  const [notifiable, setNotifiable] = useState(userData.notifiable);
  const t = useTranslations("PROFILE_SHEET"); 

  const handleToggle = async () => {
    await notificationService.changeNotification();
    fetchUserData();
    setNotifiable(!notifiable);
  };

  function cn(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/icons/notification.svg"
            alt="notification"
            width={65}
            height={65}
          />
          {t("notification")}
        </div>
        <div
          className="cursor-pointer"
          onClick={() => setOpenNotifDialog(true)}
        >
          <Switch
            checked={notifiable}
            onCheckedChange={setNotifiable}
            className={cn(
              "relative inline-flex h-7 w-12 bg-primary items-center rounded-full transition-colors ps-1",
              // notifiable ? "bg-primary" : "bg-gray-300",
            )}
          >
            <span
              className={cn(
                "inline-block h-5 w-5 transform rounded-full bg-white transition",
                  notifiable
        ? "translate-x-6 rtl:-translate-x-6"
        : "translate-x-1 rtl:translate-x-1"
              )}
            />
          </Switch>
        </div>
      </div>

      <GlobalAlertDialog
        open={openNotifDialog}
        onOpenChange={setOpenNotifDialog}
        title="Change Notification?"
        description="This will change your notification status."
        confirmText="Yes, change"
        cancelText="No, keep it"
        onConfirm={handleToggle}
      />
    </>
  );
}
