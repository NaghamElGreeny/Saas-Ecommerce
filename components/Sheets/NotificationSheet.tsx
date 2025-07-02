"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useNotificationStore } from "@/stores/notificationStore";
import NotificationCard from "../cards/NotificationCard";
import GlobalSheet from "@/components/shared/GlobalSheet";
import { Spinner } from "../atoms";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NotificationSheet() {
  const { notifications, unreadCount, fetchNotifications, loading } =
    useNotificationStore();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <GlobalSheet
      open={open}
      onOpenChange={setOpen}
      title="Notifications"
      side="right"
      trigger={
        <div className="relative cursor-pointer">
          <Image
            src="/assets/icons/notifications.png"
            alt="notifications"
            width={60}
            height={60}
            className="size-[60px]"
          />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </div>
      }
    >
      <div className="mt-4 space-y-3">
        {loading ? (
          <div className="flex min-h-[300px] w-full items-center justify-center">
            <Spinner className="text-primary text-2xl" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center text-center">
            <h2 className="mb-4 text-2xl font-bold">No Notifications</h2>
            <p>You don&apos;t have any Notifications</p>
          </div>
        ) : (
          <ScrollArea className="h-[80vh] w-[97%] overflow-y-auto rounded-md p-4 scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent max-h-[85vh] py-0">
            {notifications.map((notif) => (
              <NotificationCard notification={notif} key={notif.id} />
            ))}
          </ScrollArea>
        )}
      </div>
    </GlobalSheet>
  );
}
