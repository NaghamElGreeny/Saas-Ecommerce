"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
export default function NotificationSheet() {

  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Image
            src="/assets/icons/notifications.png"
            alt="notifications"
            width={60}
            height={60}
            className="size-[60px]"
          />
        </SheetTrigger>
        <SheetContent className="rounded-l-2xl">
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
          </SheetHeader>
          <SheetFooter className="flex flex-col items-center justify-center">
            <SheetClose asChild />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
