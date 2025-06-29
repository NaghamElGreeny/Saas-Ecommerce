"use client";

import React, { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useNotificationStore } from "@/stores/notificationStore";
import NotificationCard from "../cards/NotificationCard";
import { Spinner } from "@heroui/spinner";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NotificationSheet() {
  const { notifications, unreadCount, fetchNotifications, loading } =
    useNotificationStore();

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <Sheet>
      <SheetTrigger className="relative cursor-pointer">
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
      </SheetTrigger>

      <SheetContent className="bg-bg w-full items-center rounded-l-2xl sm:min-w-[550px]">
        <SheetHeader className="w-full rounded-tl-2xl bg-white">
          <SheetTitle className="text-2xl font-bold">Notifications</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-3">
          {loading ? (
            <Spinner />
          ) : notifications.length === 0 ? (
            <div className="flex h-full w-full flex-col items-center justify-center text-center">
              <h2 className="mb-4 text-2xl font-bold">No Notifications</h2>
              <p>You don&#39;t have any Notifications</p>
            </div>
          ) : (
            <ScrollArea className="h-[80vh] w-[97%] overflow-y-auto rounded-md p-4">
              {notifications.map((notif) => (
                <NotificationCard notification={notif} key={notif.id} />
              ))}
            </ScrollArea>
          )}
        </div>

        <SheetFooter className="mt-6 flex justify-center"></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
