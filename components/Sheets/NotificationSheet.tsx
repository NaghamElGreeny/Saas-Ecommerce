"use client";

import React, {  useEffect, useState } from "react";
import Image from "next/image";
import { useNotificationStore } from "@/stores/notificationStore";
import NotificationCard from "../cards/NotificationCard";
import GlobalSheet from "@/components/shared/GlobalSheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl"; 
import { Spinner } from "../atoms/UI/Spinner";

export default function NotificationSheet() {
  const { notifications, unreadCount, loading,fetchNotifications } =
    useNotificationStore();
  const t = useTranslations("NOTIFICATION_SHEET"); 
  const [open, setOpen] = useState(false);
useEffect(() => {
  fetchNotifications();
}, [fetchNotifications]);

  return (
    <GlobalSheet
      open={open}
      onOpenChange={setOpen}
      title={t("title")}
      side="right"
      trigger={
        <div className="relative cursor-pointer">
          <Image
            src="/assets/icons/notifications.png"
            alt={t("title")}
            width={60}
            height={60}
            className="cursor-pointer  sm:size-15 size-12"
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
            <Spinner className="text-text-website-font text-2xl" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center text-center">
            <h2 className="mb-4 text-2xl font-bold">{t("no_notifications_title")}</h2>
            <p>{t("no_notifications_message")}</p>
          </div>
        ) : (
          <ScrollArea className="scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent h-[80vh] max-h-[85vh] w-[97%] overflow-y-auto rounded-md p-4 py-0">
            {notifications.map((notif) => (
              <NotificationCard notification={notif} key={notif.id} />
            ))}
          </ScrollArea>
        )}
      </div>
    </GlobalSheet>
  );
}