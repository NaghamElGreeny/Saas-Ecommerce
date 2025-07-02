'use client';
import Image from "next/image";
import { Switch } from "../ui/switch";
import { useState } from "react";
import GlobalAlertDialog from "../shared/GlobalAlertDialog";
import { useAuthStore } from "@/stores/authStore";
import { changeNotification } from "@/services/ClientApiHandler";

export default function NotificationToggle() {
  const { userData, fetchUserData } = useAuthStore();
  const [openNotifDialog, setOpenNotifDialog] = useState(false);
  const [notifiable, setNotifiable] = useState(userData.notifiable);

  const handleToggle = async () => {
    await changeNotification();
    fetchUserData();
    setNotifiable(!notifiable);
  };

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/assets/icons/notification.svg" alt="notification" width={65} height={65} />
          Notifications
        </div>
        <div className="cursor-pointer" onClick={() => setOpenNotifDialog(true)}>
          <Switch checked={notifiable} />
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
