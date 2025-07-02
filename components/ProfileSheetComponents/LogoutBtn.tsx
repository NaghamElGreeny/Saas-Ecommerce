"use client";

import Image from "next/image";
import { useState } from "react";
import GlobalAlertDialog from "@/components/shared/GlobalAlertDialog";
import cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";

export default function LogoutBtn({ onClose }: { onClose?: () => void }) {
  const [open, setOpen] = useState(false);
  const { setToken } = useAuthStore();

  const handleLogout = () => {
    cookies.remove("token");
    toast.success("Logged out");
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
            src="/assets/icons/logout.svg"
            alt="logout"
            width={65}
            height={65}
          />
          Logout
        </div>
      </div>

      <GlobalAlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Are you sure?"
        description="This will log you out."
        confirmText="Continue"
        cancelText="Cancel"
        onConfirm={handleLogout}
      />
    </>
  );
}
