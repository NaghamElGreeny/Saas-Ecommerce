"use client";

import Image from "next/image";
import { useState } from "react";
import GlobalAlertDialog from "@/components/shared/GlobalAlertDialog";
import cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";

export default function DeleteAccountBtn({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const { setToken } = useAuthStore();

  const handleDelete = () => {
    cookies.remove("token");
    toast.success("Account deleted successfully");
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
            alt="deleteaccount"
            width={65}
            height={65}
          />
          Delete Account
        </div>
      </div>

      <GlobalAlertDialog
        open={open}
        onOpenChange={setOpen}
        title="Are you sure?"
        description="This will delete your account permanently."
        confirmText="Yes, delete"
        cancelText="No, keep it"
        onConfirm={handleDelete}
      />
    </>
  );
}
