/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
// import { Spinner } from "@heroui/spinner";
import toast from "react-hot-toast";

import { useNotificationStore } from "@/stores/notificationStore";

// type Props = {
//   cartProduct: CartProduct;
// };

export default function NotificationCard({ notification }: any) {
  const {
    deleteNotification,
    loading,
  } = useNotificationStore();



  // console.log(modifiers)
  const handleRemove = async () => {
    try {
      await deleteNotification(notification.id);
      toast.success("Item deleted successfully");
    } catch {
      toast.error("Failed to delete item");
    }
  };




  return (
    <div className="notifications-center mb-4 flex h-[160px] justify-between rounded-xl bg-white p-4">
      <Image
        src={notification.image||'/assets/images/abushakra.png'}
        alt={'order'}
        width={130}
        height={90}
        className="rounded-2xl object-cover"
      />

      <div className="flex h-full w-full flex-col justify-between px-4">
        <div className="flex justify-between">
          <div>
            <h2 className="line-clamp-1 text-lg font-semibold">
              {notification.title}
            </h2>
            <div className="mt-0.5 line-clamp-2 max-w-[60%] text-sm text-indigo-400">
             {notification.body}
            </div>
          </div>
          <button
            className="w-[20%]"
            onClick={handleRemove}
            disabled={loading}
          >
            {/*actionLoading ? (
              <Spinner size="sm" className="text-red-500" />
            ) : (
            )*/}
            <Trash2 className="w-full cursor-pointer text-red-500" />
          </button>
        </div>

        <div className="flex items-center justify-between">
                  <p className="text-primary">{ notification.time_ago}</p>
        </div>
      </div>
    </div>
  );
}
