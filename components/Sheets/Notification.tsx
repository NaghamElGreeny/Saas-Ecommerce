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
        <SheetTrigger className="relative cursor-pointer">
          <Image
            src="/assets/icons/notifications.png"
            alt="notifications"
            width={60}
            height={60}
            className="size-[60px]"
          />
            <span
    className="absolute top-4 right-4.5 flex size-2 items-center justify-center rounded-full bg-primary text-[8px] font-semibold text-white"
  >
    
  </span>
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
